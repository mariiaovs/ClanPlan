export default function formatTasksDate(date) {
  const options = {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  };
  return new Date(date).toLocaleDateString("en-GB", options);
}
