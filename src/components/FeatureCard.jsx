export default function FeatureCard({ title, desc, icon }) {
  return (
    <div className="p-6 bg-white/60 backdrop-blur rounded-lg shadow-sm border border-gray-100">
      <div className="text-3xl mb-4 text-primary">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-700">{desc}</p>
    </div>
  );
}
