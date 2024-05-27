import { useSession, signIn, signOut } from "next-auth/react";
import StyledButton from "./StyledButton";
import styled from "styled-components";

const StyledSignButton = styled(StyledButton)`
  margin: 0;
  position: absolute;
  top: 12px;
  right: 12px;
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
