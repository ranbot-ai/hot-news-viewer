function getOrdinal(n: number): string {
  if (n > 3 && n < 21) return "th";
  switch (n % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export function formatNumberShort(num: number | undefined | null): string {
  if (typeof num !== "number" || isNaN(num)) return "-";
  if (num >= 1e9) return (num / 1e9).toFixed(1).replace(/\.0$/, "") + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(1).replace(/\.0$/, "") + "K";

  return num.toString();
}

export function formatEventDate(dateStr: unknown): string {
  if (!dateStr) return "-";
  let d: Date;
  if (typeof dateStr === "number") {
    d = new Date(dateStr * 1000);
  } else if (typeof dateStr === "string") {
    if (/^\d+$/.test(dateStr)) {
      d = new Date(Number(dateStr) * 1000);
    } else {
      d = new Date(dateStr.replace(/-/g, "/"));
    }
  } else {
    return String(dateStr);
  }
  if (isNaN(d.getTime())) return String(dateStr);

  const today = new Date();
  if (
    d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth() &&
    d.getDate() === today.getDate()
  ) {
    return "Today";
  }
  const year = d.getFullYear();
  const month = d.toLocaleString(undefined, { month: "short" });
  const day = d.getDate();
  return `${year} ${month} ${day}${getOrdinal(day)}`;
}
