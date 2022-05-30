import { useContext, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";

import { useAuth } from "../../hooks/useAuth";
import AuthContext from "../../provider/LoginUserProvider";

import { usePageTransition } from "../../hooks/usePageTransition";

export const Header = () => {
  const {
    userinfo: { role },
  } = useContext(AuthContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const { pageTransition } = usePageTransition();
  const { signout } = useAuth();

  const MenuArray = [
    {
      name: "Home",
      icon: <HomeOutlinedIcon sx={{ p: 0 }} />,
      url: "/home",
      function: () => pageTransition("/home"),
    },
    {
      name: "Mypage",
      icon: <PersonOutlineOutlinedIcon />,
      url: "/home/mypage",
      function: () => pageTransition("/home/mypage"),
    },
    {
      name: "Admin",
      icon: <AdminPanelSettingsOutlinedIcon />,
      url: "/home/admin",
      function: () => pageTransition("/home/admin"),
    },
    {
      name: "Signout",
      icon: <ExitToAppOutlinedIcon />,
      url: "/",
      function: signout,
    },
  ];

  if (role !== "admin") {
    MenuArray.splice(2, 1);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {pathname !== "/home" && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => navigate(-1)}
            >
              <ArrowBackIosNewIcon sx={{ textAlign: "left" }} />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          {pathname.startsWith("/home") ? (
            <>
              <IconButton
                onClick={() => setOpen(true)}
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor={"right"}
                open={open}
                onClose={() => setOpen(false)}
              >
                <Box role="presentation">
                  <List>
                    {MenuArray.map((text, index) => (
                      <ListItem
                        key={text.name}
                        disablePadding
                        onClick={text.function}
                      >
                        <ListItemButton>
                          <ListItemIcon>{text.icon}</ListItemIcon>
                          <ListItemText primary={text.name} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => pageTransition("/login")}>
                Login
              </Button>
              <Button color="inherit" onClick={() => pageTransition("/signup")}>
                Signup
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
