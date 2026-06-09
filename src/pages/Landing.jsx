import { Link } from 'react-router-dom';
import TemplateRegistry from '../templates/TemplateRegistry';
import FeatureCard from '../components/FeatureCard';
import TemplateCard from '../components/TemplateCard';

export default function Landing() {
  const templates = TemplateRegistry.list();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50 py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Hero */}
        <header className="text-center mb-12">
          <p className="text-sm text-primary mb-4">Elegant · Minimal · Memorable</p>
          <h1 className="text-4xl md:text-6xl font-nameFont1 text-primary mb-4">Digital Wedding Invitations, reimagined</h1>
          <p className="text-gray-700 max-w-2xl mx-auto mb-6">Create beautiful, responsive wedding invitations with RSVP, guest wishes, and live updates. Select a template to start — no design skills required.</p>
          <div className="flex items-center justify-center space-x-4">
            <a href="/app" className="px-6 py-3 rounded-full bg-primary text-white shadow hover:opacity-95">Get Started</a>
            <a href="#templates" className="px-6 py-3 rounded-full border border-primary text-primary">Browse Templates</a>
          </div>
        </header>

        {/* Showcase */}
        <section id="templates" className="mb-12">
          <h2 className="text-2xl font-semibold text-primary mb-6">Template Showcase</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {templates.map((id) => (
              <TemplateCard key={id} id={id} title={id.replace(/-/g, ' ')} subtitle="Minimal, responsive design" />
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-primary mb-6">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard icon="💌" title="Beautiful Templates" desc="Handcrafted templates with elegant typography and spacing." />
            <FeatureCard icon="⚡️" title="Instant Preview" desc="Preview templates live, and share personalized links with guests." />
            <FeatureCard icon="🤝" title="Guest Wishes & RSVP" desc="Integrated wish wall and RSVP powered by Firebase for real-time updates." />
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white/80 p-8 rounded-xl shadow-md text-center">
          <h3 className="text-2xl font-semibold mb-2">Ready to create your invitation?</h3>
          <p className="text-gray-700 mb-6">Choose a template and customize your details. We'll handle the rest.</p>
          <div className="flex items-center justify-center space-x-4">
            <a href="/app" className="px-6 py-3 rounded-full bg-primary text-white">Start for Free</a>
            <a href="#templates" className="px-6 py-3 rounded-full border border-primary text-primary">See Templates</a>
          </div>
        </section>
      </div>
    </div>
  );
}
