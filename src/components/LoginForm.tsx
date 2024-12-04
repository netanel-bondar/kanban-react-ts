import React, { useState } from "react";
import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "black",
    },
    "&:hover fieldset": {
      borderColor: "black",
    },
    "&.Mui-focused fieldset": {
      borderColor: "black",
    },
  },
  "& .MuiInputLabel-root": { color: "gray" },
  "& .MuiInputLabel-shrink": { color: "black !important" },
  "& .MuiInputBase-input": { color: "black" },
});

export { StyledTextField };

function LoginForm({
  onLogin,
}: {
  onLogin: (username: string, password: string) => void;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <StyledTextField
        label="Enter username"
        variant="outlined"
        fullWidth
        margin="normal"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <StyledTextField
        label="Enter password"
        variant="outlined"
        fullWidth
        margin="normal"
        required
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        type="submit"
        fullWidth
        sx={{
          backgroundColor: "#CFC7D2",
          color: "black",
          "&:hover": {
            backgroundColor: "#AA9FB1",
            mt: 2
          },
        }}
      >
        Log In
      </Button>
    </form>
  );
}

export default LoginForm;
