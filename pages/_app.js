import { useState } from "react";
import GlobalStyle from "../styles";
import Layout from "@/components/Layout";
import { SWRConfig } from "swr";
import useSWR from "swr";
import StyledLoadingAnimation from "@/components/StyledLoadingAnimation";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";
import AuthGate from "@/components/AuthGate";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [showModal, setShowModal] = useState(false);
  const [detailsBackLinkRef, setDetailsBackLinkRef] = useState("/");
  const [filters, setFilters] = useState({});
  const [listType, setListType] = useState("today");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState("month");

  const { data: categories, isLoading: isCategoryLoading } = useSWR(
    "/api/categories",
    fetcher
  );
  const {
    data: familyMembers,
    isLoading: isFamilyLoading,
    mutate: mutateMembers,
  } = useSWR("/api/members", fetcher);
  const { data: tasks, isLoading } = useSWR("/api/tasks", fetcher);

  const { data: user, isLoading: isUserLoading } = useSWR(
    `/api/members/auth`,
    fetcher
  );

  if (isLoading) {
    return <StyledLoadingAnimation />;
  }

  if (!tasks) {
    return;
  }

  if (isCategoryLoading) {
    return <StyledLoadingAnimation />;
  }
  if (!categories) {
    return;
  }

  if (isFamilyLoading) {
    return <StyledLoadingAnimation />;
  }
  if (!familyMembers) {
    return;
  }

  if (isUserLoading) {
    return <StyledLoadingAnimation />;
  }
  if (!user) {
    return;
  }

  //const userId = "6631ff475a93007538a23e95"; //swetha
  //const userId = "6631ff575a93007538a23e98"; // Lokesh

  //const user = familyMembers.find((member) => member.email === userId);

  const isDarkTheme = user
    ? user.isDarkTheme
    : window.matchMedia("(prefers-color-scheme: dark)").matches;

  function handleSetDetailsBackLinkRef(link) {
    setDetailsBackLinkRef(link);
  }

  function handleApplyFilters(formData) {
    setFilters(formData);
    setShowModal(false);
  }

  function handleDeleteFilterOption(key) {
    setFilters({ ...filters, [key]: "" });
  }

  function handleHomePageButtonClick(listType) {
    setListType(listType);
    setFilters({});
  }

  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
        <Layout user={user}>
          <GlobalStyle />
          <SWRConfig value={{ fetcher }}>
            <ToastContainer
              position="top-center"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme={isDarkTheme ? "dark" : "light"}
            />
            <AuthGate>
              <Component
                {...pageProps}
                tasks={tasks}
                familyMembers={familyMembers}
                setShowModal={setShowModal}
                showModal={showModal}
                categories={categories}
                detailsBackLinkRef={detailsBackLinkRef}
                onSetDetailsBackLinkRef={handleSetDetailsBackLinkRef}
                onApplyFilters={handleApplyFilters}
                onDeleteFilterOption={handleDeleteFilterOption}
                filters={filters}
                setFilters={setFilters}
                onButtonClick={handleHomePageButtonClick}
                listType={listType}
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
                currentView={currentView}
                setCurrentView={setCurrentView}
                isDarkTheme={isDarkTheme}
                user={user}
                mutateMembers={mutateMembers}
              />
            </AuthGate>
          </SWRConfig>
        </Layout>
      </ThemeProvider>
    </SessionProvider>
  );
}
