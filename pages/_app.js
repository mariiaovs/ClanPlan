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
  const [isFilterSet, setIsFilterSet] = useState(false);
  const [listType, setListType] = useState("today");

  const router = useRouter();

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
  function closeModalWindow() {
    setShowModal(false);
  }

  function handleCheckboxChange(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    );
  }

  function handleAddCategory(data) {
    setCategories([...categories, { id: uid(), ...data }]);
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

  useEffect(() => {
    if (
      filters.priority === "0" &&
      filters.category === "" &&
      filters.member === ""
    ) {
      setIsFilterSet(false);
    }
  }, [filters.category, filters.member, filters.priority]);

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
        onDelete={handleDeleteTask}
        onCancel={closeModalWindow}
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
        setIsFilterSet={setIsFilterSet}
        isFilterSet={isFilterSet}
        onButtonClick={handleButtonClick}
        listType={listType}
      />
    </Layout>
  );
}
