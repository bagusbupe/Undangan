import { useState } from 'react';
import Swal from 'sweetalert2';

export default function WishForm({ onSubmit, isSubmitting }) {
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    attendance: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await onSubmit(formData.name, formData.message, formData.attendance);
      setFormData({ name: '', message: '', attendance: '' });

      Swal.fire({
        icon: 'success',
        title: 'Ucapan terkirim!',
        text: 'Terima kasih atas doa dan ucapan Anda',
        timer: 3000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: error.message || 'Gagal mengirim ucapan',
      });
    }
  };

  return (
    <div className="mt-8 max-w-2xl mx-auto px-4">
      <h2 className="text-3xl font-nameFont1 text-primary mb-6 text-center">
        Ucapan & Konfirmasi Kehadiran
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Nama"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-secondary rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-secondary"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <textarea
            name="message"
            placeholder="Ucapan & Doa"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border-2 border-secondary rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-secondary resize-none"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <select
            name="attendance"
            value={formData.attendance}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-secondary rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-secondary"
            disabled={isSubmitting}
          >
            <option value="">Konfirmasi Kehadiran</option>
            <option value="hadir">Hadir</option>
            <option value="tidak">Tidak Hadir</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Mengirim...' : 'Kirim'}
        </button>
      </form>
    </div>
  );
}
