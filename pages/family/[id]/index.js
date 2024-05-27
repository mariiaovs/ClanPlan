import { useRouter } from "next/router";
import BackArrow from "@/public/assets/images/back-arrow.svg";
import styled from "styled-components";
import useSWR from "swr";
import StyledLoadingAnimation from "@/components/StyledLoadingAnimation";
import MemberProfile from "@/components/MemberProfile";
import StyledBackLink from "@/components/StyledBackLink";

const StyledBackButton = styled.button`
  position: fixed;
  top: 0.7rem;
  left: calc(50% - 170px);
  z-index: 2;
  border: none;
`;

const StyledMessage = styled.p`
  text-align: center;
  padding: 2rem 0;
`;

const StyledHeading = styled.h2`
  text-align: center;
  margin-top: 1rem;
`;

export default function MemberProfilePage({ isDarkTheme, setDarkTheme, user }) {
  const router = useRouter();
  const { id } = router.query;

  const { data: familyMember, isLoading } = useSWR(`/api/members/${id}`);

  if (isLoading) {
    return <StyledLoadingAnimation />;
  }

  if (!familyMember) {
    return;
  }

  function handleGoBack() {
    router.back();
  }

  return (
    <>
      {familyMember._id === user._id ? (
        <StyledBackButton onClick={handleGoBack}>
          <BackArrow />
        </StyledBackButton>
      ) : (
        <StyledBackLink href="/family">
          <BackArrow />
        </StyledBackLink>
      )}
      <StyledHeading>Family Member Profile</StyledHeading>
      {familyMember ? (
        <MemberProfile
          familyMember={familyMember}
          isDarkTheme={isDarkTheme}
          setDarkTheme={setDarkTheme}
          user={user}
        />
      ) : (
        <StyledMessage>Page not found!</StyledMessage>
      )}
    </>
  );
}
