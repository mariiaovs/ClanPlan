import { useEffect, useState } from "react";
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
import StopMessage from "@/components/StopMessage";

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
  const [isDarkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    // Set the initial theme based on user preference or default to light
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setDarkTheme(prefersDark);
  }, []);

  const { data: categories, isLoading: isCategoryLoading } = useSWR(
    "/api/categories",
    fetcher
  );
  const { data: familyMembers, isLoading: isFamilyLoading } = useSWR(
    "/api/members",
    fetcher
  );
  const { data: tasks, isLoading } = useSWR("/api/tasks", fetcher);

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
        <Layout>
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
            {!session && <StopMessage />}
            {session && (
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
              />
            )}
          </SWRConfig>
        </Layout>
      </ThemeProvider>
    </SessionProvider>
  );
}
