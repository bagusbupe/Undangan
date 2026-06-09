import { useState, useEffect } from 'react';
import { calculateCountdown, formatTimeDigit } from '../utils/date';

export default function Countdown({ targetDate }) {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      setCountdown(calculateCountdown(targetDate));
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex justify-center flex-wrap gap-2 md:gap-4 mt-6">
      <div
        className="countdown-box animate-fade-in"
        style={{ animationDelay: '0s' }}
      >
        <div className="text-lg md:text-2xl font-bold">
          {formatTimeDigit(countdown.days)}
        </div>
        <div className="countdown-label">Hari</div>
      </div>

      <div
        className="countdown-box animate-fade-in"
        style={{ animationDelay: '0.5s' }}
      >
        <div className="text-lg md:text-2xl font-bold">
          {formatTimeDigit(countdown.hours)}
        </div>
        <div className="countdown-label">Jam</div>
      </div>

      <div
        className="countdown-box animate-fade-in"
        style={{ animationDelay: '1s' }}
      >
        <div className="text-lg md:text-2xl font-bold">
          {formatTimeDigit(countdown.minutes)}
        </div>
        <div className="countdown-label">Menit</div>
      </div>

      <div
        className="countdown-box animate-fade-in"
        style={{ animationDelay: '1.5s' }}
      >
        <div className="text-lg md:text-2xl font-bold">
          {formatTimeDigit(countdown.seconds)}
        </div>
        <div className="countdown-label">Detik</div>
      </div>
    </div>
  );
}
