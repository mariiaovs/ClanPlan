import styled from "styled-components";
import CloseButton from "./CloseButton";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #000000;
  z-index: 9;
  opacity: ${({ $open }) => ($open ? 0.7 : 0)};
  pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
  transition: opacity 0.5s ease;
`;

const StyledSection = styled.section`
  background-color: var(--color-background);
  border-radius: 2rem;
  position: fixed;
  top: ${({ $top, $open }) => ($open ? $top : "-100%")};
  right: calc(50% - 190px);
  padding: 15px;
  left: 50%;
  width: calc(375px - 1rem);
  transform: translateX(-50%);
  z-index: 10;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  transition: top 0.5s ease, opacity 0.5s ease, background-color 0.5s ease;
`;

export default function Modal({ children, setShowModal, $top, $open }) {
  return (
    <>
      <Overlay $open={$open} onClick={() => setShowModal(false)} />
      <StyledSection $top={$top} $open={$open}>
        <CloseButton setShowModal={setShowModal} />
        {children}
      </StyledSection>
    </>
  );
}
