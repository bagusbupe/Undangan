import { Link } from 'react-router-dom';

export default function TemplateCard({ id, title = '', subtitle = '' }) {
  return (
    <div className="rounded-lg overflow-hidden shadow-sm border border-gray-100 bg-white">
      <div className="p-4">
        <div className="h-40 bg-gray-100 rounded-md mb-4 flex items-center justify-center text-gray-400">Preview</div>
        <h4 className="font-semibold mb-1">{title || id}</h4>
        <p className="text-sm text-gray-600 mb-3">{subtitle || 'Elegant wedding invitation'}</p>
        <div className="flex space-x-2">
          <Link to={`/preview/${id}`} className="btn-location inline-block">Preview</Link>
        </div>
      </div>
    </div>
  );
}
