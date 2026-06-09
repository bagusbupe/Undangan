import BaseTemplate from './BaseTemplate';
import { mergeInvitationData } from '../utils/templateData';

export default function Template1({ data, shared, ...props }) {
  const defaults = {
    couple: {
      bride: {
        fullName: 'Lia Lestari',
        shortName: 'Lia',
        image: '/share/akhwat.png',
        parents: 'Bapak Ahmad & Ibu Siti',
      },
      groom: {
        fullName: 'Amir Rahman',
        shortName: 'Amir',
        image: '/share/ikhwan.png',
        parents: 'Bapak Yusuf & Ibu Aminah',
      },
    },
    weddingDate: new Date('2026-09-18T10:00:00'),
    events: [
      { id: 'akad', title: 'Akad', date: '18 Sep 2026', time: '10:00', address: 'Masjid Agung' },
      { id: 'resepsi', title: 'Resepsi', date: '18 Sep 2026', time: '13:00', address: 'Gedung Serbaguna' },
    ],
    gallery: ['/share/Image1.jpeg'],
    gift: {
      bankAccount: '1234567890',
      bankRecipient: 'Amir Rahman',
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
