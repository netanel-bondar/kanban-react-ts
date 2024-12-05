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

function Navbar() {
  const handleLogout = () => {};

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

          <Box sx={{ display: "flex", alignItems: "center" }}>
            {" "}
            <IconButton edge="end" color="inherit">
              <SettingsIcon sx={{ fontSize: "xx-large" }} />
            </IconButton>
            <>
              <IconButton color="inherit" onClick={handleMenuOpen}>
                <AccountCircleIcon sx={{ fontSize: "xx-large" }} />
              </IconButton>

              <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => alert("My Account")}>
                  My Account
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
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
