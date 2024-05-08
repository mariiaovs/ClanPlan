import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 9;
`;

const StyledSection = styled.section`
  background-color: var(--color-background);
  border-radius: 2rem;
  position: fixed;
  top: ${({ $top }) => ($top ? $top : "0")};
  right: calc(50% - 190px);
  padding: 15px;
  left: 50%;
  width: calc(375px - 1rem);
  transform: translateX(-50%);
  z-index: 10;
`;

export default function Modal({ children, setShowModal, $top }) {
  return (
    <>
      <Overlay onClick={() => setShowModal(false)} />
      <StyledSection $top={$top}>{children}</StyledSection>
    </>
  );
}
