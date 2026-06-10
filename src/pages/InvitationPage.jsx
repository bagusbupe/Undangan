import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useWishes } from '../hooks/useWishes';
import TemplateRegistry from '../templates/TemplateRegistry';
import { getInvitationBySlugRemote } from '../utils/invitationStorage';

export default function InvitationPage() {
  const { slug } = useParams();
  const [invitation, setInvitation] = useState(null);
  const [loadingInvitation, setLoadingInvitation] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { wishes, loading, submitting, submitWish, getTotalAttendees } = useWishes(slug || 'default');

  useEffect(() => {
    setLoadingInvitation(true);
    setNotFound(false);
    getInvitationBySlugRemote(slug)
      .then((item) => {
        setInvitation(item);
        setNotFound(!item);
      })
      .finally(() => setLoadingInvitation(false));
  }, [slug]);

  const Template = TemplateRegistry.get(invitation?.templateId || 'simple');

  if (loadingInvitation) {
    return <div className="min-h-screen bg-bg flex items-center justify-center p-6 text-primary">Loading undangan...</div>;
  }

  if (notFound || !invitation || !Template) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center p-6 text-center">
        <div className="max-w-md">
          <h1 className="text-3xl font-nameFont1 text-primary mb-4">Undangan tidak ditemukan</h1>
          <p className="text-primary mb-6">Link undangan ini belum tersedia atau slug-nya tidak sesuai.</p>
          <Link to="/" className="btn-location inline-block">
            Kembali
          </Link>
        </div>
      </div>
    );
  }

  const shared = { wishes, loading, submitting, submitWish, getTotalAttendees };

  return <Template data={invitation.data} shared={shared} />;
}
