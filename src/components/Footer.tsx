import { Box, Typography, Grid2 as Grid, Link, Container } from "@mui/material";

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
              <Link href="/" underline="hover" color="inherit">
                Home
              </Link>
            </Box>
            <Box>
              <Link href="/settings" underline="hover" color="inherit">
                Settings
              </Link>
            </Box>
            <Box>
              <Link href="/profile" underline="hover" color="inherit">
                Profile
              </Link>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ marginTop: "20px" }}>
          <Typography variant="body2" color="inherit">
            © Netanel Bondar & Tzofiya Rozen. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
