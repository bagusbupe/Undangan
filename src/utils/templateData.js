export const DEFAULT_INVITATION_DATA = {
  couple: {
    bride: {
      fullName: 'Maulidya Zahra Almasah',
      shortName: 'Lidya',
      image: '/share/akhwat.png',
      parents: 'Bapak Fitriyadi HMS & Ibu R. Farida Sekarwangi Sakinah',
    },
    groom: {
      fullName: 'Bagus Budi Pangestu',
      shortName: 'Bagus',
      image: '/share/ikhwan.png',
      parents: 'Bapak Tarnoko & Ibu Tri Budi Indarti',
    },
  },
  weddingDate: '2024-04-21T09:00:00',
  events: [
    {
      id: 'akad',
      title: 'Akad Nikah',
      date: 'Ahad/Minggu, 21 April 2024',
      time: '09.00 WIB - 10.00 WIB',
      address: 'SMP Al Amanah - Tangerang Selatan',
      fullAddress: 'Jl. Amd. Babakan Pocis No.10, Babakan, Kec. Setu, Kota Tangerang Selatan, Banten 15315',
    },
    {
      id: 'resepsi',
      title: 'Resepsi',
      date: 'Ahad/Minggu, 21 April 2024',
      time: '10.00 WIB - 16.30 WIB',
      address: 'SMP Al Amanah - Tangerang Selatan',
      fullAddress: 'Jl. Amd. Babakan Pocis No.10, Babakan, Kec. Setu, Kota Tangerang Selatan, Banten 15315',
    },
  ],
  gallery: ['/share/Image1.jpeg', '/share/Image2.jpeg', '/share/Image3.jpeg'],
  venue: {
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.3433746008204!2d106.69894067499148!3d-6.34956829364031!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69e598f741038f%3A0x15e016c15b56fab4!2sSMP%20Al%20Amanah%20-%20Tangerang%20Selatan!5e0!3m2!1sid!2sid!4v1707098019655!5m2!1sid!2sid',
    link: 'https://maps.app.goo.gl/SsU82b77kDTNkxcj7',
  },
  gifts: [
    {
      id: 'bca-bagus',
      bankAccount: '1110179193',
      bankRecipient: 'Bagus Budi Pangestu',
      bankName: '/share/LogoBCA.png',
    },
  ],
  assets: {
    audioSrc: '/share/Audio.mp3',
    heroImage: '/share/imgAI.png',
  },
  introText: "Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta'ala, Insya Allah kami akan menyelenggarakan Acara Pernikahan :",
};

/**
 * Normalizes input data (whether flat or partially nested) to a standard schema.
 */
export function normalizeInvitationData(source = {}) {
  if (!source) source = {};

  const brideFullName = source.couple?.bride?.fullName || source.coupleNames?.bride || DEFAULT_INVITATION_DATA.couple.bride.fullName;
  const groomFullName = source.couple?.groom?.fullName || source.coupleNames?.groom || DEFAULT_INVITATION_DATA.couple.groom.fullName;

  const couple = {
    bride: {
      fullName: brideFullName,
      shortName: source.couple?.bride?.shortName || (brideFullName ? brideFullName.split(' ')[0] : DEFAULT_INVITATION_DATA.couple.bride.shortName),
      image: source.couple?.bride?.image || source.brideImage || '/share/akhwat.png',
      parents: source.couple?.bride?.parents || source.parents?.bride || DEFAULT_INVITATION_DATA.couple.bride.parents,
    },
    groom: {
      fullName: groomFullName,
      shortName: source.couple?.groom?.shortName || (groomFullName ? groomFullName.split(' ')[0] : DEFAULT_INVITATION_DATA.couple.groom.shortName),
      image: source.couple?.groom?.image || source.groomImage || '/share/ikhwan.png',
      parents: source.couple?.groom?.parents || source.parents?.groom || DEFAULT_INVITATION_DATA.couple.groom.parents,
    },
  };

  const weddingDate = source.weddingDate ? new Date(source.weddingDate) : new Date(DEFAULT_INVITATION_DATA.weddingDate);
  const events = source.events || DEFAULT_INVITATION_DATA.events;
  const gallery = source.gallery || DEFAULT_INVITATION_DATA.gallery;

  const venue = {
    mapSrc: source.venue?.mapSrc || source.venueMapSrc || DEFAULT_INVITATION_DATA.venue.mapSrc,
    link: source.venue?.link || source.venueLink || DEFAULT_INVITATION_DATA.venue.link,
  };

  const fallbackGift = DEFAULT_INVITATION_DATA.gifts[0];
  const legacyGift = source.gift || {
    bankAccount: source.bankAccount,
    bankRecipient: source.bankRecipient,
    bankName: source.bankName,
  };
  const gifts = Array.isArray(source.gifts)
    ? source.gifts
    : [
        {
          id: legacyGift.id || fallbackGift.id,
          bankAccount: legacyGift.bankAccount || fallbackGift.bankAccount,
          bankRecipient: legacyGift.bankRecipient || fallbackGift.bankRecipient,
          bankName: legacyGift.bankName || fallbackGift.bankName,
        },
      ];

  const assets = {
    audioSrc: source.assets?.audioSrc || source.audioSrc || DEFAULT_INVITATION_DATA.assets.audioSrc,
    heroImage: source.assets?.heroImage || source.heroImage || '/share/imgAI.png',
  };

  const introText = source.introText || DEFAULT_INVITATION_DATA.introText;

  return {
    couple,
    weddingDate,
    events,
    gallery,
    venue,
    gifts,
    gift: gifts[0],
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
    gifts: normalizedOverrides.gifts.length > 0 ? normalizedOverrides.gifts : normalizedDefaults.gifts,
    gift: normalizedOverrides.gifts[0] || normalizedDefaults.gifts[0],
    assets: {
      audioSrc: getVal(normalizedOverrides.assets.audioSrc, normalizedDefaults.assets.audioSrc),
      heroImage: getVal(normalizedOverrides.assets.heroImage, normalizedDefaults.assets.heroImage),
    },
    introText: getVal(normalizedOverrides.introText !== DEFAULT_INVITATION_DATA.introText ? normalizedOverrides.introText : '', normalizedDefaults.introText),
  };
}
