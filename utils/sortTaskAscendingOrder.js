export default function sortTaskAscendingOrder(tasks) {
  const tasksAfterSorting = tasks.sort(
    (a, b) => Date.parse(a.dueDate) - Date.parse(b.dueDate)
  );
  return tasksAfterSorting;
}
