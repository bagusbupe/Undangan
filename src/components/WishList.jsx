export default function WishList({ wishes, totalAttendees, loading }) {
  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 text-center">
        <p className="text-primary">Memuat ucapan...</p>
      </div>
    );
  }

  return (
    <div className="mt-8 max-w-2xl mx-auto px-4">
      <div className="mb-6">
        <h3 className="text-2xl font-nameFont1 text-primary text-center mb-4">
          Daftar Ucapan
        </h3>

        <div className="text-center mb-6 p-4 bg-secondary rounded-lg">
          <p className="text-primary font-bold text-lg">
            Total Hadir: <span className="text-2xl">{totalAttendees}</span>
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {wishes.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-primary opacity-60">
              Belum ada ucapan. Jadilah yang pertama! 😊
            </p>
          </div>
        ) : (
          wishes.map((wish) => (
            <div key={wish.id} className="wish-card">
              <div className="font-semibold text-primary">{wish.name}</div>
              <div className="text-sm text-primary opacity-80 mt-2">
                {wish.message}
              </div>
              <div className="mt-3 text-xs font-semibold">
                <span
                  className={`inline-block px-3 py-1 rounded-full ${
                    wish.attendance === 'hadir'
                      ? 'bg-green-200 text-green-700'
                      : 'bg-red-200 text-red-700'
                  }`}
                >
                  {wish.attendance === 'hadir' ? '✓ Akan Hadir' : '✗ Tidak Hadir'}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="text-center mt-8 pb-16 text-primary opacity-60 text-sm">
        <p>&copy; Bagus Bupe 2024</p>
      </div>
    </div>
  );
}
