import { useState, useEffect } from 'react';
import { useWishes } from './hooks/useWishes';
import TemplateRegistry from './templates/TemplateRegistry';

export default function TemplateApp() {
  const { wishes, loading, submitting, submitWish, getTotalAttendees } = useWishes();

  // template selection
  const [templateName, setTemplateName] = useState('simple');
  const [templateProps] = useState(() => ({
    coupleNames: { bride: 'Maulidya Zahra Almasah', groom: 'Bagus Budi Pangestu' },
    weddingDate: new Date('2024-04-21T09:00:00'),
    events: [
      {
        id: 'akad',
        title: 'Akad Nikah',
        date: 'Ahad/Minggu, 21 April 2024',
        time: '09.00 WIB - 10.00 WIB',
        address: 'SMP Al Amanah - Tangerang Selatan',
        fullAddress: 'Jl. Amd. Babakan Pocis No.10, Babakan, Kec. Setu, Kota Tangerang Selatan, Banten 15315',
      },
    ],
    gallery: ['/share/Image1.jpeg', '/share/Image2.jpeg'],
    bankAccount: '1110179193',
    audioSrc: '/share/Audio.mp3',
    venueMapSrc:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.3433746008204!2d106.69894067499148!3d-6.34956829364031!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69e598f741038f%3A0x15e016c15b56fab4!2sSMP%20Al%20Amanah%20-%20Tangerang%20Selatan!5e0!3m2!1sid!2sid!4v1707098019655!5m2!1sid!2sid',
  }));

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get('template');
    if (t) setTemplateName(t);
  }, []);

  const TemplateComponent = TemplateRegistry.get(templateName);

  if (!TemplateComponent) return <div className="p-8">Template not found: {templateName}</div>;

  const shared = { wishes, loading, submitting, submitWish, getTotalAttendees };

  return <TemplateComponent {...templateProps} shared={shared} />;
}
