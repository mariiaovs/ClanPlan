import styled from "styled-components";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";
import User from "@/public/assets/images/user.svg";

const StyledSection = styled.section`
  position: relative;
  background-color: var(--color-background);
  margin: 1rem;
  display: flex;
  flex-direction: column;
  border-radius: 2rem;
  padding: 2rem;
  gap: 1rem;
  transition: background-color 0.5s ease, color 0.5s ease, opacity 0.5s ease;
  box-shadow: 1px 1px 10px -1px var(--color-font);
  align-items: center;
`;

const StyledUser = styled(User)`
  width: 150px;
`;

const UserInfoContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const StyledParagraph = styled.p`
  font-size: 1rem;
`;

const StyledContent = styled.span`
  font-size: large;
  font-weight: 600;
  margin-left: 0.5rem;
`;

const StyledHeading = styled.h3`
  text-align: center;
  font-family: var(--font-handlee);
  font-size: 1.4rem;
`;

export default function MemberProfile({
  familyMember,
  isDarkTheme,
  setDarkTheme,
  user,
}) {
  const { _id, name, role, profilePhoto } = familyMember;

  return (
    <>
      <StyledSection>
        {profilePhoto ? (
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
        <UserInfoContainer>
          <StyledParagraph>
            Name: <StyledContent>{name}</StyledContent>
          </StyledParagraph>
          <StyledParagraph>
            Role: <StyledContent>{role}</StyledContent>
          </StyledParagraph>
        </UserInfoContainer>
      </StyledSection>
      {_id === user._id && (
        <StyledSection>
          <StyledHeading>Settings</StyledHeading>
          <ThemeToggle isDarkTheme={isDarkTheme} setDarkTheme={setDarkTheme} />
        </StyledSection>
      )}
    </>
  );
}
