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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";

import { useAuth } from "../../hooks/useAuth";
import { useAuthForm } from "../../hooks/useAuthForm";
import { usePageTransition } from "../../hooks/usePageTransition";
import { ValidationAlert } from "../organisms/ValidationAlert";
import { Header } from "../organisms/Header";

const Copyright = (props: any) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      Nozomi Portfolio
      {new Date().getFullYear()}
    </Typography>
  );
};

const theme = createTheme();

const MyButton = styled("button")({
  cursor: "pointer",
  border: "none",
  background: "none",
  color: "#0033cc",
  padding: 0,
});

export const Login = () => {
  const { login } = useAuth();

  const { authForm, open, handleClose } = useAuthForm();
  const { pageTransition } = usePageTransition();

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
            Login
          </Typography>
          {open.open && (
            <ValidationAlert open={open} handleClose={handleClose} />
          )}
          <Box
            component="form"
            onSubmit={(e: any) => authForm(e, login, "/home")}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <MyButton onClick={() => pageTransition("/signup")}>
                  Don't have an account? Sign Up
                </MyButton>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};
