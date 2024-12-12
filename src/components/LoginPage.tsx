import { useState, SyntheticEvent } from "react";
import { Box, Paper, Tabs, Tab, Avatar, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [tabIndex, setTabIndex] = useState(0); // 0 for Login, 1 for Signup

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (username: string, password: string) => {
    if (login(username, password)) {
      navigate("/app/home");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        minHeight: "100vh",
        paddingTop: "2rem",
        backgroundColor: "#D3D0CB",
      }}
    >
      <Paper
        elevation={10}
        sx={{
          width: 380,
          maxWidth: "90%",
          padding: 2,
          borderRadius: "16px",
          marginBottom: "2rem",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Avatar
          sx={{
            mx: "auto",
            bgcolor: "#CFC7D2",
            color: "black",
            mb: 2,
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          {tabIndex === 0 ? "welcome back" : "welcome"}
        </Typography>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          centered
          sx={{
            "& .Mui-selected": { color: "black" },
            "& .MuiTabs-indicator": { backgroundColor: "black" },
            mb: 2,
          }}
        >
          <Tab label="LogIn" />
          <Tab label="Sign Up" />
        </Tabs>
        {tabIndex === 0 && <LoginForm onLogin={handleLogin} />}{" "}
        {tabIndex === 1 && <SignupForm />}
      </Paper>
    </Box>
  );
}

export default LoginPage;
