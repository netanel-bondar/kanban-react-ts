import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Link,
  Menu,
  MenuItem,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Navbar() {
  const { logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate("/");
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
              component={RouterLink}
              to="/app/home"
              color="inherit"
              underline="none"
              sx={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "all 0.2s ease",
                "&:hover": {
                  fontWeight: "bolder",
                  fontSize: "1.7rem",
                },
              }}
            >
              FlowTask
            </Link>
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            {" "}
            <Link component={RouterLink} to="/app/settings" color="inherit">
              <IconButton edge="end" color="inherit">
                <SettingsIcon
                  sx={{
                    fontSize: "xx-large",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      fontSize: "2.5rem",
                    },
                  }}
                />
              </IconButton>
            </Link>
            <>
              <IconButton color="inherit" onClick={handleMenuOpen}>
                <AccountCircleIcon
                  sx={{
                    fontSize: "xx-large",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      fontSize: "2.5rem",
                    },
                  }}
                />
              </IconButton>

              <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={handleMenuClose}
              >
                <MenuItem>
                  <Link
                    component={RouterLink}
                    to="/app/profile"
                    color="inherit"
                    sx={{
                      textDecoration: "none",
                      "&:hover": {
                        fontWeight: "bolder",
                      },
                    }}
                  >
                    My Account
                  </Link>
                </MenuItem>

                <MenuItem
                  onClick={handleLogout}
                  sx={{
                    textDecoration: "none",
                    "&:hover": {
                      fontWeight: "bolder",
                    },
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
