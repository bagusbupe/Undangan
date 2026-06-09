import { useParams } from 'react-router-dom';
import TemplateRegistry from '../templates/TemplateRegistry';
import { useWishes } from '../hooks/useWishes';

export default function Preview() {
  const { id } = useParams();
  const Template = TemplateRegistry.get(id);
  const { wishes, loading, submitting, submitWish, getTotalAttendees } = useWishes();

  if (!Template) return <div className="p-8">Template not found: {id}</div>;

  const shared = { wishes, loading, submitting, submitWish, getTotalAttendees };

  // Provide minimal props for preview; allow query override in real app
  const props = {
    coupleNames: { bride: 'Preview Bride', groom: 'Preview Groom' },
    weddingDate: new Date(),
    events: [],
    gallery: [],
    bankAccount: '0000000000',
    audioSrc: '/share/Audio.mp3',
  };

  return <Template {...props} shared={shared} />;
}
