import { useEffect, useState } from 'react';

export default function InvitationModal({ isOpen, onClose, onOpen }) {
  const [guestName, setGuestName] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const name = searchParams.get('to') || '';
    setGuestName(decodeURIComponent(name));
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-bg rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6 text-center">
          <img
            src="/share/bismillah.png"
            alt="Bismillah"
            className="w-1/3 mx-auto mb-4"
          />

          <p className="text-primary text-lg mb-2">The Wedding Of</p>

          <h2 className="text-3xl md:text-4xl font-nameFont1 text-primary mb-6">
            Lidya & Bagus
          </h2>

          <div className="flex justify-center mb-6">
            <img src="/share/imgAI.png" alt="Couple" className="w-3/5" />
          </div>

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
            onClick={() => {
              onOpen?.();
              onClose();
            }}
            className="btn-location"
          >
            <i className="fas fa-envelope mr-2"></i> Buka Undangan
          </button>

          <button
            onClick={onClose}
            className="mt-4 w-full py-2 text-primary hover:bg-gray-100 rounded-lg transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
