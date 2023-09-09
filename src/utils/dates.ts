export const formatDate = (date: Date) => {
  return `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getFullYear()}`;
};

const DATE_UNITS: Record<string, number> = {
  year: 31536800,
  month: 2629800,
};

export const getRelativeTime = (date: Date) => {
  const start = date.getTime();
  const timeEnd = Date.now();
  const elapsed = (start - timeEnd) / 1000;
  for (const unit in DATE_UNITS) {
    if (Object.prototype.hasOwnProperty.call(DATE_UNITS, unit)) {
      const absTime = Math.abs(elapsed);
      const element = DATE_UNITS[unit] || 0;
      if (absTime > element || unit === "month") {
        return `${Math.round(absTime / element)} ${
          unit === "year" ? "años" : "meses"
        }`;
      }
    }
  }
};
