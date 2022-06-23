import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import { usePageTransition } from "../../hooks/usePageTransition";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export const ToppageHeader = () => {
  const { pageTransition } = usePageTransition();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {pathname !== "/" ? (
            <>
              <IconButton
                size="medium"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => navigate(-1)}
              >
                <ArrowBackIosNewIcon sx={{ textAlign: "left" }} />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                戻る
              </Typography>
            </>
          ) : (
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              自宅図書館
            </Typography>
          )}
          <Button color="inherit" onClick={() => pageTransition("/login")}>
            Login
          </Button>
          <Button color="inherit" onClick={() => pageTransition("/signup")}>
            Signup
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
