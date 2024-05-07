export default function checkForMissedDate(dueDate) {
  const today = new Date();
  const isMissed =
    new Date(dueDate).toISOString().substring(0, 10) <
    today.toISOString().substring(0, 10);
  return isMissed;
}
