import { useState } from "react";
import TasksListGroup from "./TasksListGroup";

export default function TasksListGroups({ tasks, onSetDetailsBackLinkRef }) {
  const [hideGroup, setHideGroup] = useState({});

  function handleHideGroup(key) {
    setHideGroup({ ...hideGroup, [key]: !hideGroup[key] });
  }

  const missedTasks = tasks.filter(
    (task) =>
      !task.isDone &&
      task.dueDate &&
      new Date(task.dueDate).toISOString().substring(0, 10) <
        new Date().toISOString().substring(0, 10)
  );

  const todaysTasks = tasks.filter(
    (task) =>
      !task.isDone &&
      new Date(task?.dueDate).toDateString() === new Date().toDateString()
  );

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const tomorrowsTasks = tasks.filter(
    (task) =>
      !task.isDone &&
      new Date(task?.dueDate).toDateString() === tomorrow.toDateString()
  );

  const today = new Date();
  const thirdDay = new Date();
  thirdDay.setDate(thirdDay.getDate() + 2);
  const thisSunday = new Date(today);
  thisSunday.setDate(
    today.getDay() !== 0 && today.getDate() - today.getDay() + 7
  );

  const thisWeekTasks =
    today.getDay() === 6 || today.getDay() === 0
      ? []
      : tasks.filter(
          (task) =>
            !task.isDone &&
            task?.dueDate >= thirdDay.toISOString().substring(0, 10) &&
            task?.dueDate <= thisSunday.toISOString().substring(0, 10)
        );

  const nextMonday = new Date();
  nextMonday.setDate(thisSunday.getDate() + 1);
  const nextTuesday = new Date();
  nextTuesday.setDate(thisSunday.getDate() + 2);
  const nextSunday = new Date();
  nextSunday.setDate(thisSunday.getDate() + 7);

  const nextWeekTasks =
    today.getDay() === 0
      ? tasks.filter(
          (task) =>
            !task.isDone &&
            task?.dueDate >= nextTuesday.toISOString().substring(0, 10) &&
            task?.dueDate <= nextSunday.toISOString().substring(0, 10)
        )
      : tasks.filter(
          (task) =>
            !task.isDone &&
            task?.dueDate >= nextMonday.toISOString().substring(0, 10) &&
            task?.dueDate <= nextSunday.toISOString().substring(0, 10)
        );

  const afterNextWeekMonday = new Date(nextSunday);
  afterNextWeekMonday.setDate(afterNextWeekMonday.getDate() + 1);
  const firstDayNextMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    1,
    2
  );

  const lastDayThisMonth = new Date(firstDayNextMonth - 1);

  const thisMonthTasks = tasks.filter(
    (task) =>
      !task.isDone &&
      task?.dueDate >= afterNextWeekMonday.toISOString().substring(0, 10) &&
      task?.dueDate <= lastDayThisMonth.toISOString().substring(0, 10)
  );

  const firstDayAfterNextMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 2,
    1,
    2
  );

  const lastDayNextMonth = new Date(firstDayAfterNextMonth - 1);
  const nextMonthTasks = tasks.filter(
    (task) =>
      !task.isDone &&
      task?.dueDate >= firstDayNextMonth.toISOString().substring(0, 10) &&
      task?.dueDate <= lastDayNextMonth.toISOString().substring(0, 10)
  );

  const laterTasks = tasks.filter(
    (task) =>
      !task.isDone &&
      task?.dueDate >= firstDayAfterNextMonth.toISOString().substring(0, 10)
  );

  const completedTasks = tasks.filter((task) => task.isDone);

  const tasksGroupsData = [
    { tasks: missedTasks, groupKey: "Missed", red: true },
    { tasks: todaysTasks, groupKey: "Today" },
    { tasks: tomorrowsTasks, groupKey: "Tomorrow" },
    { tasks: thisWeekTasks, groupKey: "This week" },
    { tasks: nextWeekTasks, groupKey: "Next week" },
    { tasks: thisMonthTasks, groupKey: "This month" },
    { tasks: nextMonthTasks, groupKey: "Next month" },
    { tasks: laterTasks, groupKey: "Later" },
    { tasks: completedTasks, groupKey: "Completed" },
  ];
  return (
    <>
      {tasksGroupsData.map(
        (taskGroupData) =>
          taskGroupData.tasks.length > 0 && (
            <TasksListGroup
              key={taskGroupData.groupKey}
              tasks={taskGroupData.tasks}
              onSetDetailsBackLinkRef={onSetDetailsBackLinkRef}
              groupKey={taskGroupData.groupKey}
              onHideGroup={handleHideGroup}
              hideGroup={hideGroup}
              $red={taskGroupData.red}
            />
          )
      )}
    </>
  );
}
