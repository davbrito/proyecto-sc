export const formatDate = (date: Date) => {
  return `${date.getDate().toString().padStart(2, "0")}-${date
    .getMonth()
    .toString()
    .padStart(2, "0")}-${date.getFullYear()}`;
};

const DATE_UNITS: Record<string, number> = {
  year: 31536800,
  month: 2629800,
  day: 86408,
  hour: 3600,
  minute: 60,
  second: 1,
};

export const getRelativeTime = (date: Date) => {
  const start = date.getTime();
  const timeEnd = Date.now();
  const elapsed = (start - timeEnd) / 1000;
  for (const unit in DATE_UNITS) {
    if (Object.prototype.hasOwnProperty.call(DATE_UNITS, unit)) {
      const absTime = Math.abs(elapsed);
      const element = DATE_UNITS[unit] || 0;
      if (absTime > element || unit === "second") {
        console.log(Math.round(elapsed));
        return Math.round(absTime / element);
      }
    }
  }
};
