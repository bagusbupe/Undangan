import { useEffect, useState } from 'react';

export default function InvitationModal({
  isOpen,
  onClose,
  onOpen,
  couple,
  heroImage = '',
}) {
  const [guestName, setGuestName] = useState('');

  // Grab guest name from query param
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const name = searchParams.get('to') || '';
    setGuestName(decodeURIComponent(name));
  }, []);

  // Close on ESC key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Handle body overflow
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const getShortName = (fullName) => {
    if (!fullName) return '';
    const firstPart = fullName.split(/[\s&]+/)[0];
    return firstPart || '';
  };

  const brideName = couple?.bride?.shortName || getShortName(couple?.bride?.fullName);
  const groomName = couple?.groom?.shortName || getShortName(couple?.groom?.fullName);
  const coupleTitle = [brideName, groomName].filter(Boolean).join(' & ') || 'Undangan Pernikahan';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="w-full h-full flex flex-col items-center justify-center p-6 overflow-y-auto">
        <div className="text-center w-full max-w-md">
          <img src="/share/bismillah.png" alt="Bismillah" className="w-1/3 mx-auto mb-4" />
          <p className="text-primary text-lg mb-2">The Wedding Of</p>
          <h2 className="text-3xl md:text-4xl font-nameFont1 text-primary mb-6">
            {coupleTitle}
          </h2>
          {heroImage && (
            <div className="flex justify-center mb-6">
              <img src={heroImage} alt="Couple" className="w-3/5 rounded-full" />
            </div>
          )}
          {guestName && (
            <div className="mb-6 p-4 bg-secondary rounded-lg">
              <p className="text-primary text-sm mb-1">Kepada Yth Bapak/Ibu/Saudara/i</p>
              <h3 className="text-primary text-2xl font-semibold">{guestName}</h3>
            </div>
          )}
          <p className="text-primary mb-6 text-sm">
            Tanpa Mengurangi Rasa Hormat, Kami Mengundang Anda Untuk Hadir Di
            Acara Pernikahan Kami.
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpen?.();
              onClose();
            }}
            className="btn-location px-8 py-3 bg-primary text-white rounded-full hover:opacity-90 transition-opacity cursor-pointer z-50 relative"
          >
            <i className="fas fa-envelope mr-2"></i> Buka Undangan
          </button>
        </div>
      </div>
    </div>
  );
}
