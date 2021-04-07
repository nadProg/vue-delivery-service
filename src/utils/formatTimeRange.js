export default function formatTimeRange(value) {
  const min = value % 1 ? '30' : '00';
  const hour = parseInt(value);
  return `${hour}:${min} - ${hour + 2}:${min}`;
}
