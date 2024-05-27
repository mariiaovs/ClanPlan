import FamilyMembersList from "@/components/FamilyMembersList";
import styled from "styled-components";
import { StyledMessage } from "..";
import MemberForm from "@/components/MemberForm";
import Modal from "@/components/Modal";
import useSWR from "swr";
import StyledLoadingAnimation from "@/components/StyledLoadingAnimation";
import { toast } from "react-toastify";
import StyledPlus from "@/components/StyledPlus";

const StyledMenu = styled.menu`
  display: grid;
  grid-template-columns: 1fr 3fr;
  align-items: center;
  justify-content: center;
  @media (min-width: 900px) {
    margin-left: 6rem;
    grid-template-columns: 1fr 1.7fr;
  }
  @media (min-width: 1200px) {
    margin-left: 6rem;
    grid-template-columns: 1fr 1.6fr;
  }
  @media (min-width: 1536px) {
    margin-left: 6rem;
    grid-template-columns: 1fr 1.4fr;
  }
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
    const response = await toast.promise(
      fetch("/api/members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMemberData),
      }),
      {
        pending: "Member addition is pending",
        success: "Member added successfully",
        error: "Member not added",
      }
    );

    if (response.ok) {
      setShowModal(false);
      mutate();
    }
  }

  return (
    <>
      <StyledMenu>
        <StyledPlus onClick={() => setShowModal(true)} $right={true} />
        <h2>My Family</h2>
      </StyledMenu>
      {!familyMembers.length && (
        <StyledMessage>The list is empty. Add members to begin!</StyledMessage>
      )}
      <FamilyMembersList familyMembers={familyMembers} />

      <Modal $top="7rem" setShowModal={setShowModal} $open={showModal}>
        {showModal && (
          <MemberForm
            onAddMember={handleAddMember}
            familyMembers={familyMembers}
          />
        )}
      </Modal>
    </>
  );
}

export { StyledMenu };
