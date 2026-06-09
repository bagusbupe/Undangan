export default function EventCard({ title, date, time, address, fullAddress }) {
  return (
    <div className="card-wedding p-4">
      <h3 className="text-xl font-nameFont1 text-primary mb-4 text-center">
        {title}
      </h3>

      <div className="space-y-3 text-sm md:text-base">
        <div className="flex items-start">
          <i className="fas fa-calendar-days text-primary mr-3 mt-1 flex-shrink-0"></i>
          <p className="text-primary">{date}</p>
        </div>

        <div className="flex items-start">
          <i className="fas fa-clock text-primary mr-3 mt-1 flex-shrink-0"></i>
          <p className="text-primary">{time}</p>
        </div>

        <div className="flex items-start gap-3">
          <i className="fas fa-location-dot text-primary mt-1 flex-shrink-0"></i>
          <div>
            <p className="text-primary font-semibold mb-1">{address}</p>
            <p className="text-primary text-sm opacity-80">{fullAddress}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
