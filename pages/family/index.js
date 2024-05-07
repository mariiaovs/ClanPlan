import FamilyMembersList from "@/components/FamilyMembersList";
import styled from "styled-components";
import { StyledMessage } from "..";
import MemberForm from "@/components/MemberForm";
import Modal from "@/components/Modal";
import Plus from "@/public/assets/images/plus.svg";
import useSWR from "swr";
import StyledLoadingAnimation from "@/components/StyledLoadingAnimation";

const StyledPlus = styled(Plus)`
  position: fixed;
  bottom: 4rem;
  right: calc(50% - 160px);
  width: 3rem;
  fill: white;
  cursor: pointer;
`;

const StyledHeading = styled.h2`
  text-align: center;
`;

export default function FamilyPage({ showModal, setShowModal }) {
  const { data: familyMembers, isLoading, mutate } = useSWR("/api/members");

  if (isLoading) {
    return <StyledLoadingAnimation />;
  }

  if (!familyMembers) {
    return;
  }

  async function handleAddMember(newMemberData) {
    const response = await fetch("/api/members", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMemberData),
    });
    if (response.ok) {
      setShowModal(false);
      mutate();
    }
  }

  return (
    <>
      <StyledHeading>My Family</StyledHeading>
      {!familyMembers.length && (
        <StyledMessage>The list is empty. Add members to begin!</StyledMessage>
      )}
      <FamilyMembersList familyMembers={familyMembers} />

      <StyledPlus onClick={() => setShowModal(true)} $right={true} />

      {showModal && (
        <Modal $top="7rem" setShowModal={setShowModal}>
          <MemberForm
            onAddMember={handleAddMember}
            familyMembers={familyMembers}
          />
        </Modal>
      )}
    </>
  );
}
