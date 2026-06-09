import BaseTemplate from './BaseTemplate';

export default function Template2(props) {
  const defaults = {
    coupleNames: { bride: 'Siti Nur', groom: 'Rian Putra' },
    weddingDate: new Date('2026-11-05T15:00:00'),
    events: [
      { id: 'akad', title: 'Akad', date: '5 Nov 2026', time: '15:00', address: 'KUA Kecamatan' },
    ],
    gallery: ['/share/Image2.jpeg', '/share/Image3.jpeg'],
    bankAccount: '0987654321',
    audioSrc: '/share/Audio.mp3',
  };

  return <BaseTemplate {...defaults} {...props} />;
}
