import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';
import {
  createSlug,
  getDefaultInvitation,
  getInvitationBySlugRemote,
  getInvitationTitle,
  setActiveInvitationSlug,
  upsertInvitationRemote,
} from '../utils/invitationStorage';
import { normalizeInvitationData } from '../utils/templateData';

const IMAGE_OPTIONS = [
  '/share/akhwat.png',
  '/share/ikhwan.png',
  '/share/imgAI.png',
  '/share/Image1.jpeg',
  '/share/Image2.jpeg',
  '/share/Image3.jpeg',
  '/share/Image4.jpeg',
  '/share/Image5.jpeg',
  '/share/Image6.jpeg',
  '/share/Image7.jpeg',
  '/share/Image8.jpeg',
  '/share/Image9.jpeg',
  '/share/Image10.jpeg',
  '/share/img1.jpeg',
  '/share/imgFlower.png',
  '/share/LogoBCA.png',
];

const AUDIO_OPTIONS = ['/share/Audio.mp3'];
const MAX_UPLOAD_SIZE = 700 * 1024;

function getFileName(value) {
  if (!value) return '';
  if (value.startsWith('data:')) return 'Uploaded image';
  return value.split('/').filter(Boolean).pop() || value;
}

function readImageFile(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve('');
      return;
    }

    if (!file.type.startsWith('image/')) {
      reject(new Error('File harus berupa gambar.'));
      return;
    }

    if (file.size > MAX_UPLOAD_SIZE) {
      reject(new Error('Ukuran gambar maksimal 700KB.'));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Gagal membaca file gambar.'));
    reader.readAsDataURL(file);
  });
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-primary mb-2">{label}</span>
      {children}
    </label>
  );
}

function TextInput(props) {
  return (
    <input
      {...props}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
    />
  );
}

function TextArea(props) {
  return (
    <textarea
      {...props}
      rows={props.rows || 3}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
    />
  );
}

function SelectInput({ options, ...props }) {
  const valueExists = options.includes(props.value);
  const choices = valueExists || !props.value ? options : [props.value, ...options];

  return (
    <select
      {...props}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary bg-white"
    >
      <option value="">Pilih asset</option>
      {choices.map((option) => (
        <option key={option} value={option}>
          {getFileName(option)}
        </option>
      ))}
    </select>
  );
}

function ImagePicker({ value, onChange }) {
  const handleUpload = async (event) => {
    try {
      const uploadedImage = await readImageFile(event.target.files?.[0]);
      if (uploadedImage) onChange(uploadedImage);
    } catch (error) {
      alert(error.message);
    } finally {
      event.target.value = '';
    }
  };

  return (
    <div className="space-y-3">
      <SelectInput options={IMAGE_OPTIONS} value={value} onChange={(e) => onChange(e.target.value)} />
      {value && (
        <div className="flex items-center gap-3">
          <img src={value} alt="Preview" className="w-16 h-16 rounded-lg object-cover border border-gray-200" />
          <span className="text-sm text-gray-600 break-all">{getFileName(value)}</span>
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="block w-full text-sm text-gray-600 file:mr-4 file:px-4 file:py-2 file:rounded-lg file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
      />
    </div>
  );
}

function toDateTimeLocal(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toISOString().slice(0, 16);
}

export default function AdminEditor() {
  const navigate = useNavigate();
  const { invitationId } = useParams();
  const { admin } = useAdmin();
  const [invitation, setInvitation] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!admin) {
      navigate('/admin/login');
      return;
    }

    getInvitationBySlugRemote(invitationId)
      .then((stored) => setInvitation(stored || getDefaultInvitation(invitationId || 'bagus-lidya')));
  }, [admin, invitationId, navigate]);

  const updateInvitation = (key, value) => {
    setInvitation((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const updateData = (path, value) => {
    setInvitation((prev) => {
      const updated = { ...prev, data: { ...prev.data } };
      const keys = path.split('.');
      let current = updated.data;

      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = Array.isArray(current[keys[i]]) ? [...current[keys[i]]] : { ...(current[keys[i]] || {}) };
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;
      return updated;
    });
    setSaved(false);
  };

  const updateEvent = (index, key, value) => {
    setInvitation((prev) => {
      const data = normalizeInvitationData(prev.data);
      const events = [...data.events];
      events[index] = { ...events[index], [key]: value };
      return { ...prev, data: { ...data, events } };
    });
    setSaved(false);
  };

  const addEvent = () => {
    setInvitation((prev) => {
      const data = normalizeInvitationData(prev.data);
      return {
        ...prev,
        data: {
          ...data,
          events: [
            ...data.events,
            { id: createSlug(`acara-${data.events.length + 1}`), title: 'Acara', date: '', time: '', address: '', fullAddress: '' },
          ],
        },
      };
    });
  };

  const removeEvent = (index) => {
    setInvitation((prev) => {
      const data = normalizeInvitationData(prev.data);
      return { ...prev, data: { ...data, events: data.events.filter((_, itemIndex) => itemIndex !== index) } };
    });
  };

  const addGalleryImage = (image) => {
    if (!image) return;
    updateData('gallery', [...data.gallery, image]);
  };

  const removeGalleryImage = (index) => {
    updateData('gallery', data.gallery.filter((_, itemIndex) => itemIndex !== index));
  };

  const handleGalleryUpload = async (event) => {
    try {
      const files = Array.from(event.target.files || []);
      const uploadedImages = await Promise.all(files.map(readImageFile));
      updateData('gallery', [...data.gallery, ...uploadedImages.filter(Boolean)]);
    } catch (error) {
      alert(error.message);
    } finally {
      event.target.value = '';
    }
  };

  const updateGift = (index, key, value) => {
    setInvitation((prev) => {
      const data = normalizeInvitationData(prev.data);
      const gifts = [...data.gifts];
      gifts[index] = { ...gifts[index], [key]: value };
      return { ...prev, data: { ...data, gifts } };
    });
    setSaved(false);
  };

  const addGift = () => {
    setInvitation((prev) => {
      const data = normalizeInvitationData(prev.data);
      return {
        ...prev,
        data: {
          ...data,
          gifts: [
            ...data.gifts,
            { id: createSlug(`gift-${data.gifts.length + 1}`), bankAccount: '', bankRecipient: '', bankName: '/share/LogoBCA.png' },
          ],
        },
      };
    });
    setSaved(false);
  };

  const removeGift = (index) => {
    setInvitation((prev) => {
      const data = normalizeInvitationData(prev.data);
      return { ...prev, data: { ...data, gifts: data.gifts.filter((_, itemIndex) => itemIndex !== index) } };
    });
    setSaved(false);
  };

  const saveCurrentInvitation = async () => {
    const slug = createSlug(invitation.slug);
    const data = normalizeInvitationData(invitation.data);
    const savedInvitation = await upsertInvitationRemote({
      ...invitation,
      slug,
      id: slug,
      title: invitation.title || getInvitationTitle(data),
      data,
    });
    setInvitation(savedInvitation);
    return savedInvitation;
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveCurrentInvitation();
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      alert(`Error saving data: ${error.message}`);
    }
    setSaving(false);
  };

  const handlePreview = async () => {
    const savedInvitation = await saveCurrentInvitation();
    setActiveInvitationSlug(savedInvitation.slug);
    window.open('/preview/simple', '_blank', 'noopener,noreferrer');
  };

  if (!invitation) return <div className="p-8 text-center">Loading...</div>;

  const data = normalizeInvitationData(invitation.data);
  const galleryText = data.gallery.join('\n');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
          <div>
            <h1 className="text-2xl font-nameFont1 text-primary">Edit Undangan</h1>
            <p className="text-sm text-gray-600 break-all">/{invitation.slug}</p>
          </div>
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Back
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow p-6 md:p-8">
          {saved && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
              Data berhasil disimpan.
            </div>
          )}

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-primary mb-4">Info Undangan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Judul">
                <TextInput value={invitation.title || ''} onChange={(e) => updateInvitation('title', e.target.value)} />
              </Field>
              <Field label="Slug Link">
                <TextInput value={invitation.slug || ''} onChange={(e) => updateInvitation('slug', createSlug(e.target.value))} />
              </Field>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-primary mb-4">Data Pengantin Perempuan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Nama Lengkap">
                <TextInput value={data.couple.bride.fullName} onChange={(e) => updateData('couple.bride.fullName', e.target.value)} />
              </Field>
              <Field label="Nama Pendek">
                <TextInput value={data.couple.bride.shortName} onChange={(e) => updateData('couple.bride.shortName', e.target.value)} />
              </Field>
              <Field label="Orang Tua">
                <TextInput value={data.couple.bride.parents} onChange={(e) => updateData('couple.bride.parents', e.target.value)} />
              </Field>
              <Field label="Gambar Pengantin Perempuan">
                <ImagePicker value={data.couple.bride.image} onChange={(value) => updateData('couple.bride.image', value)} />
              </Field>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-primary mb-4">Data Pengantin Laki-laki</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Nama Lengkap">
                <TextInput value={data.couple.groom.fullName} onChange={(e) => updateData('couple.groom.fullName', e.target.value)} />
              </Field>
              <Field label="Nama Pendek">
                <TextInput value={data.couple.groom.shortName} onChange={(e) => updateData('couple.groom.shortName', e.target.value)} />
              </Field>
              <Field label="Orang Tua">
                <TextInput value={data.couple.groom.parents} onChange={(e) => updateData('couple.groom.parents', e.target.value)} />
              </Field>
              <Field label="Gambar Pengantin Laki-laki">
                <ImagePicker value={data.couple.groom.image} onChange={(value) => updateData('couple.groom.image', value)} />
              </Field>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-primary mb-4">Tanggal & Pembuka</h2>
            <div className="space-y-4">
              <Field label="Tanggal Pernikahan">
                <TextInput type="datetime-local" value={toDateTimeLocal(data.weddingDate)} onChange={(e) => updateData('weddingDate', e.target.value)} />
              </Field>
              <Field label="Teks Pembuka">
                <TextArea value={data.introText} onChange={(e) => updateData('introText', e.target.value)} />
              </Field>
            </div>
          </section>

          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-primary">Acara</h2>
              <button onClick={addEvent} className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90">Tambah Acara</button>
            </div>
            <div className="space-y-4">
              {data.events.map((event, index) => (
                <div key={event.id || index} className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Nama Acara">
                      <TextInput value={event.title || ''} onChange={(e) => updateEvent(index, 'title', e.target.value)} />
                    </Field>
                    <Field label="Tanggal">
                      <TextInput value={event.date || ''} onChange={(e) => updateEvent(index, 'date', e.target.value)} />
                    </Field>
                    <Field label="Waktu">
                      <TextInput value={event.time || ''} onChange={(e) => updateEvent(index, 'time', e.target.value)} />
                    </Field>
                    <Field label="Tempat">
                      <TextInput value={event.address || ''} onChange={(e) => updateEvent(index, 'address', e.target.value)} />
                    </Field>
                    <div className="md:col-span-2">
                      <Field label="Alamat Lengkap">
                        <TextArea value={event.fullAddress || ''} onChange={(e) => updateEvent(index, 'fullAddress', e.target.value)} />
                      </Field>
                    </div>
                  </div>
                  <button onClick={() => removeEvent(index)} className="mt-4 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100">
                    Hapus Acara
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-primary mb-4">Lokasi</h2>
            <div className="space-y-4">
              <Field label="Embed Google Maps">
                <TextArea value={data.venue.mapSrc} onChange={(e) => updateData('venue.mapSrc', e.target.value)} />
              </Field>
              <Field label="Link Google Maps">
                <TextInput value={data.venue.link} onChange={(e) => updateData('venue.link', e.target.value)} />
              </Field>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-primary mb-4">Gallery & Asset</h2>
            <div className="space-y-4">
              <Field label="Gallery Images (1 URL per baris)">
                <TextArea
                  rows={5}
                  value={galleryText}
                  onChange={(e) => updateData('gallery', e.target.value.split('\n').map((item) => item.trim()).filter(Boolean))}
                />
              </Field>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Tambah dari Asset">
                  <SelectInput options={IMAGE_OPTIONS} value="" onChange={(e) => addGalleryImage(e.target.value)} />
                </Field>
                <Field label="Upload Gallery">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleGalleryUpload}
                    className="block w-full text-sm text-gray-600 file:mr-4 file:px-4 file:py-2 file:rounded-lg file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                  />
                </Field>
              </div>
              {data.gallery.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {data.gallery.map((image, index) => (
                    <div key={`${image}-${index}`} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                      <img src={image} alt={`Gallery ${index + 1}`} className="w-full aspect-square object-cover" />
                      <div className="p-2">
                        <p className="text-xs text-gray-600 truncate mb-2">{getFileName(image)}</p>
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(index)}
                          className="w-full px-3 py-1 bg-red-50 text-red-600 rounded-md hover:bg-red-100 text-sm"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <Field label="Hero Image">
                <ImagePicker value={data.assets.heroImage} onChange={(value) => updateData('assets.heroImage', value)} />
              </Field>
              <Field label="Audio">
                <SelectInput options={AUDIO_OPTIONS} value={data.assets.audioSrc} onChange={(e) => updateData('assets.audioSrc', e.target.value)} />
              </Field>
            </div>
          </section>

          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-primary">Wedding Gift</h2>
              <button onClick={addGift} className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90">Tambah Gift</button>
            </div>
            <div className="space-y-4">
              {data.gifts.map((gift, index) => (
                <div key={gift.id || index} className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Nomor Rekening">
                      <TextInput value={gift.bankAccount || ''} onChange={(e) => updateGift(index, 'bankAccount', e.target.value)} />
                    </Field>
                    <Field label="Nama Penerima">
                      <TextInput value={gift.bankRecipient || ''} onChange={(e) => updateGift(index, 'bankRecipient', e.target.value)} />
                    </Field>
                    <Field label="Logo Bank">
                      <ImagePicker value={gift.bankName || ''} onChange={(value) => updateGift(index, 'bankName', value)} />
                    </Field>
                  </div>
                  <button onClick={() => removeGift(index)} className="mt-4 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100">
                    Hapus Gift
                  </button>
                </div>
              ))}
            </div>
          </section>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50"
            >
              {saving ? 'Menyimpan...' : 'Simpan Data'}
            </button>
            <button
              onClick={handlePreview}
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
            >
              Preview
            </button>
            <a
              href={`/${invitation.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg text-center hover:bg-gray-200"
            >
              Buka Link Public
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
