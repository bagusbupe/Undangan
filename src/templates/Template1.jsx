import BaseTemplate from './BaseTemplate';

export default function Template1(props) {
  const defaults = {
    coupleNames: { bride: 'Lia & Amir', groom: 'Amir Rahman' },
    weddingDate: new Date('2026-09-18T10:00:00'),
    events: [
      { id: 'akad', title: 'Akad', date: '18 Sep 2026', time: '10:00', address: 'Masjid Agung' },
      { id: 'resepsi', title: 'Resepsi', date: '18 Sep 2026', time: '13:00', address: 'Gedung Serbaguna' },
    ],
    gallery: ['/share/Image1.jpeg'],
    bankAccount: '1234567890',
    audioSrc: '/share/Audio.mp3',
  };

  return <BaseTemplate {...defaults} {...props} />;
}
