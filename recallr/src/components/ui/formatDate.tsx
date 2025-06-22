export function formatDate(isoDateString:string) {
  const date = new Date(isoDateString);

  return date.toLocaleString('en-GB', {
    weekday: 'short',   // Sunday
    day: '2-digit',    // 22
    month: '2-digit',  // 06
    year: 'numeric',   // 2025
    hour: '2-digit',   // 19
    minute: '2-digit', // 30
    hour12: false,     // 24-hour format
  });
}