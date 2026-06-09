import BaseTemplate from './BaseTemplate';
import { mergeInvitationData } from '../utils/templateData';

export default function Template2({ data, shared, ...props }) {
  const defaults = {
    couple: {
      bride: {
        fullName: 'Siti Nur',
        shortName: 'Siti',
        image: '/share/akhwat.png',
        parents: 'Bapak Slamet & Ibu Rahayu',
      },
      groom: {
        fullName: 'Rian Putra',
        shortName: 'Rian',
        image: '/share/ikhwan.png',
        parents: 'Bapak Hartono & Ibu Kartini',
      },
    },
    weddingDate: new Date('2026-11-05T15:00:00'),
    events: [
      { id: 'akad', title: 'Akad', date: '5 Nov 2026', time: '15:00', address: 'KUA Kecamatan' },
    ],
    gallery: ['/share/Image2.jpeg', '/share/Image3.jpeg'],
    gift: {
      bankAccount: '0987654321',
      bankRecipient: 'Rian Putra',
      bankName: '',
    },
    assets: {
      audioSrc: '/share/Audio.mp3',
      heroImage: '/share/imgAI.png',
    },
  };

  const mergedData = mergeInvitationData(defaults, data || props);

  return <BaseTemplate data={mergedData} shared={shared} />;
}
