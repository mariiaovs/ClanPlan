import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children, isDarkTheme, setDarkTheme }) {
  return (
    <>
      <Header isDarkTheme={isDarkTheme} setDarkTheme={setDarkTheme} />
      {children}
      <Footer />
    </>
  );
}
