import styled from "styled-components";
import Sun from "@/public/assets/images/sun.svg";
import Moon from "@/public/assets/images/moon.svg";
import { toast } from "react-toastify";
import useSWR from "swr";

const ToggleLabel = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
`;

const ToggleCheckbox = styled.input`
  appearance: none;
  width: 60px;
  height: 30px;
  background-color: var(--color-font);
  border-radius: 20px;
  transition: background-color 0.3s;
  cursor: pointer;

  &:before {
    content: "";
    border: 0.5px solid var(--color-font);
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: var(--color-background);
    transition: transform 0.3s ease;
    transform: ${({ checked }) =>
      checked ? "translateX(30px)" : "translateX(0)"};
  }
`;

const SunIcon = styled(Sun)`
  color: #344648;
  fill: #344648;
  position: absolute;
  top: 3px;
  left: 3px;
`;

const MoonIcon = styled(Moon)`
  color: #ffffff;
  fill: #ffffff;
  position: absolute;
  top: 6px;
  right: 6px;
`;

export default function ThemeToggle({ familyMember }) {
  const { isDarkTheme, _id: id } = familyMember;
  const { mutate } = useSWR(`/api/members/${id}`);
  const { mutate: membersMutate } = useSWR("/api/members");

  async function handleModeToggle() {
    const updatedMember = { ...familyMember, isDarkTheme: !isDarkTheme };
    const response = await toast.promise(
      fetch(`/api/members/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedMember),
      }),
      {
        pending: "Profile updation is pending",
        success: "Profile updated successfully",
        error: "Profile not updated",
      }
    );

    if (response.ok) {
      mutate();
      membersMutate();
    }
  }

  return (
    <ToggleLabel htmlFor="theme-toggle" $dark={isDarkTheme}>
      <ToggleCheckbox
        type="checkbox"
        id="theme-toggle"
        onChange={handleModeToggle}
        checked={isDarkTheme}
      />
      <SunIcon />
      <MoonIcon />
    </ToggleLabel>
  );
}
