import { useSession, signIn, signOut } from "next-auth/react";
import StyledButton from "./StyledButton";
import styled from "styled-components";

const StyledSignButton = styled(StyledButton)`
  width: 3rem;
  padding: 0.2rem;
  font-size: 0.5rem;
  margin: 0;
  position: absolute;
  top: 50px;
  right: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Login() {
  const { data: session } = useSession();
  if (session) {
    return (
      <StyledSignButton onClick={() => signOut()}>Log out</StyledSignButton>
    );
  }
  return <StyledSignButton onClick={() => signIn()}>Log in</StyledSignButton>;
}
