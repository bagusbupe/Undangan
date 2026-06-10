import { useWishes } from './hooks/useWishes';
import TemplateRegistry from './templates/TemplateRegistry';
import { getActiveInvitation } from './utils/invitationStorage';

export default function TemplateApp() {
  const invitation = getActiveInvitation();
  const TemplateComponent = TemplateRegistry.get(invitation.templateId || 'simple');
  const { wishes, loading, submitting, submitWish, getTotalAttendees } = useWishes(invitation.slug || 'default');

  if (!TemplateComponent) return <div className="p-8">Template not found: {invitation.templateId}</div>;

  const shared = { wishes, loading, submitting, submitWish, getTotalAttendees };

  return <TemplateComponent data={invitation.data} shared={shared} />;
}
