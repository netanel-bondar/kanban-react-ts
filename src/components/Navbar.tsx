import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import AccountCircleIcone from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";

function Navbar() {
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
        <Toolbar>
          <Typography variant="h6" component="div">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              FlowTask
            </IconButton>

            <IconButton size="large" edge="end" color="inherit" sx={{ ml: 1 }}>
              <SettingsIcon />
            </IconButton>

            <IconButton size="large" edge="end" color="inherit">
              <AccountCircleIcone />
            </IconButton>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
