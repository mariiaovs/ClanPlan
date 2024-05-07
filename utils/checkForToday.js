export default function checkForToday(dueDate) {
  const today = new Date();
  const isToday = today.toDateString() === new Date(dueDate).toDateString();
  return isToday;
}
