import { useState, useEffect } from 'react';
import { useWishes } from './hooks/useWishes';
import { formatWeddingDate } from './utils/date';
import { copyToClipboard } from './utils/clipboard';
import WishForm from './components/WishForm';
import WishList from './components/WishList';
import Countdown from './components/Countdown';
import EventCard from './components/EventCard';
import AudioButton from './components/AudioButton';
import InvitationModal from './components/InvitationModal';
import Gallery from './components/Gallery';

const WEDDING_DATE = new Date('2024-04-21T09:00:00');
const BANK_ACCOUNT = '1110179193';

export default function App() {
  const { wishes, loading, submitting, submitWish, getTotalAttendees } = useWishes();
  const [formattedDate, setFormattedDate] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setFormattedDate(formatWeddingDate(WEDDING_DATE));
    setModalOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-bg overflow-x-hidden">
      {/* Background Flowers */}
      <div className="topFlower"></div>
      <div className="topFlower1"></div>
      <div className="bottomFlower"></div>
      <div className="bottomFlower1"></div>

      {/* Invitation Modal */}
      <InvitationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onOpen={() => {
          const audio = document.querySelector('audio');
          if (audio) audio.play();
        }}
      />

      {/* Audio Button */}
      <AudioButton audioSrc="/share/Audio.mp3" />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto relative z-0">
        <div className="grid md:grid-cols-5 gap-4 p-4">
          {/* Sidebar (Hidden on mobile) */}
          <div className="hidden md:col-span-2 md:flex md:flex-col md:justify-center md:items-center md:sticky md:top-20 md:h-screen">
            <div className="text-center">
              <img
                src="/share/bismillah.png"
                alt="Bismillah"
                className="w-64 mx-auto mb-4"
              />
              <p className="text-lg text-primary mb-2">The Wedding Of</p>
              <h1 className="text-5xl md:text-6xl font-nameFont1 text-primary mb-4">
                Maulidya Zahra Almasah
              </h1>
              <p className="text-4xl font-nameFont1 text-primary mb-4">&</p>
              <h1 className="text-5xl md:text-6xl font-nameFont1 text-primary">
                Bagus Budi Pangestu
              </h1>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-3 pt-4 md:pt-0">
            {/* Header Section */}
            <section className="text-center mb-8">
              <div className="md:hidden mb-6">
                <img
                  src="/share/bismillah.png"
                  alt="Bismillah"
                  className="w-32 mx-auto mb-4"
                />
                <p className="text-primary mb-2">The Wedding Of</p>
                <h1 className="text-3xl font-nameFont1 text-primary mb-2">
                  Lidya & Bagus
                </h1>
              </div>

              <div className="flex justify-center mb-4">
                <img
                  src="/share/imgAI.png"
                  alt="Couple AI"
                  className="w-2/3 md:w-1/2"
                />
              </div>

              <p className="text-primary text-lg mb-4">{formattedDate}</p>

              <Countdown targetDate={WEDDING_DATE} />

              <p className="text-primary mt-8">Assalamu&apos;alaikum wr.wb</p>
              <p className="text-primary mt-4">
                Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta&apos;ala,
                Insya Allah kami akan menyelenggarakan Acara Pernikahan :
              </p>
            </section>

            {/* Bride Section */}
            <section className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <img
                  src="/share/akhwat.png"
                  alt="Bride"
                  className="w-20 md:w-28"
                />
              </div>
              <h3 className="text-2xl font-nameFont1 text-primary mb-2">
                Maulidya Zahra Almasah S. Ak
              </h3>
              <p className="text-primary mb-1">Putri Pertama Dari</p>
              <p className="text-primary">
                Bapak Fitriyadi HMS & Ibu R. Farida Sekarwangi Sakinah
              </p>
            </section>

            {/* And Section */}
            <section className="text-center mb-8">
              <p className="text-3xl font-nameFont1 text-primary">&</p>
            </section>

            {/* Groom Section */}
            <section className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <img
                  src="/share/ikhwan.png"
                  alt="Groom"
                  className="w-20 md:w-28"
                />
              </div>
              <h3 className="text-2xl font-nameFont1 text-primary mb-2">
                Bagus Budi Pangestu S. Kom
              </h3>
              <p className="text-primary mb-1">Putra Kedua Dari</p>
              <p className="text-primary">
                Bapak Tarnoko & Ibu Tri Budi Indarti
              </p>
            </section>

            {/* Save Date Section */}
            <section className="mb-8">
              <h2 className="text-3xl font-nameFont1 text-primary mb-6 text-center">
                Save Date
              </h2>

              <div className="space-y-4">
                <EventCard
                  title="Akad Nikah"
                  date="Ahad/Minggu, 21 April 2024"
                  time="09.00 WIB - 10.00 WIB"
                  address="SMP Al Amanah - Tangerang Selatan"
                  fullAddress="Jl. Amd. Babakan Pocis No.10, Babakan, Kec. Setu, Kota Tangerang Selatan, Banten 15315"
                />

                <EventCard
                  title="Resepsi"
                  date="Ahad/Minggu, 21 April 2024"
                  time="10.00 WIB - 16.30 WIB"
                  address="SMP Al Amanah - Tangerang Selatan"
                  fullAddress="Jl. Amd. Babakan Pocis No.10, Babakan, Kec. Setu, Kota Tangerang Selatan, Banten 15315"
                />

                {/* Maps */}
                <div className="card-wedding p-0 overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.3433746008204!2d106.69894067499148!3d-6.34956829364031!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69e598f741038f%3A0x15e016c15b56fab4!2sSMP%20Al%20Amanah%20-%20Tangerang%20Selatan!5e0!3m2!1sid!2sid!4v1707098019655!5m2!1sid!2sid"
                    style={{ border: 0, width: '100%', height: '300px' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>

                {/* Location Button */}
                <div className="text-center">
                  <a
                    href="https://maps.app.goo.gl/SsU82b77kDTNkxcj7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-location inline-block"
                  >
                    <i className="fas fa-location-dot mr-2"></i>Lihat Lokasi
                  </a>
                </div>
              </div>
            </section>

            {/* Gallery Section */}
            <section>
              <Gallery />
            </section>

            {/* Wedding Gift Section */}
            <section className="mt-12 max-w-2xl mx-auto px-4">
              <div className="text-center mb-6">
                <i className="fas fa-gift text-5xl text-primary mb-4 block"></i>
                <h2 className="text-3xl font-nameFont1 text-primary mb-4">
                  Wedding Gift
                </h2>
              </div>

              <p className="text-primary text-center mb-6">
                Do&apos;a restu keluarga, sahabat, serta rekan-rekan semua di
                pernikahan kami sudah sangat cukup sebagai hadiah, tetapi jika
                memberi merupakan tanda kasih, kami dengan senang hati
                menerimanya dan tentunya semakin melengkapi kebahagiaan kami.
              </p>

              <div className="card-wedding text-center max-w-sm mx-auto">
                <div className="mb-4">
                  <img
                    src="/share/LogoBCA.png"
                    alt="BCA Logo"
                    className="w-12 mx-auto"
                  />
                </div>
                <p className="text-primary mb-2">A/N Bagus Budi Pangestu</p>
                <p className="text-primary font-semibold">
                  <span id="textToCopy">{BANK_ACCOUNT}</span>
                  <button
                    onClick={() => copyToClipboard(BANK_ACCOUNT)}
                    className="ml-3 text-primary hover:text-opacity-70 transition cursor-pointer"
                    title="Copy to clipboard"
                  >
                    <i className="fas fa-copy"></i>
                  </button>
                </p>
              </div>
            </section>

            {/* Invitation Section */}
            <section className="mt-12 max-w-2xl mx-auto px-4 text-center">
              <p className="text-primary mb-8">
                Merupakan suatu kehormatan dan kebahagian bagi kami apabila
                Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa.
              </p>
              <p className="text-primary mb-4">
                Wassalamu&apos;alaikum Warahmatullahi Wabarakatuh
              </p>
              <p className="text-primary mb-2">Kami Yang Berbahagia,</p>
              <p className="text-primary mb-6">
                Keluarga Besar Kedua Mempelai
              </p>
              <h3 className="text-4xl font-nameFont1 text-primary">
                Lidya & Bagus
              </h3>
            </section>

            {/* Wishes Form & List */}
            <WishForm onSubmit={submitWish} isSubmitting={submitting} />
            <WishList
              wishes={wishes}
              totalAttendees={getTotalAttendees()}
              loading={loading}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
