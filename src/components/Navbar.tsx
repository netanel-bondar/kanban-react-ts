import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link,
  useMediaQuery,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function Navbar() {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
  };

  const [open, setOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) =>
    setTabIndex(newValue);

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

          {/* Show MenuIcon for small screens, icons for larger screens */}
          {isSmallScreen ? (
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              onClick={toggleDrawer(true)} // Open drawer on click
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box>
              {/* Regular icons for large screens */}
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                sx={{ ml: 1 }}
              >
                <SettingsIcon />
              </IconButton>
              <IconButton
                onClick={handleOpen}
                size="large"
                edge="end"
                color="inherit"
              >
                <AccountCircleIcon />
              </IconButton>

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

                  <Typography
                    component="h1"
                    variant="h5"
                    sx={{ textAlign: "center" }}
                  >
                    welcome
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
                    sx={{
                      "& .Mui-selected": {
                        color: "black",
                      },
                      "& .MuiTabs-indicator": {
                        backgroundColor: "black",
                      },
                    }}
                  >
                    <Tab label="log in" />
                    <Tab label="sign up" />
                  </Tabs>
                  {tabIndex === 0 && (
                    <div>
                      <LoginForm />
                    </div>
                  )}
                  {tabIndex === 1 && (
                    <div>
                      <SignupForm />
                    </div>
                  )}
                </DialogContent>
                <DialogActions>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: tabIndex === 0 ? "#CFC7D2" : "#CFC7D2",
                      color: "black",
                      "&:hover": {
                        backgroundColor: tabIndex === 0 ? "#AA9FB1" : "#AA9FB1",
                      },
                    }}
                  >
                    {tabIndex === 0 ? "Login" : "Create Account"}{" "}
                  </Button>
                </DialogActions>
              </Dialog>

              <IconButton
                size="large"
                edge="end"
                color="inherit"
                sx={{ ml: 1 }}
              ></IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for small screens */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)} // Close drawer on outside click
      >
        <Box
          sx={{ width: 200 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem component="button">
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>

            <ListItem component="button">
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Account" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

export default Navbar;
