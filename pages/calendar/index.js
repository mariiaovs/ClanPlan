import styled from "styled-components";
import { Calendar, globalizeLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import globalize from "globalize";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useRouter } from "next/router";
import useSWR from "swr";
import CalendarEvent from "@/components/CalendarEvent";
import CalendarAgendaEvent from "@/components/CalendarAgendaEvent";
import { toast } from "react-toastify";
import convertDateToString from "@/utils/convertDateToString";

const localizer = globalizeLocalizer(globalize);
const DnDCalendar = withDragAndDrop(Calendar);

const StyledHeading = styled.h2`
  text-align: center;
  margin-bottom: 0.5rem;
`;

const StyledSection = styled.section`
  padding: 1rem;
  background-color: var(--color-background);
  border-radius: 1rem;
  height: 530px;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  box-shadow: 1px 1px 10px -1px var(--color-font);
`;

const StyledCalendar = styled(DnDCalendar)`
  height: 440px;
`;

export default function CalendarPage({
  tasks,
  onSetDetailsBackLinkRef,
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
    onSetDetailsBackLinkRef("/calendar");
    router.push(`/tasks/${task.id}`);
  }

  function onEventDrop(data) {
    const newTaskDate = data.start;

    if (convertDateToString(newTaskDate) < convertDateToString(new Date()))
      return;

    const updatedTaskId = data.event.id;

    const taskToUpdate = tasks.find((task) => task._id === updatedTaskId);
    const updatedTask = {
      ...taskToUpdate,
      dueDate: convertDateToString(data.start),
    };
    handleEditTaskData(updatedTask);
  }

  async function handleEditTaskData(updatedTask) {
    const response = await toast.promise(
      fetch(`/api/tasks/${updatedTask._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      }),
      {
        pending: "Task updation is pending",
        success: "Task updated successfully",
        error: "Task not updated",
      }
    );
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
          month: {
            event: CalendarEvent,
          },
          week: {
            event: CalendarEvent,
          },
          day: {
            event: CalendarEvent,
          },
          agenda: {
            event: CalendarAgendaEvent,
          },
        }}
      />
    </StyledSection>
  );
}
