import { useParams } from 'react-router-dom';
import TemplateRegistry from '../templates/TemplateRegistry';
import { useWishes } from '../hooks/useWishes';

export default function Preview() {
  const { id } = useParams();
  const Template = TemplateRegistry.get(id);
  const { wishes, loading, submitting, submitWish, getTotalAttendees } = useWishes();

  if (!Template) return <div className="p-8">Template not found: {id}</div>;

  const shared = { wishes, loading, submitting, submitWish, getTotalAttendees };

  // Read preview overrides from query parameters if provided
  const searchParams = new URLSearchParams(window.location.search);
  const overrides = {};

  const bride = searchParams.get('bride');
  const groom = searchParams.get('groom');
  if (bride || groom) {
    overrides.couple = {
      bride: { fullName: bride || '' },
      groom: { fullName: groom || '' },
    };
  }

  const dateParam = searchParams.get('date');
  if (dateParam) {
    overrides.weddingDate = new Date(dateParam);
  }

  // If no overrides are provided, the template will render its defaults
  return <Template {...overrides} shared={shared} />;
}
