export const DEFAULT_INVITATION_DATA = {
  couple: {
    bride: {
      fullName: '',
      shortName: '',
      image: '/share/akhwat.png',
      parents: '',
    },
    groom: {
      fullName: '',
      shortName: '',
      image: '/share/ikhwan.png',
      parents: '',
    },
  },
  weddingDate: new Date(),
  events: [],
  gallery: [],
  venue: {
    mapSrc: '',
    link: '',
  },
  gift: {
    bankAccount: '',
    bankRecipient: '',
    bankName: '',
  },
  assets: {
    audioSrc: '',
    heroImage: '/share/imgAI.png',
  },
  introText: "Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta'ala, Insya Allah kami akan menyelenggarakan Acara Pernikahan :",
};

/**
 * Normalizes input data (whether flat or partially nested) to a standard schema.
 */
export function normalizeInvitationData(source = {}) {
  if (!source) source = {};

  const brideFullName = source.couple?.bride?.fullName || source.coupleNames?.bride || '';
  const groomFullName = source.couple?.groom?.fullName || source.coupleNames?.groom || '';

  const couple = {
    bride: {
      fullName: brideFullName,
      shortName: source.couple?.bride?.shortName || (brideFullName ? brideFullName.split(' ')[0] : ''),
      image: source.couple?.bride?.image || source.brideImage || '/share/akhwat.png',
      parents: source.couple?.bride?.parents || source.parents?.bride || '',
    },
    groom: {
      fullName: groomFullName,
      shortName: source.couple?.groom?.shortName || (groomFullName ? groomFullName.split(' ')[0] : ''),
      image: source.couple?.groom?.image || source.groomImage || '/share/ikhwan.png',
      parents: source.couple?.groom?.parents || source.parents?.groom || '',
    },
  };

  const weddingDate = source.weddingDate ? new Date(source.weddingDate) : new Date();
  const events = source.events || [];
  const gallery = source.gallery || [];

  const venue = {
    mapSrc: source.venue?.mapSrc || source.venueMapSrc || '',
    link: source.venue?.link || source.venueLink || '',
  };

  const gift = {
    bankAccount: source.gift?.bankAccount || source.bankAccount || '',
    bankRecipient: source.gift?.bankRecipient || source.bankRecipient || '',
    bankName: source.gift?.bankName || source.bankName || '',
  };

  const assets = {
    audioSrc: source.assets?.audioSrc || source.audioSrc || '',
    heroImage: source.assets?.heroImage || source.heroImage || '/share/imgAI.png',
  };

  const introText = source.introText || DEFAULT_INVITATION_DATA.introText;

  return {
    couple,
    weddingDate,
    events,
    gallery,
    venue,
    gift,
    assets,
    introText,
  };
}

/**
 * Deep merges overrides onto defaults, both normalized.
 */
export function mergeInvitationData(defaults = {}, overrides = {}) {
  const normalizedDefaults = normalizeInvitationData(defaults);
  const normalizedOverrides = normalizeInvitationData(overrides);

  // Helper to get non-empty override or fallback to default
  const getVal = (val, fallback) => (val !== undefined && val !== null && val !== '' ? val : fallback);

  return {
    couple: {
      bride: {
        fullName: getVal(normalizedOverrides.couple.bride.fullName, normalizedDefaults.couple.bride.fullName),
        shortName: getVal(normalizedOverrides.couple.bride.shortName, normalizedDefaults.couple.bride.shortName),
        image: getVal(normalizedOverrides.couple.bride.image, normalizedDefaults.couple.bride.image),
        parents: getVal(normalizedOverrides.couple.bride.parents, normalizedDefaults.couple.bride.parents),
      },
      groom: {
        fullName: getVal(normalizedOverrides.couple.groom.fullName, normalizedDefaults.couple.groom.fullName),
        shortName: getVal(normalizedOverrides.couple.groom.shortName, normalizedDefaults.couple.groom.shortName),
        image: getVal(normalizedOverrides.couple.groom.image, normalizedDefaults.couple.groom.image),
        parents: getVal(normalizedOverrides.couple.groom.parents, normalizedDefaults.couple.groom.parents),
      },
    },
    weddingDate: overrides.weddingDate ? new Date(overrides.weddingDate) : normalizedDefaults.weddingDate,
    events: normalizedOverrides.events.length > 0 ? normalizedOverrides.events : normalizedDefaults.events,
    gallery: normalizedOverrides.gallery.length > 0 ? normalizedOverrides.gallery : normalizedDefaults.gallery,
    venue: {
      mapSrc: getVal(normalizedOverrides.venue.mapSrc, normalizedDefaults.venue.mapSrc),
      link: getVal(normalizedOverrides.venue.link, normalizedDefaults.venue.link),
    },
    gift: {
      bankAccount: getVal(normalizedOverrides.gift.bankAccount, normalizedDefaults.gift.bankAccount),
      bankRecipient: getVal(normalizedOverrides.gift.bankRecipient, normalizedDefaults.gift.bankRecipient),
      bankName: getVal(normalizedOverrides.gift.bankName, normalizedDefaults.gift.bankName),
    },
    assets: {
      audioSrc: getVal(normalizedOverrides.assets.audioSrc, normalizedDefaults.assets.audioSrc),
      heroImage: getVal(normalizedOverrides.assets.heroImage, normalizedDefaults.assets.heroImage),
    },
    introText: getVal(normalizedOverrides.introText !== DEFAULT_INVITATION_DATA.introText ? normalizedOverrides.introText : '', normalizedDefaults.introText),
  };
}
