import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import User from "@/public/assets/images/user.svg";

const StyledHeader = styled.header`
  background-color: var(--color-background);
  color: var(--color-font);
  box-shadow: -1px 6px 15px 0px #7d7d7d;
  text-shadow: 2px 3px 3px #bccbd4;
  text-align: center;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  margin: auto;
  padding: 0.7rem;
  z-index: 1;
  max-width: 375px;

  @media (min-width: 1200px), (min-width: 900px) {
    max-width: 100vw;
    left: 100px;
    box-shadow: -1px 6px 15px 0px #7d7d7d;
  }
`;

const StyledLink = styled(Link)`
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledUser = styled(User)`
  width: 35px;
`;

const StyledParagraph = styled.p`
  font-size: 0.8rem;
`;

const StyledH1 = styled.h1`
  font-family: Arial, Helvetica, sans-serif;
`;

export default function Header({ user }) {
  return (
    <StyledHeader>
      <StyledH1>ClanPlan</StyledH1>
      <StyledLink href={`/family/${user._id}`}>
        {user.profilePhoto ? (
          <Image
            src={profilePhoto}
            alt="user profile image"
            width={150}
            height={150}
            priority={true}
          />
        ) : (
          <StyledUser />
        )}
        <StyledParagraph>{user.name}</StyledParagraph>
      </StyledLink>
    </StyledHeader>
  );
}
