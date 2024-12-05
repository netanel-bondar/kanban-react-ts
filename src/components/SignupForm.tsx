import { StyledTextField } from "./LoginForm";
import Button from "@mui/material/Button";

function SignupForm() {
  return (
    <form>
      <StyledTextField
        label="Enter username"
        variant="outlined"
        fullWidth
        margin="normal"
        required
      />
      <StyledTextField
        label="Enter email address"
        variant="outlined"
        fullWidth
        margin="normal"
        required
      />
      <StyledTextField
        label="Enter password"
        variant="outlined"
        fullWidth
        margin="normal"
        required
        type="password"
      />
      <StyledTextField
        label="Confirm password"
        variant="outlined"
        fullWidth
        margin="normal"
        required
        type="password"
      />
      <Button
        variant="contained"
        type="submit"
        fullWidth
        sx={{
          mt: 2,
          backgroundColor: "#CFC7D2",
          color: "black",
          "&:hover": {
            backgroundColor: "#AA9FB1",
          },
        }}
      >
        create new account
      </Button>
    </form>
  );
}

export default SignupForm;
