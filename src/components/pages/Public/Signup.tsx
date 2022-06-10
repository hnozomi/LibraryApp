import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

import { useAuth } from "../../../hooks/useAuth";
import { useAuthForm } from "../../../hooks/useAuthForm";
import { usePageTransition } from "../../../hooks/usePageTransition";
import { ValidationAlert } from "../../organisms/ValidationAlert";
import { Header } from "../../organisms/Header";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const MyButton = styled("button")({
  cursor: "pointer",
  border: "none",
  background: "none",
  color: "#0033cc",
  padding: 0,
});

export const Signup = () => {
  const { signup } = useAuth();
  const { authForm, open, handleClose } = useAuthForm();
  const { pageTransition } = usePageTransition();

  console.log("Signupが実行されました");

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {open.open && (
            <ValidationAlert open={open} handleClose={handleClose} />
          )}
          <Box
            component="form"
            noValidate
            onSubmit={(e: any) => authForm(e, signup, "/login")}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <MyButton onClick={() => pageTransition("/login")}>
                  Already have an account? Sign in
                </MyButton>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};
