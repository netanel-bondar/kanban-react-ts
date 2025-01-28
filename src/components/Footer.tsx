import { Box, Typography, Grid2 as Grid, Container, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#CFC7D2",
        color: "#000000",
        padding: "20px 0",
        marginTop: "auto",
        textAlign: "center",
        borderRadius: "16px",
        boxShadow: 10,
        margin: 2,
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={4} justifyContent="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" color="inherit">
              We are a leading company providing top-notch solutions to help
              businesses succeed in the digital era.
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box>
              <Link
                to="/app/home"
                component={RouterLink}
                sx={{
                  textDecoration: "none",
                  "&:hover": {
                    fontWeight: "bold",
                  },
                }}
                color="inherit"
              >
                Home
              </Link>
            </Box>

            <Box>
              <Link
                to="/app/settings"
                component={RouterLink}
                sx={{
                  textDecoration: "none",
                  "&:hover": {
                    fontWeight: "bold",
                  },
                }}
                color="inherit"
              >
                Settings
              </Link>
            </Box>
            <Box>
              <Link
                to="/app/profile"
                component={RouterLink}
                sx={{
                  textDecoration: "none",
                  "&:hover": {
                    fontWeight: "bold",
                  },
                }}
                color="inherit"
              >
                Profile
              </Link>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ marginTop: "20px" }}>
          <Typography variant="body2" color="inherit">
            © Netanel Bondar. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
