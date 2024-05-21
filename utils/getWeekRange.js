export default function getWeekRange(date) {
  let currentDate = new Date(date);
  currentDate.setHours(0, 0, 0, 0);

  // Get the current day of the week (0-6)
  let currentDay = currentDate.getDay();

  // Calculate the offset if the week starts on Monday (1-7) instead of Sunday (0-6)
  let startOfWeek = new Date(currentDate);
  let endOfWeek = new Date(currentDate);
  if (currentDay === 0) {
    // Sunday case
    startOfWeek.setDate(currentDate.getDate() - 6);
    endOfWeek.setDate(currentDate.getDate() + 0);
  } else {
    startOfWeek.setDate(currentDate.getDate() - (currentDay - 1));
    endOfWeek.setDate(currentDate.getDate() + (7 - currentDay));
  }

  return {
    startOfWeek: startOfWeek,
    endOfWeek: endOfWeek,
  };
}
