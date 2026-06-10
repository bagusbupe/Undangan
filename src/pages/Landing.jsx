import TemplateRegistry from '../templates/TemplateRegistry';
import FeatureCard from '../components/FeatureCard';
import TemplateCard from '../components/TemplateCard';

export default function Landing() {
  const templates = TemplateRegistry.list();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50 py-16">
      <div className="fixed top-4 right-4 z-50">
        <a href="/admin/login" className="px-4 py-2 bg-gray-800 text-white text-sm rounded-lg hover:bg-gray-900">
          Admin
        </a>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <header className="text-center mb-12">
          <p className="text-sm text-primary mb-4">Elegant - Minimal - Memorable</p>
          <h1 className="text-4xl md:text-6xl font-nameFont1 text-primary mb-4">Digital Wedding Invitations</h1>
          <p className="text-gray-700 max-w-2xl mx-auto mb-6">
            Preview undangan pernikahan digital yang responsive dengan RSVP, ucapan tamu, dan data acara yang bisa dikelola admin.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/admin/login" className="px-6 py-3 rounded-full bg-primary text-white shadow hover:opacity-95">
              Admin Login
            </a>
            <a href="#templates" className="px-6 py-3 rounded-full border border-primary text-primary">
              Lihat Template
            </a>
          </div>
        </header>

        <section id="templates" className="mb-12">
          <h2 className="text-2xl font-semibold text-primary mb-6">Template Aktif</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {templates.map((id) => (
              <TemplateCard key={id} id={id} title={id.replace(/-/g, ' ')} subtitle="Template utama yang bisa dipakai admin untuk banyak undangan" />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-primary mb-6">Fitur</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard icon="01" title="Satu Template" desc="Satu desain utama bisa dipakai untuk banyak data undangan." />
            <FeatureCard icon="02" title="Preview Cepat" desc="Admin bisa melihat hasil data undangan sebelum membagikan link." />
            <FeatureCard icon="03" title="RSVP & Ucapan" desc="Ucapan tamu dan konfirmasi hadir berjalan real-time dengan Firebase." />
          </div>
        </section>

        <section className="bg-white/80 p-8 rounded-lg shadow-md text-center">
          <h3 className="text-2xl font-semibold mb-2">Kelola undangan dari admin</h3>
          <p className="text-gray-700 mb-6">User hanya bisa melihat preview atau link undangan. Pembuatan dan edit data hanya untuk admin.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/admin/login" className="px-6 py-3 rounded-full bg-primary text-white">
              Masuk Admin
            </a>
            <a href="#templates" className="px-6 py-3 rounded-full border border-primary text-primary">
              Lihat Template
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
