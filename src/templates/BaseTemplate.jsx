import Countdown from '../components/Countdown';
import EventCard from '../components/EventCard';
import Gallery from '../components/Gallery';
import AudioButton from '../components/AudioButton';
import InvitationModal from '../components/InvitationModal';
import WishForm from '../components/WishForm';
import WishList from '../components/WishList';
import { formatWeddingDate } from '../utils/date';
import { copyToClipboard } from '../utils/clipboard';

export default function BaseTemplate({ data = null, shared = {}, ...props }) {
  // support either a single `data` prop or individual props for backwards compatibility
  const source = data || props || {};

  const {
    coupleNames = { bride: '', groom: '' },
    weddingDate = new Date(),
    events = [],
    gallery = [],
    bankAccount = '',
    bankRecipient = '',
    bankName = '',
    audioSrc = '',
    venueMapSrc = '',
    venueLink = '',
    parents = { bride: '', groom: '' },
    heroImage = '/share/imgAI.png',
    brideImage = '/share/akhwat.png',
    groomImage = '/share/ikhwan.png',
    introText = "Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta'ala, Insya Allah kami akan menyelenggarakan Acara Pernikahan :",
  } = source;

  const formattedDate = formatWeddingDate(new Date(weddingDate));

  return (
    <div className="min-h-screen bg-bg overflow-x-hidden">
      <div className="topFlower" />
      <div className="topFlower1" />
      <div className="bottomFlower" />
      <div className="bottomFlower1" />

      <InvitationModal
        isOpen={true}
        onClose={() => {}}
        onOpen={() => {
          const audio = document.querySelector('audio');
          if (audio) audio.play();
        }}
      />

      <AudioButton audioSrc={audioSrc} />

      <main className="max-w-6xl mx-auto relative z-0">
        <div className="grid md:grid-cols-5 gap-4 p-4">
          <div className="hidden md:col-span-2 md:flex md:flex-col md:justify-center md:items-center md:sticky md:top-20 md:h-screen">
            <div className="text-center">
              <img src="/share/bismillah.png" alt="Bismillah" className="w-64 mx-auto mb-4" />
              <p className="text-lg text-primary mb-2">The Wedding Of</p>
              <h1 className="text-5xl md:text-6xl font-nameFont1 text-primary mb-4">{coupleNames.bride}</h1>
              <p className="text-4xl font-nameFont1 text-primary mb-4">&</p>
              <h1 className="text-5xl md:text-6xl font-nameFont1 text-primary">{coupleNames.groom}</h1>
            </div>
          </div>

          <div className="md:col-span-3 pt-4 md:pt-0">
            <section className="text-center mb-8">
              <div className="md:hidden mb-6">
                <img src="/share/bismillah.png" alt="Bismillah" className="w-32 mx-auto mb-4" />
                <p className="text-primary mb-2">The Wedding Of</p>
                <h1 className="text-3xl font-nameFont1 text-primary mb-2">{coupleNames.bride} & {coupleNames.groom}</h1>
              </div>

              <div className="flex justify-center mb-4">
                <img src={heroImage} alt="Couple AI" className="w-2/3 md:w-1/2" />
              </div>

              <p className="text-primary text-lg mb-4">{formattedDate}</p>

              <Countdown targetDate={new Date(weddingDate)} />

              <p className="text-primary mt-8">Assalamu&apos;alaikum wr.wb</p>
              <p className="text-primary mt-4">{introText}</p>
            </section>

            <section className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <img src={brideImage} alt="Bride" className="w-20 md:w-28" />
              </div>
              <h3 className="text-2xl font-nameFont1 text-primary mb-2">{coupleNames.bride}</h3>
              <p className="text-primary mb-1">Putri Dari</p>
              <p className="text-primary">{parents.bride}</p>
            </section>

            <section className="text-center mb-8">
              <p className="text-3xl font-nameFont1 text-primary">&</p>
            </section>

            <section className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <img src={groomImage} alt="Groom" className="w-20 md:w-28" />
              </div>
              <h3 className="text-2xl font-nameFont1 text-primary mb-2">{coupleNames.groom}</h3>
              <p className="text-primary mb-1">Putra Dari</p>
              <p className="text-primary">{parents.groom}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-nameFont1 text-primary mb-6 text-center">Save Date</h2>

              <div className="space-y-4">
                {events.map((ev) => (
                  <EventCard key={ev.id} {...ev} />
                ))}

                <div className="card-wedding p-0 overflow-hidden">
                  <iframe src={venueMapSrc} style={{ border: 0, width: '100%', height: '300px' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>

                <div className="text-center">
                  <a href={venueLink || '#'} target="_blank" rel="noopener noreferrer" className="btn-location inline-block">
                    <i className="fas fa-location-dot mr-2"></i>Lihat Lokasi
                  </a>
                </div>
              </div>
            </section>

            <section>
              <Gallery />
            </section>

            <section className="mt-12 max-w-2xl mx-auto px-4">
              <div className="text-center mb-6">
                <i className="fas fa-gift text-5xl text-primary mb-4 block"></i>
                <h2 className="text-3xl font-nameFont1 text-primary mb-4">Wedding Gift</h2>
              </div>

              <p className="text-primary text-center mb-6">Do&apos;a restu keluarga, sahabat, serta rekan-rekan semua di pernikahan kami sudah sangat cukup sebagai hadiah, tetapi jika memberi merupakan tanda kasih, kami dengan senang hati menerimanya dan tentunya semakin melengkapi kebahagiaan kami.</p>

              <div className="card-wedding text-center max-w-sm mx-auto">
                <div className="mb-4">
                  {bankName ? (
                    <img src={bankName} alt="Bank Logo" className="w-12 mx-auto" />
                  ) : null}
                </div>
                <p className="text-primary mb-2">A/N {bankRecipient || `${coupleNames.bride} & ${coupleNames.groom}`}</p>
                <p className="text-primary font-semibold">
                  <span id="textToCopy">{bankAccount}</span>
                  <button onClick={() => copyToClipboard(bankAccount)} className="ml-3 text-primary hover:text-opacity-70 transition cursor-pointer" title="Copy to clipboard"><i className="fas fa-copy"></i></button>
                </p>
              </div>
            </section>

            <section className="mt-12 max-w-2xl mx-auto px-4 text-center">
              <p className="text-primary mb-8">Merupakan suatu kehormatan dan kebahagian bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa.</p>
              <p className="text-primary mb-4">Wassalamu&apos;alaikum Warahmatullahi Wabarakatuh</p>
              <p className="text-primary mb-2">Kami Yang Berbahagia,</p>
              <p className="text-primary mb-6">Keluarga Besar Kedua Mempelai</p>
              <h3 className="text-4xl font-nameFont1 text-primary">{coupleNames.bride} & {coupleNames.groom}</h3>
            </section>

            <WishForm onSubmit={shared.submitWish} isSubmitting={shared.submitting} />
            <WishList wishes={shared.wishes} totalAttendees={shared.getTotalAttendees ? shared.getTotalAttendees() : 0} loading={shared.loading} />
          </div>
        </div>
      </main>
    </div>
  );
}
