import { useEffect, useState } from "react";
import GlobalStyle from "../styles";
import initialTasks from "@/db/lib/tasks";
import initialFamilyMembers from "@/db/lib/familyMembers";
import initialCategories from "@/db/lib/categories";
import { uid } from "uid";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [familyMembers, setFamilyMembers] = useState(initialFamilyMembers);
  const [categories, setCategories] = useState(initialCategories);
  const [showModal, setShowModal] = useState(false);
  const [detailsBackLinkRef, setDetailsBackLinkRef] = useState("/");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [filters, setFilters] = useState({});
  const [listType, setListType] = useState("today");

  const router = useRouter();

  const isFilterSet =
    (filters.priority !== "0" || filters.priority == true) &&
    filters.category == true &&
    filters.member == true;

  function handleAddTask(formData) {
    setTasks([
      ...tasks,
      {
        id: uid(),
        ...formData,
        isDone: false,
      },
    ]);
  }

  function handleEditTask(updatedData) {
    const id = updatedData.id;
    setTasks(tasks.map((task) => (task.id === id ? updatedData : task)));
  }

  function handleAddMember(memberFormData) {
    setFamilyMembers([...familyMembers, { id: uid(), ...memberFormData }]);
    setShowModal(false);
  }

  function handleDeleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
    setShowModal(false);
    router.push("/");
  }

  function handleCheckboxChange(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    );
  }

  function handleAddCategory(data) {
    setCategories([...categories, { ...data, id: uid() }]);
    setShowModal(false);
  }

  function handleEditCategory(data) {
    setCategories(
      categories.map((category) => (category.id === data.id ? data : category))
    );
    setTasks(
      tasks.map((task) =>
        !task.isDone &&
        task.category === data.id &&
        !task.assignedTo.every((memberId) =>
          data.selectedMembers.includes(memberId)
        )
          ? { ...task, assignedTo: [] }
          : task
      )
    );
    setShowModal(false);
  }

  function handleChangeDate(date) {
    setCurrentDate(date);
  }

  function handleApplyFilters(formData) {
    setFilters(formData);
    setShowModal(false);
  }

  function handleDeleteFilterOption(key) {
    setFilters({ ...filters, [key]: "" });
  }

  function handleButtonClick(listType) {
    setListType(listType);
    setFilters({});
  }

  function handleDeleteCategory(id) {
    setCategories(categories.filter((category) => category.id !== id));
    setTasks(
      tasks.map((task) =>
        task.category === id ? { ...task, category: "" } : task
      )
    );
    setShowModal(false);
  }

  // Sorting the task in chronological order of date
  const tasksAfterSorting = tasks.sort(
    (a, b) => Date.parse(a.dueDate) - Date.parse(b.dueDate)
  );

  return (
    <Layout>
      <GlobalStyle />
      <Component
        {...pageProps}
        tasks={tasksAfterSorting}
        onAddTask={handleAddTask}
        onEditData={handleEditTask}
        familyMembers={familyMembers}
        onAddMember={handleAddMember}
        setShowModal={setShowModal}
        showModal={showModal}
        onDeleteTask={handleDeleteTask}
        onCheckboxChange={handleCheckboxChange}
        categories={categories}
        onAddCategory={handleAddCategory}
        detailsBackLinkRef={detailsBackLinkRef}
        setDetailsBackLinkRef={setDetailsBackLinkRef}
        onChangeDate={handleChangeDate}
        currentDate={currentDate}
        onApplyFilters={handleApplyFilters}
        onDeleteFilterOption={handleDeleteFilterOption}
        filters={filters}
        setFilters={setFilters}
        isFilterSet={isFilterSet}
        onButtonClick={handleButtonClick}
        listType={listType}
        onDeleteCategory={handleDeleteCategory}
        onEditCategory={handleEditCategory}
      />
    </Layout>
  );
}
