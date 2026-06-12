export const DEFAULT_INVITATION_DATA = {
  couple: {
    bride: {
      fullName: '',
      shortName: '',
      image: '',
      parents: '',
    },
    groom: {
      fullName: '',
      shortName: '',
      image: '',
      parents: '',
    },
  },
  weddingDate: '',
  events: [],
  gallery: [],
  venue: {
    mapSrc: '',
    link: '',
  },
  gifts: [],
  assets: {
    audioSrc: '',
    heroImage: '',
  },
  theme: {
    javanese: {
      subtitle: '',
      ceremonialText: '',
      closingText: '',
    },
  },
  introText: '',
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
      shortName: source.couple?.bride?.shortName || '',
      image: source.couple?.bride?.image || source.brideImage || '',
      parents: source.couple?.bride?.parents || source.parents?.bride || '',
    },
    groom: {
      fullName: groomFullName,
      shortName: source.couple?.groom?.shortName || '',
      image: source.couple?.groom?.image || source.groomImage || '',
      parents: source.couple?.groom?.parents || source.parents?.groom || '',
    },
  };

  const weddingDate = source.weddingDate ? new Date(source.weddingDate) : '';
  const events = Array.isArray(source.events) ? source.events : [];
  const gallery = Array.isArray(source.gallery) ? source.gallery.filter(Boolean) : [];

  const venue = {
    mapSrc: source.venue?.mapSrc || source.venueMapSrc || '',
    link: source.venue?.link || source.venueLink || '',
  };

  const legacyGift = source.gift || {
    bankAccount: source.bankAccount,
    bankRecipient: source.bankRecipient,
    bankName: source.bankName,
  };
  const gifts = Array.isArray(source.gifts)
    ? source.gifts.filter(Boolean).map((gift, index) => ({
        id: gift.id || `gift-${index + 1}`,
        bankAccount: gift.bankAccount || '',
        bankRecipient: gift.bankRecipient || '',
        bankName: gift.bankName || '',
      }))
    : legacyGift.bankAccount || legacyGift.bankRecipient || legacyGift.bankName
      ? [
        {
          id: legacyGift.id || 'gift-1',
          bankAccount: legacyGift.bankAccount || '',
          bankRecipient: legacyGift.bankRecipient || '',
          bankName: legacyGift.bankName || '',
        },
      ]
      : [];

  const assets = {
    audioSrc: source.assets?.audioSrc || source.audioSrc || '',
    heroImage: source.assets?.heroImage || source.heroImage || '',
  };

  const theme = {
    javanese: {
      subtitle: source.theme?.javanese?.subtitle || '',
      ceremonialText: source.theme?.javanese?.ceremonialText || '',
      closingText: source.theme?.javanese?.closingText || '',
    },
  };

  const introText = source.introText || '';

  return {
    couple,
    weddingDate,
    events,
    gallery,
    venue,
    gifts,
    gift: gifts[0] || null,
    assets,
    theme,
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
    events: Array.isArray(overrides.events) ? normalizedOverrides.events : normalizedDefaults.events,
    gallery: Array.isArray(overrides.gallery) ? normalizedOverrides.gallery : normalizedDefaults.gallery,
    venue: {
      mapSrc: getVal(normalizedOverrides.venue.mapSrc, normalizedDefaults.venue.mapSrc),
      link: getVal(normalizedOverrides.venue.link, normalizedDefaults.venue.link),
    },
    gifts: Array.isArray(overrides.gifts) ? normalizedOverrides.gifts : normalizedDefaults.gifts,
    gift: normalizedOverrides.gifts[0] || normalizedDefaults.gifts[0] || null,
    assets: {
      audioSrc: getVal(normalizedOverrides.assets.audioSrc, normalizedDefaults.assets.audioSrc),
      heroImage: getVal(normalizedOverrides.assets.heroImage, normalizedDefaults.assets.heroImage),
    },
    theme: {
      javanese: {
        subtitle: getVal(normalizedOverrides.theme.javanese.subtitle, normalizedDefaults.theme.javanese.subtitle),
        ceremonialText: getVal(normalizedOverrides.theme.javanese.ceremonialText, normalizedDefaults.theme.javanese.ceremonialText),
        closingText: getVal(normalizedOverrides.theme.javanese.closingText, normalizedDefaults.theme.javanese.closingText),
      },
    },
    introText: getVal(normalizedOverrides.introText, normalizedDefaults.introText),
  };
}
