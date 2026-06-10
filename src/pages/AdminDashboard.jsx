import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';
import {
  createSlug,
  deleteInvitationRemote,
  getDefaultInvitation,
  getInvitationTitle,
  getInvitationsRemote,
  setActiveInvitationSlug,
  upsertInvitationRemote,
} from '../utils/invitationStorage';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { admin, logout } = useAdmin();
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!admin) {
      navigate('/admin/login');
      return;
    }

    setLoading(true);
    getInvitationsRemote()
      .then(setInvitations)
      .finally(() => setLoading(false));
  }, [admin, navigate]);

  const handleCreate = async () => {
    const base = getDefaultInvitation(createSlug(`undangan-${Date.now()}`));
    const invitation = await upsertInvitationRemote({
      ...base,
      title: 'Undangan Baru',
    });
    navigate(`/admin/edit/${invitation.slug}`);
  };

  const handlePreview = (slug) => {
    setActiveInvitationSlug(slug);
    window.open(`/preview/simple`, '_blank', 'noopener,noreferrer');
  };

  const handleDelete = async (invitation) => {
    const confirmed = window.confirm(`Hapus undangan "${invitation.title || invitation.slug}"?`);
    if (!confirmed) return;

    await deleteInvitationRemote(invitation.slug);
    setInvitations((current) => current.filter((item) => item.slug !== invitation.slug));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
          <h1 className="text-2xl font-nameFont1 text-primary">Admin Dashboard</h1>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <span className="text-sm text-gray-600">Selamat datang, <strong>{admin?.username}</strong></span>
            <button
              onClick={() => {
                logout();
                navigate('/admin/login');
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-primary">Data Undangan</h2>
              <p className="text-gray-600">Semua undangan memakai template simple yang sama, datanya berbeda per slug.</p>
            </div>
            <button
              onClick={handleCreate}
              className="px-5 py-3 bg-primary text-white rounded-lg hover:opacity-90"
            >
              Buat Undangan
            </button>
          </div>

          {loading && <div className="p-6 text-center text-gray-600">Loading data undangan...</div>}

          {!loading && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {invitations.map((invitation) => (
              <div key={invitation.slug} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition bg-white">
                <h3 className="text-lg font-semibold text-primary mb-2">{invitation.title || getInvitationTitle(invitation.data)}</h3>
                <p className="text-sm text-gray-600 mb-1">Template: simple</p>
                <p className="text-sm text-gray-600 mb-4 break-all">/{invitation.slug}</p>
                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={() => navigate(`/admin/edit/${invitation.slug}`)}
                    className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90"
                  >
                    Edit Data
                  </button>
                  <button
                    onClick={() => handlePreview(invitation.slug)}
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Preview
                  </button>
                  <a
                    href={`/${invitation.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-center hover:bg-gray-200"
                  >
                    Buka Link Public
                  </a>
                  <button
                    onClick={() => handleDelete(invitation)}
                    className="w-full px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                  >
                    Hapus Undangan
                  </button>
                </div>
              </div>
            ))}
          </div>}
        </div>
      </main>
    </div>
  );
}
