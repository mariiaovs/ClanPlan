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
  background-color: var(--color-font);
  color: var(--color-font-light);
  text-align: center;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  max-width: 375px;
  margin: auto;
`;

const StyledPlus = styled(Plus)`
  width: 3rem;
  fill: ${({ $isActive }) => ($isActive ? "gray" : "var(--color-font)")};
`;

const StyledList = styled.ul`
  display: flex;
  justify-content: space-between;
  list-style: none;
  padding: 0;
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0.3rem;
  background-color: ${({ $isActive }) => ($isActive ? "gray" : "")};
  flex-direction: column;
`;

const StyledSpan = styled.span`
  font-size: 0.6rem;
`;
const StyledCreateItem = styled.li`
  position: fixed;
  left: calc(100vw / 2 - 2rem);
  bottom: 0.6rem;
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
            <StyledLink $isActive={currentPage === "/"} href="/">
              <Home />
              <StyledSpan>Home</StyledSpan>
            </StyledLink>
          </li>
          <li>
            <StyledLink $isActive={currentPage === "/family"} href="/family">
              <Family />
              <StyledSpan>Family</StyledSpan>
            </StyledLink>
          </li>
          <StyledCreateItem>
            <StyledLink href="/create">
              <StyledPlus $isActive={currentPage === "/create"} />
              <StyledSpan>Create</StyledSpan>
            </StyledLink>
          </StyledCreateItem>
          <li>
            <StyledLink
              $isActive={currentPage === "/categories"}
              href="/categories"
            >
              <Category />
              <StyledSpan>Category</StyledSpan>
            </StyledLink>
          </li>
          <li>
            <StyledLink
              $isActive={currentPage === "/calendar"}
              href="/calendar"
            >
              <CalendarIcon /> <StyledSpan>Calendar</StyledSpan>
            </StyledLink>
          </li>
        </StyledList>
      </nav>
    </StyledFooter>
  );
}
