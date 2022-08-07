import { FC, memo, useContext, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
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

import { AuthContext } from "../../provider";
import { useAuth } from "../../hooks";
import { usePageTransition } from "../../hooks";

export const Header: FC = memo(() => {
  console.log("Headerが実行");
  const { userinfo } = useContext(AuthContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const { pageTransition } = usePageTransition();
  const { signout } = useAuth();

  const HamburgerMenuArray = [
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

  if (userinfo !== null) {
    if (userinfo!.role !== "admin") {
      HamburgerMenuArray.splice(2, 1);
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {pathname !== "/home" ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                size="small"
                color="inherit"
                sx={{ p: 0 }}
                onClick={() => navigate(-1)}
              >
                <ArrowBackIosNewIcon sx={{ textAlign: "left" }} />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                戻る
              </Typography>
            </Box>
          ) : (
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              LOGO
            </Typography>
          )}
          {pathname.startsWith("/home") && (
            <>
              <Box sx={{ flexGrow: 1 }}></Box>
              <IconButton
                onClick={() => setOpen(true)}
                size="large"
                color="inherit"
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
                    {HamburgerMenuArray.map((text, index) => (
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
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
});
