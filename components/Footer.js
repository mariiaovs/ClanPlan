import styled from "styled-components";
import Link from "next/link";
import Home from "@/public/assets/images/home.svg";
import Plus from "@/public/assets/images/plus.svg";
import Family from "@/public/assets/images/family.svg";
import Category from "@/public/assets/images/category.svg";
import CalendarIcon from "@/public/assets/images/calendar.svg";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const StyledFooter = styled.footer`
  background-color: var(--color-background);
  box-shadow: -1px -6px 15px 0px #7d7d7d;
  text-align: center;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  max-width: 375px;
  margin: auto;

  @media (min-width: 1200px), (min-width: 900px) {
    position: fixed;
    max-width: 100vw;
    margin: 0;
    height: 100vh;
    width: 100px;
    flex-direction: column;
  }
`;

const StyledPlus = styled(Plus)`
  width: 3rem;
  stroke: ${({ $isActive }) =>
    $isActive ? "var(--color-font)" : "var(--color-footer-signature)"};
`;

const StyledHome = styled(Home)`
  stroke: ${({ $isActive }) =>
    $isActive ? "var(--color-font)" : "var(--color-footer-signature)"};
`;

const StyledFamily = styled(Family)`
  stroke: ${({ $isActive }) =>
    $isActive ? "var(--color-font)" : "var(--color-footer-signature)"};
`;

const StyledCategory = styled(Category)`
  stroke: ${({ $isActive }) =>
    $isActive ? "var(--color-font)" : "var(--color-footer-signature)"};
`;

const StyledCalendarIcon = styled(CalendarIcon)`
  stroke: ${({ $isActive }) =>
    $isActive ? "var(--color-font)" : "var(--color-footer-signature)"};
`;

const StyledList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-content: space-between;
  list-style: none;
  padding: 0;

  @media (min-width: 1200px), (min-width: 900px) {
    grid-template-columns: 1fr;
    left: 0;
    height: 100vh;
    width: 90px;
    flex-direction: column;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  gap: 5px;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0.6rem;
  flex-direction: column;
`;

const StyledSpan = styled.span`
  font-size: 0.8rem;
  color: ${({ $isActive }) =>
    $isActive ? "var(--color-font)" : "var(--color-footer-signature)"};
`;
const StyledCreateItem = styled.li`
  position: fixed;
  left: calc(100vw / 2 - 2rem);
  bottom: 0.6rem;
  @media (min-width: 1200px), (min-width: 900px) {
    position: inherit;
  }
`;

const StyledListItem = styled.li`
  padding-right: 4rem;
  width: 9rem;

  @media (min-width: 1200px), (min-width: 900px) {
    padding-right: inherit;
    width: inherit;
  }
`;

export default function Footer() {
  const [currentPage, setCurrentPage] = useState("/");
  const router = useRouter();

  useEffect(() => {
    setCurrentPage(router.pathname);
  }, [router.pathname]);

  return (
    <StyledFooter>
      <nav>
        <StyledList>
          <li>
            <StyledLink href="/">
              <StyledHome $isActive={currentPage === "/"} />
              <StyledSpan $isActive={currentPage === "/"}>Home</StyledSpan>
            </StyledLink>
          </li>
          <StyledListItem>
            <StyledLink href="/family">
              <StyledFamily $isActive={currentPage === "/family"} />
              <StyledSpan $isActive={currentPage === "/family"}>
                Family
              </StyledSpan>
            </StyledLink>
          </StyledListItem>

          <li>
            <StyledLink href="/categories">
              <StyledCategory $isActive={currentPage === "/categories"} />
              <StyledSpan $isActive={currentPage === "/categories"}>
                Category
              </StyledSpan>
            </StyledLink>
          </li>
          <li>
            <StyledLink href="/calendar">
              <StyledCalendarIcon $isActive={currentPage === "/calendar"} />
              <StyledSpan $isActive={currentPage === "/calendar"}>
                Calendar
              </StyledSpan>
            </StyledLink>
          </li>
          <StyledCreateItem>
            <StyledLink href="/create">
              <StyledPlus $isActive={currentPage === "/create"} />
              <StyledSpan $isActive={currentPage === "/create"}>
                Create
              </StyledSpan>
            </StyledLink>
          </StyledCreateItem>
        </StyledList>
      </nav>
    </StyledFooter>
  );
}
