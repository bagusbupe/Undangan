import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { copyToClipboard } from '../utils/clipboard';
import { calculateCountdown, formatTimeDigit, formatWeddingDate } from '../utils/date';
import { getInvitationTitle } from '../utils/invitationStorage';
import { normalizeInvitationData } from '../utils/templateData';

function JavaAudioButton({ audioSrc }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    audio.play().then(() => setIsPlaying(true)).catch(() => {});
  };

  return (
    <>
      <audio ref={audioRef} src={audioSrc} loop onPause={() => setIsPlaying(false)} onPlay={() => setIsPlaying(true)} />
      <button
        onClick={toggleAudio}
        className="fixed bottom-24 right-5 z-40 h-12 w-12 border border-[#c8a24a] bg-[#6d1730] text-[#fbf7ef] shadow-lg"
        title={isPlaying ? 'Pause' : 'Play'}
      >
        <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-music'}`}></i>
      </button>
    </>
  );
}

function JavaOrnament() {
  return (
    <>
      <div className="absolute left-5 top-5 h-14 w-14 border-l border-t border-[#c8a24a]" />
      <div className="absolute right-5 top-5 h-14 w-14 border-r border-t border-[#c8a24a]" />
      <div className="absolute bottom-5 left-5 h-14 w-14 border-b border-l border-[#c8a24a]" />
      <div className="absolute bottom-5 right-5 h-14 w-14 border-b border-r border-[#c8a24a]" />
    </>
  );
}

function JavaGunungan({ className = '' }) {
  return (
    <div className={`mx-auto flex w-36 flex-col items-center ${className}`}>
      <div className="h-0 w-0 border-x-[54px] border-b-[92px] border-x-transparent border-b-[#c8a24a]" />
      <div className="-mt-[84px] h-0 w-0 border-x-[42px] border-b-[72px] border-x-transparent border-b-[#24130d]" />
      <div className="-mt-12 h-12 w-12 rounded-full border border-[#c8a24a]" />
      <div className="mt-9 h-2 w-28 bg-[#c8a24a]" />
      <div className="h-4 w-16 bg-[#6d1730]" />
    </div>
  );
}

function JavaSection({ id, children, className = '' }) {
  return (
    <section id={id} className={`relative mx-auto min-h-screen max-w-md overflow-hidden px-5 py-12 ${className}`}>
      <JavaOrnament />
      <div className="relative mx-auto w-full max-w-md text-center">
        {children}
      </div>
    </section>
  );
}

function JavaBottomMenu({ hasGallery, hasGift, hasLocation }) {
  const items = [
    ['home', 'fa-home', 'Home'],
    ['mempelai', 'fa-user-friends', 'Mempelai'],
    ['acara', 'fa-calendar', 'Acara'],
    hasLocation ? ['lokasi', 'fa-map-marker-alt', 'Lokasi'] : null,
    hasGallery ? ['galeri', 'fa-image', 'Foto'] : null,
    hasGift ? ['kado', 'fa-gift', 'Kado'] : null,
    ['ucapan', 'fa-comment-dots', 'Ucapan'],
  ].filter(Boolean);

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-[#c8a24a] bg-[#1a0f0b]">
      <div className="mx-auto flex max-w-md overflow-x-auto">
        {items.map(([href, icon, label]) => (
          <a key={href} href={`#${href}`} className="min-w-[76px] border-x border-[#3c2a16] px-3 py-2 text-center text-[11px] text-[#c8a24a] hover:bg-[#c8a24a] hover:text-[#1a0f0b]">
            <i className={`fas ${icon} mb-1 block text-base`}></i>
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}

function JavaCountdown({ targetDate }) {
  const [countdown, setCountdown] = useState(() => calculateCountdown(targetDate));

  useEffect(() => {
    const updateCountdown = () => setCountdown(calculateCountdown(targetDate));
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const items = [
    ['Hari', countdown.days],
    ['Jam', countdown.hours],
    ['Menit', countdown.minutes],
    ['Detik', countdown.seconds],
  ];

  return (
    <div className="grid grid-cols-4 gap-2 mt-8 max-w-md mx-auto md:mx-0">
      {items.map(([label, value]) => (
        <div key={label} className="border border-[#c8a24a] bg-[#fffaf0] px-2 py-3 text-center">
          <div className="text-2xl font-semibold text-[#6d1730]">{formatTimeDigit(value)}</div>
          <div className="text-xs uppercase tracking-wide text-[#31452f]">{label}</div>
        </div>
      ))}
    </div>
  );
}

function JavaOpeningModal({ isOpen, onClose, onOpen, couple, heroImage }) {
  const [guestName, setGuestName] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setGuestName(decodeURIComponent(searchParams.get('to') || ''));
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const brideName = couple?.bride?.shortName || couple?.bride?.fullName || '';
  const groomName = couple?.groom?.shortName || couple?.groom?.fullName || '';
  const title = [brideName, groomName].filter(Boolean).join(' & ') || 'Undangan Pernikahan';

  return (
    <div className="fixed inset-0 z-50 bg-[#24130d] text-[#fbf7ef]">
      <div className="absolute inset-4 border border-[#c8a24a]" />
      <div className="relative flex min-h-screen items-center justify-center p-6">
        <div className="w-full max-w-md text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#c8a24a]">Pawiwahan</p>
          <h2 className="font-nameFont1 text-5xl text-[#fbf7ef]">{title}</h2>
          {heroImage && (
            <div className="mx-auto my-7 w-44 border border-[#c8a24a] bg-[#fbf7ef] p-2">
              <img src={heroImage} alt="Couple" className="aspect-square w-full object-cover" />
            </div>
          )}
          {guestName && (
            <div className="my-7 border border-[#c8a24a] bg-[#fbf7ef]/10 p-4">
              <p className="text-sm text-[#e5cf98]">Kepada Yth Bapak/Ibu/Saudara/i</p>
              <h3 className="mt-1 text-2xl font-semibold">{guestName}</h3>
            </div>
          )}
          <p className="mx-auto mb-7 max-w-sm text-sm leading-7 text-[#e5cf98]">
            Dengan hormat, kami mengundang Anda untuk hadir dan memberikan doa restu.
          </p>
          <button
            onClick={() => {
              onOpen?.();
              onClose();
            }}
            className="bg-[#c8a24a] px-8 py-3 font-semibold text-[#24130d] transition hover:bg-[#d8b75e]"
          >
            <i className="fas fa-envelope-open mr-2"></i>Buka Undangan
          </button>
        </div>
      </div>
    </div>
  );
}

function JavaEventCard({ event }) {
  return (
    <div className="border border-[#c8a24a] bg-[#2b1911] p-5 shadow-sm">
      {event.title && <h3 className="mb-3 font-nameFont1 text-2xl text-[#c8a24a]">{event.title}</h3>}
      {event.date && <p className="font-semibold text-[#fbf7ef]">{event.date}</p>}
      {event.time && <p className="text-[#e5cf98]">{event.time}</p>}
      {event.address && <p className="mt-3 font-semibold text-[#fbf7ef]">{event.address}</p>}
      {event.fullAddress && <p className="mt-1 text-sm text-[#e5cf98]">{event.fullAddress}</p>}
    </div>
  );
}

function JavaGallery({ images }) {
  const list = Array.isArray(images) ? images.filter(Boolean) : [];
  const [activeIndex, setActiveIndex] = useState(0);

  if (list.length === 0) return null;

  const activeImage = list[activeIndex] || list[0];

  return (
    <JavaSection id="galeri">
      <h2 className="mb-6 font-nameFont1 text-4xl text-[#c8a24a]">Kenangan</h2>
      <div className="grid gap-4">
        <div className="border border-[#c8a24a] bg-[#fbf7ef] p-2">
          <img src={activeImage} alt={`Kenangan ${activeIndex + 1}`} className="aspect-[4/3] w-full object-cover" />
        </div>
        <div className="grid grid-cols-4 gap-2">
          {list.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`border bg-white p-1 ${activeIndex === index ? 'border-[#6d1730]' : 'border-[#c8a24a]'}`}
            >
              <img src={image} alt={`Thumbnail ${index + 1}`} className="aspect-square w-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </JavaSection>
  );
}

function JavaWishForm({ onSubmit, isSubmitting }) {
  const [formData, setFormData] = useState({ name: '', message: '', attendance: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await onSubmit(formData.name, formData.message, formData.attendance);
      setFormData({ name: '', message: '', attendance: '' });
      Swal.fire({
        icon: 'success',
        title: 'Ucapan terkirim',
        text: 'Terima kasih atas doa dan konfirmasi Anda.',
        timer: 2500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Belum lengkap',
        text: error.message || 'Gagal mengirim ucapan.',
      });
    }
  };

  return (
    <section id="ucapan" className="mx-auto max-w-md px-5 py-12">
      <h2 className="mb-6 text-center font-nameFont1 text-4xl text-[#c8a24a]">Atur Panuwun</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          type="text"
          name="name"
          placeholder="Nama"
          value={formData.name}
          onChange={handleChange}
          className="border border-[#c8a24a] bg-[#fbf7ef] px-4 py-3 text-[#5b2f18] outline-none focus:border-[#c8a24a]"
          disabled={isSubmitting}
        />
        <textarea
          name="message"
          placeholder="Ucapan dan doa"
          value={formData.message}
          onChange={handleChange}
          rows="4"
          className="resize-none border border-[#c8a24a] bg-[#fbf7ef] px-4 py-3 text-[#5b2f18] outline-none focus:border-[#c8a24a]"
          disabled={isSubmitting}
        />
        <select
          name="attendance"
          value={formData.attendance}
          onChange={handleChange}
          className="border border-[#c8a24a] bg-[#fbf7ef] px-4 py-3 text-[#5b2f18] outline-none focus:border-[#c8a24a]"
          disabled={isSubmitting}
        >
          <option value="">Konfirmasi Kehadiran</option>
          <option value="hadir">Hadir</option>
          <option value="tidak">Tidak Hadir</option>
        </select>
        <button type="submit" disabled={isSubmitting} className="bg-[#c8a24a] px-5 py-3 font-semibold text-[#1a0f0b] disabled:opacity-50">
          {isSubmitting ? 'Mengirim...' : 'Kirim Ucapan'}
        </button>
      </form>
    </section>
  );
}

function JavaWishList({ wishes = [], totalAttendees = 0, loading }) {
  if (loading) {
    return <div className="px-5 py-8 text-center text-[#5b2f18]">Memuat ucapan...</div>;
  }

  return (
    <section className="mx-auto max-w-md px-5 pb-28">
      <div className="mb-6 border border-[#c8a24a] bg-[#2b1911] p-4 text-center">
        <h3 className="font-nameFont1 text-3xl text-[#c8a24a]">Daftar Ucapan</h3>
        <p className="mt-2 text-[#e5cf98]">Total hadir: <span className="font-semibold">{totalAttendees}</span></p>
      </div>
      <div className="grid gap-3">
        {wishes.length === 0 ? (
          <div className="border border-[#c8a24a] bg-[#2b1911] p-6 text-center text-[#e5cf98]">Belum ada ucapan.</div>
        ) : (
          wishes.map((wish) => (
            <div key={wish.id} className="border border-[#c8a24a] bg-[#2b1911] p-4">
              <div className="font-semibold text-[#c8a24a]">{wish.name}</div>
              <p className="mt-2 text-sm text-[#fbf7ef]">{wish.message}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-[#e5cf98]">
                {wish.attendance === 'hadir' ? 'Akan hadir' : 'Tidak hadir'}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default function JavaTemplate({ data: inputData = null, shared = {}, ...props }) {
  const [modalOpen, setModalOpen] = useState(true);
  const data = normalizeInvitationData(inputData || props);
  const { couple, weddingDate, events, gallery, venue, gifts, assets, introText, theme } = data;
  const formattedDate = formatWeddingDate(weddingDate);
  const hasWeddingDate = Boolean(weddingDate && !Number.isNaN(new Date(weddingDate).getTime()));
  const giftList = (gifts || []).filter((gift) => gift.bankAccount || gift.bankRecipient || gift.bankName);
  const hasGallery = Array.isArray(gallery) && gallery.filter(Boolean).length > 0;
  const hasGift = giftList.length > 0;
  const hasLocation = Boolean(venue.mapSrc || venue.link);
  const javanese = theme?.javanese || {};
  const coupleTitle = [couple.bride.fullName, couple.groom.fullName].filter(Boolean).join(' & ') || 'Undangan Pernikahan';

  useEffect(() => {
    document.title = getInvitationTitle(data);
  }, [data]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#160d09] pb-20 text-[#fbf7ef]">
      <JavaOpeningModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onOpen={() => {
          const audio = document.querySelector('audio');
          if (audio) audio.play().catch(() => {});
        }}
        couple={couple}
        heroImage={assets.heroImage}
      />

      {assets.audioSrc && <JavaAudioButton audioSrc={assets.audioSrc} />}
      <JavaBottomMenu hasGallery={hasGallery} hasGift={hasGift} hasLocation={hasLocation} />

      <main>
        <section id="home" className="relative mx-auto flex min-h-screen max-w-md items-center overflow-hidden bg-[#24130d] px-5 py-10">
          <JavaOrnament />
          <div className="relative w-full text-center">
            <JavaGunungan className="mb-8" />
            <p className="mb-4 text-xs uppercase tracking-[0.24em] text-[#c8a24a]">Pawiwahan</p>
            <h1 className="font-nameFont1 text-5xl leading-tight text-[#fbf7ef]">{coupleTitle}</h1>
            {javanese.subtitle && <p className="mt-5 text-lg text-[#e5cf98]">{javanese.subtitle}</p>}
            {formattedDate && <p className="mt-6 text-xl font-semibold text-[#c8a24a]">{formattedDate}</p>}
              {hasWeddingDate && <JavaCountdown targetDate={weddingDate} />}
            {assets.heroImage && (
              <div className="mx-auto mt-8 w-full max-w-xs border-4 border-[#c8a24a] bg-[#fbf7ef] p-3 shadow-xl">
                <img src={assets.heroImage} alt="Couple" className="aspect-[4/5] w-full object-cover" />
              </div>
            )}
          </div>
        </section>

        <JavaSection id="undangan" className="bg-[#1c100b]">
          <JavaGunungan className="mb-8 scale-75" />
          <p className="mb-4 text-[#c8a24a]">Assalamu&apos;alaikum wr.wb</p>
          {introText && <p className="leading-8 text-[#fbf7ef]">{introText}</p>}
          {javanese.ceremonialText && <p className="mt-4 leading-8 text-[#e5cf98]">{javanese.ceremonialText}</p>}
        </JavaSection>

        <JavaSection id="mempelai" className="bg-[#24130d]">
          <div>
            {couple.bride.image && <img src={couple.bride.image} alt="Bride" className="mx-auto mb-4 w-36 border border-[#c8a24a] bg-[#fbf7ef] p-2" />}
            <h2 className="font-nameFont1 text-4xl text-[#c8a24a]">{couple.bride.fullName}</h2>
            {couple.bride.parents && <p className="mt-3 text-[#fbf7ef]">Putri dari {couple.bride.parents}</p>}
          </div>
          <div className="my-8 font-nameFont1 text-5xl text-[#c8a24a]">&</div>
          <div>
            {couple.groom.image && <img src={couple.groom.image} alt="Groom" className="mx-auto mb-4 w-36 border border-[#c8a24a] bg-[#fbf7ef] p-2" />}
            <h2 className="font-nameFont1 text-4xl text-[#c8a24a]">{couple.groom.fullName}</h2>
            {couple.groom.parents && <p className="mt-3 text-[#fbf7ef]">Putra dari {couple.groom.parents}</p>}
          </div>
        </JavaSection>

        <JavaSection id="acara" className="bg-[#1c100b]">
          <h2 className="mb-6 font-nameFont1 text-4xl text-[#c8a24a]">Undangan dan Acara</h2>
          <div className="grid gap-4">
            {events.length > 0 ? events.map((event, index) => <JavaEventCard key={event.id || index} event={event} />) : (
              <div className="border border-[#c8a24a] bg-[#2b1911] p-5 text-center text-[#e5cf98]">Detail acara akan segera diperbarui.</div>
            )}
          </div>
        </JavaSection>

        {hasLocation && (
        <JavaSection id="lokasi" className="bg-[#24130d]">
          <h2 className="mb-6 font-nameFont1 text-4xl text-[#c8a24a]">Peta Lokasi</h2>
          {venue.mapSrc && (
            <div className="mt-6 overflow-hidden border border-[#c8a24a] bg-white">
              <iframe src={venue.mapSrc} style={{ border: 0, width: '100%', height: '300px' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          )}

          {venue.link && (
            <div className="mt-6 text-center">
              <a href={venue.link} target="_blank" rel="noopener noreferrer" className="inline-block bg-[#6d1730] px-7 py-3 font-semibold text-white">
                <i className="fas fa-location-dot mr-2"></i>Lihat Lokasi
              </a>
            </div>
          )}
        </JavaSection>
        )}

        <JavaGallery images={gallery} />

        {giftList.length > 0 && (
          <JavaSection id="kado" className="bg-[#1c100b]">
            <h2 className="mb-4 font-nameFont1 text-4xl text-[#c8a24a]">Kado Nikah</h2>
            <p className="mb-6 text-[#e5cf98]">Doa restu sudah menjadi hadiah yang sangat berarti. Jika memberi merupakan tanda kasih, kami menerimanya dengan bahagia.</p>
            <div className="mx-auto grid max-w-sm gap-4">
              {giftList.map((gift, index) => (
                <div key={gift.id || index} className="border border-[#c8a24a] bg-[#2b1911] p-5">
                  {gift.bankName && <img src={gift.bankName} alt="Bank Logo" className="mx-auto mb-4 w-14" />}
                  {gift.bankRecipient && <p className="mb-2 text-[#fbf7ef]">A/N {gift.bankRecipient}</p>}
                  {gift.bankAccount && (
                    <p className="font-semibold text-[#e5cf98]">
                      <span>{gift.bankAccount}</span>
                      <button onClick={() => copyToClipboard(gift.bankAccount)} className="ml-3 text-[#6d1730]" title="Copy to clipboard">
                        <i className="fas fa-copy"></i>
                      </button>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </JavaSection>
        )}

        <JavaSection id="penutup" className="bg-[#24130d]">
          {javanese.closingText && <p className="mb-6 text-[#e5cf98]">{javanese.closingText}</p>}
          <p className="mb-3 text-[#fbf7ef]">Wassalamu&apos;alaikum Warahmatullahi Wabarakatuh</p>
          <h3 className="font-nameFont1 text-4xl text-[#c8a24a]">{coupleTitle}</h3>
        </JavaSection>

        <JavaWishForm onSubmit={shared.submitWish} isSubmitting={shared.submitting} />
        <JavaWishList wishes={shared.wishes} totalAttendees={shared.getTotalAttendees ? shared.getTotalAttendees() : 0} loading={shared.loading} />
      </main>
    </div>
  );
}
