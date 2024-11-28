import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from "@mui/material/Link";
import useMediaQuery from "@mui/material/useMediaQuery";

function Navbar() {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
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
              <IconButton size="large" edge="end" color="inherit">
                <AccountCircleIcon />
              </IconButton>
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
