import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";

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
  "& .MuiInputBase-input": { color: "black" },
});

export { StyledTextField };

function LoginForm() {
  return (
    <form>
      <StyledTextField
        label="Enter username"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <StyledTextField
        label="Enter password"
        variant="outlined"
        fullWidth
        margin="normal"
        type="password"
      />
    </form>
  );
}

export default LoginForm;
