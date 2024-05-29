import { useState } from "react";
import StyledButton from "./StyledButton";
import styled from "styled-components";
import Upload from "@/public/assets/images/upload.svg";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  gap: 0.5rem;
`;

const PhotoLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const ErrorMessage = styled.p`
  color: red;
`;

const PhotoInput = styled.input`
  display: none;
`;

const StyledUpload = styled(Upload)`
  width: 2rem;
`;

export default function FileUploadForm({ onAddPhoto }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState(false);

  function handleFileChange(event) {
    setSelectedFile(event.target.files[0]);
    setFileError(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!selectedFile) {
      setFileError(true);
      return;
    }

    const formData = new FormData(event.target);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const { url } = await response.json();

    onAddPhoto(url);
    event.target.reset();
    setSelectedFile(null);
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <PhotoLabel htmlFor="profilePhoto">
        Choose an image:
        <StyledUpload />
      </PhotoLabel>
      {fileError && <ErrorMessage>Please choose an image</ErrorMessage>}
      {!fileError && (
        <p>{selectedFile ? selectedFile.name : "No file chosen"}</p>
      )}
      <PhotoInput
        type="file"
        id="profilePhoto"
        name="profilePhoto"
        onChange={handleFileChange}
        accept="image/*"
      />
      <StyledButton type="submit">Upload</StyledButton>
    </StyledForm>
  );
}
