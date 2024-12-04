import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Link,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  Tabs,
  Tab,
  Menu,
  MenuItem,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const dummyUser = { username: "username", password: "1234" };

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) =>
    setTabIndex(newValue);

  const handleLogin = (username: string, password: string) => {
    if (username === dummyUser.username && password === dummyUser.password) {
      setIsLoggedIn(true);
      setLoggedInUser(username);
      handleClose();
    } else {
      alert("Incorrect username or password");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoggedInUser(null);
  };

  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  return (
    <Box
      sx={{
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: 10,
        margin: 1,
      }}
    >
      <AppBar
        position="static"
        sx={{ backgroundColor: "#CFC7D2", color: "#000000" }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" component="div">
            <Link
              href="/"
              color="inherit"
              underline="none"
              sx={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              FlowTask
            </Link>
          </Typography>

          <Box>
            {isLoggedIn ? (
              <>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <IconButton color="inherit" onClick={handleMenuOpen}>
                    <Avatar
                      sx={{
                        color: "black",
                      }}
                    >
                      {loggedInUser?.charAt(0).toUpperCase()}
                    </Avatar>
                  </IconButton>
                  <Typography> {loggedInUser}</Typography>
                </Box>

                <Menu
                  anchorEl={menuAnchor}
                  open={Boolean(menuAnchor)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => alert("Settings Account")}>
                    Settings Account
                  </MenuItem>

                  <MenuItem
                    onClick={() => {
                      handleLogout();
                      handleMenuClose();
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <IconButton onClick={handleOpen} edge="end" color="inherit">
                <AccountCircleIcon sx={{ fontSize: "xx-large" }} />
              </IconButton>
            )}

            <Dialog
              open={open}
              onClose={handleClose}
              maxWidth="xs"
              PaperProps={{
                sx: {
                  padding: 1,
                  borderRadius: "16px",
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              <DialogTitle>
                <Avatar
                  sx={{
                    mx: "auto",
                    bgcolor: "#CFC7D2",
                    color: "black",
                    textAlign: "center",
                    mb: 1,
                  }}
                >
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" textAlign="center">
                  Welcome
                </Typography>
                <IconButton
                  aria-label="close"
                  onClick={handleClose}
                  style={{ position: "absolute", right: 8, top: 8 }}
                >
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent>
                <Tabs
                  value={tabIndex}
                  onChange={handleTabChange}
                  centered
                  sx={{
                    "& .Mui-selected": { color: "black" },
                    "& .MuiTabs-indicator": { backgroundColor: "black" },
                  }}
                >
                  <Tab label="Log In" />
                  <Tab label="Sign Up" />
                </Tabs>

                {tabIndex === 0 && <LoginForm onLogin={handleLogin} />}
                {tabIndex === 1 && <SignupForm />}
              </DialogContent>
            </Dialog>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
