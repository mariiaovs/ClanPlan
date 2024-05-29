import StyledLoadingAnimation from "@/components/StyledLoadingAnimation";
import StopMessage from "@/components/StopMessage";
import { useSession } from "next-auth/react";

export default function AuthGate({ children }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <StyledLoadingAnimation />;
  }

  if (!session) {
    return <StopMessage />;
  }

  return children;
}
