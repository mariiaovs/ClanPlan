import styled from "styled-components";
import { Calendar, globalizeLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import globalize from "globalize";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useRouter } from "next/router";
import useSWR from "swr";
import CalendarEvent from "@/components/CalendarEvent";

const localizer = globalizeLocalizer(globalize);
const DnDCalendar = withDragAndDrop(Calendar);

const StyledHeading = styled.h2`
  text-align: center;
  margin-bottom: 0.5rem;
`;

const StyledSection = styled.section`
  padding: 1rem;
  background-color: white;
  border-radius: 1rem;
  height: 530px;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  box-shadow: 5px 5px 15px 5px rgba(112, 107, 91, 0.83);
`;

const StyledCalendar = styled(DnDCalendar)`
  height: 440px;
`;

export default function CalendarPage({
  tasks,
  setDetailsBackLinkRef,
  currentDate,
  setCurrentDate,
  currentView,
  setCurrentView,
}) {
  const { mutate } = useSWR(`/api/tasks`);

  const router = useRouter();

  const events = tasks.map((task) => {
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(12);
    dueDate.setMinutes(0);
    dueDate.setSeconds(0);
    return {
      id: task._id,
      title: task.title,
      start: new Date(dueDate),
      end: new Date(dueDate),
      isDone: task.isDone,
      allDay: true,
    };
  });

  function handleEventClick(task) {
    setDetailsBackLinkRef("/calendar");
    router.push(`/tasks/${task.id}?listType=calendar`);
  }

  function onEventDrop(data) {
    const todayDate = new Date();
    const newTaskDate = data.start;

    if (
      newTaskDate.toISOString().substring(0, 10) <
      todayDate.toISOString().substring(0, 10)
    )
      return;

    const updatedTaskId = data.event.id;

    const taskToUpdate = tasks.find((task) => task._id === updatedTaskId);
    const updatedTask = {
      ...taskToUpdate,
      dueDate: data.start.toISOString().substring(0, 10),
    };
    handleEditTaskData(updatedTask);
  }

  async function handleEditTaskData(updatedTask) {
    const response = await fetch(`/api/tasks/${updatedTask._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });
    if (response.ok) {
      mutate();
    }
  }

  return (
    <StyledSection>
      <StyledHeading>My Calendar</StyledHeading>
      <StyledCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        onSelectEvent={handleEventClick}
        onEventDrop={onEventDrop}
        resizable={false}
        views={["month", "week", "day", "agenda"]}
        defaultView={currentView}
        date={currentDate}
        onNavigate={(date) => setCurrentDate(date)}
        onView={(view) => setCurrentView(view)}
        components={{
          event: CalendarEvent,
        }}
      />
    </StyledSection>
  );
}
