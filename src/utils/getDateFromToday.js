export default function getDateFromToday(days) {
  const date = new Date();

  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();
  const currentDay = date.getDate();

  return new Date(currentYear, currentMonth, currentDay + days);
}
