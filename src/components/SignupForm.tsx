import { StyledTextField } from "./LoginForm";

function SignupForm() {
  return (
    <form>
      <StyledTextField label="Enter username" variant="outlined" fullWidth margin="normal" />
      <StyledTextField label="Enter email address" variant="outlined" fullWidth margin="normal" />
      <StyledTextField
        label="Enter password"
        variant="outlined"
        fullWidth
        margin="normal"
        type="password"
      />
      <StyledTextField
        label="Confirm password"
        variant="outlined"
        fullWidth
        margin="normal"
        type="password"
      />

    </form>
  );
}

export default SignupForm;
