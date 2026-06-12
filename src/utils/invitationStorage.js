import { DEFAULT_INVITATION_DATA, normalizeInvitationData } from './templateData';
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, writeBatch } from 'firebase/firestore';
import { db } from '../firebase/config';

const STORAGE_KEY = 'invitations';
const ACTIVE_KEY = 'active_invitation_slug';

export function createSlug(value) {
  const slug = String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return slug || `undangan-${Date.now()}`;
}

export function getInvitationTitle(data = DEFAULT_INVITATION_DATA) {
  const normalized = normalizeInvitationData(data);
  const bride = normalized.couple.bride.shortName || normalized.couple.bride.fullName;
  const groom = normalized.couple.groom.shortName || normalized.couple.groom.fullName;

  return [bride, groom].filter(Boolean).join(' & ') || 'Undangan Baru';
}

export function getDefaultInvitation(slug = createSlug(`undangan-${Date.now()}`)) {
  return {
    id: slug,
    slug,
    templateId: 'simple',
    title: '',
    data: normalizeInvitationData(DEFAULT_INVITATION_DATA),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

function serializeInvitation(invitation) {
  const data = normalizeInvitationData(invitation.data);

  return {
    ...invitation,
    id: invitation.slug,
    templateId: invitation.templateId || 'simple',
    title: invitation.title || '',
    data: {
      ...data,
      weddingDate: data.weddingDate instanceof Date ? data.weddingDate.toISOString() : data.weddingDate,
    },
    createdAt: invitation.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export function getInvitations() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    const initial = [getDefaultInvitation()];
    saveInvitations(initial);
    setActiveInvitationSlug(initial[0].slug);
    return initial;
  }

  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [getDefaultInvitation()];
  } catch {
    return [getDefaultInvitation()];
  }
}

export function saveInvitations(invitations) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(invitations));
}

export function getInvitationBySlug(slug) {
  return getInvitations().find((invitation) => invitation.slug === slug) || null;
}

export function getActiveInvitation() {
  const activeSlug = getActiveInvitationSlug();
  return getInvitationBySlug(activeSlug) || getInvitations()[0] || getDefaultInvitation();
}

export function getActiveInvitationSlug() {
  return localStorage.getItem(ACTIVE_KEY) || '';
}

export function setActiveInvitationSlug(slug) {
  localStorage.setItem(ACTIVE_KEY, slug);
}

export function upsertInvitation(invitation) {
  const invitations = getInvitations();
  const normalized = {
    ...invitation,
    id: invitation.slug,
    templateId: invitation.templateId || 'simple',
    title: invitation.title || '',
    data: normalizeInvitationData(invitation.data),
    updatedAt: new Date().toISOString(),
  };
  const index = invitations.findIndex((item) => item.slug === normalized.slug);

  if (index >= 0) {
    invitations[index] = { ...invitations[index], ...normalized };
  } else {
    invitations.push({ ...normalized, createdAt: new Date().toISOString() });
  }

  saveInvitations(invitations);
  setActiveInvitationSlug(normalized.slug);
  return normalized;
}

export function deleteInvitation(slug) {
  const invitations = getInvitations().filter((invitation) => invitation.slug !== slug);
  saveInvitations(invitations);

  if (getActiveInvitationSlug() === slug) {
    const nextSlug = invitations[0]?.slug || '';
    setActiveInvitationSlug(nextSlug);
  }

  return invitations;
}

export async function getInvitationsRemote() {
  const snapshot = await getDocs(collection(db, 'invitations'));
  const invitations = snapshot.docs.map((item) => item.data());

  if (invitations.length > 0) {
    saveInvitations(invitations);
    return invitations;
  }

  const initial = getDefaultInvitation();
  const saved = await upsertInvitationRemote(initial);
  return [saved];
}

export async function getInvitationBySlugRemote(slug) {
  if (!slug) return null;
  const snapshot = await getDoc(doc(db, 'invitations', slug));

  if (!snapshot.exists()) return null;

  const invitation = snapshot.data();
  upsertInvitation(invitation);
  return invitation;
}

export async function upsertInvitationRemote(invitation) {
  const serialized = serializeInvitation(invitation);
  await setDoc(doc(db, 'invitations', serialized.slug), serialized, { merge: true });
  upsertInvitation(serialized);
  return serialized;
}

export async function deleteInvitationRemote(slug) {
  const wishesSnapshot = await getDocs(collection(db, 'invitationWishes', slug, 'wishes'));
  if (!wishesSnapshot.empty) {
    const batch = writeBatch(db);
    wishesSnapshot.docs.forEach((wishDoc) => batch.delete(wishDoc.ref));
    await batch.commit();
  }

  await deleteDoc(doc(db, 'invitations', slug));
  return deleteInvitation(slug);
}
