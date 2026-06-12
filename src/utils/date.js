export function formatWeddingDate(date) {
  if (!date) return '';
  const parsedDate = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return '';

  let formatted = parsedDate.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return formatted.replace('Minggu', 'Ahad/Minggu');
}

export function calculateCountdown(targetDate) {
  if (!targetDate || Number.isNaN(new Date(targetDate).getTime())) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const currentDate = new Date();
  const timeDifference = targetDate - currentDate;

  if (timeDifference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((timeDifference % (1000 * 60)) / 1000),
  };
}

export function formatTimeDigit(time) {
  return time < 10 ? `0${time}` : time;
}
