import TasksList from "@/components/TasksList";
import styled from "styled-components";
import Filter from "@/public/assets/images/filter.svg";
import StyledButton from "@/components/StyledButton";
import Modal from "@/components/Modal";
import FilterWindow from "@/components/FilterWindow";
import { useState } from "react";
import Link from "next/link";

const StyledHeading = styled.h2`
  text-align: center;
`;

const StyledMessage = styled.p`
  text-align: center;
  padding-top: 4rem;
`;

const StyledList = styled.ul`
  list-style: none;
  padding: 0.5rem;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const StyledClearFilterButton = styled.button`
  color: white;
  font-weight: 700;
  background-color: var(--color-font);
  padding: 0.5rem;
  border-radius: 0.7rem;
`;

const StyledLink = styled(Link)`
  margin: 1rem;
  color: white;
  font-weight: 700;
  background-color: var(--color-font);
  padding: 0.5rem;
  width: 8rem;
  border-radius: 0.5rem;
  border: 0.5px solid white;
  position: absolute;
  right: calc(50% - 180px);
  text-align: center;
`;

export default function HomePage({
  tasks,
  onCheckboxChange,
  setShowModal,
  showModal,
  familyMembers,
  setDetailsBackLinkRef,
  categories,
}) {
  const [filters, setFilters] = useState({});

  function handleApplyFilters(formData) {
    setFilters(formData);
    setShowModal(false);
  }

  function handleDeleteFilterOption(key) {
    setFilters({ ...filters, [key]: "" });
  }

  const filteredTasks = tasks.filter(
    (task) =>
      (!Number(filters.priority) || task.priority === filters.priority) &&
      (!filters.category || task.category === filters.category) &&
      (!filters.member || task.assignedTo.includes(filters.member))
  );

  return (
    <div>
      {showModal && (
        <Modal $top="5rem" setShowModal={setShowModal}>
          <FilterWindow
            familyMembers={familyMembers}
            onApply={handleApplyFilters}
            filters={filters}
            categories={categories}
          />
        </Modal>
      )}
      <StyledHeading>Family Task List</StyledHeading>

      <StyledButton
        $width="4rem"
        $left="0.5rem"
        onClick={() => setShowModal(true)}
      >
        <Filter />
      </StyledButton>
      <StyledLink href="/calendar">📅 Calendar</StyledLink>
      {!tasks.length && <StyledMessage>No tasks to display.</StyledMessage>}
      <StyledList>
        {Object.keys(filters).map(
          (key) =>
            Number(filters[key]) !== 0 && (
              <StyledClearFilterButton
                onClick={() => handleDeleteFilterOption(key)}
                key={key}
              >
                ❌ {key}:{" "}
                {key === "member"
                  ? familyMembers.find((member) => member.id === filters[key])
                      .name
                  : key === "category"
                  ? categories.find((category) => category.id === filters[key])
                      .category
                  : filters[key]}
              </StyledClearFilterButton>
            )
        )}
      </StyledList>
      {!filteredTasks.length && (
        <StyledMessage>No tasks with this search criteria.</StyledMessage>
      )}
      <TasksList
        tasks={filteredTasks}
        onCheckboxChange={onCheckboxChange}
        setDetailsBackLinkRef={setDetailsBackLinkRef}
        categories={categories}
      />
    </div>
  );
}

export { StyledMessage };
