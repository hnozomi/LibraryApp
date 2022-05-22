import { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { usePageTransition } from "../../hooks/usePageTransition";
import { useLocation } from "react-router-dom";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { textChangeRangeIsUnchanged } from "typescript";
import { useAuth } from "../../hooks/useAuth";

const MenuArray = [
  {
    name: "Home",
    icon: <HomeOutlinedIcon sx={{ p: 0 }} />,
    url: "/home",
  },
  {
    name: "Mypage",
    icon: <PersonOutlineOutlinedIcon />,
    url: "/home/mypage",
  },
  {
    name: "Admin",
    icon: <AdminPanelSettingsOutlinedIcon />,
    url: "/home/admin",
  },
  {
    name: "Signout",
    icon: <ExitToAppOutlinedIcon />,
    url: "/",
  },
];

export const Header = () => {
  const { pageTransition } = usePageTransition();
  const { signout } = useAuth();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
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
                <Box
                  role="presentation"
                  // onClick={toggleDrawer(anchor, false)}
                  // onKeyDown={toggleDrawer(anchor, false)}
                >
                  <List>
                    {MenuArray.map((text, index) => (
                      <ListItem
                        key={text.name}
                        disablePadding
                        onClick={() => pageTransition(text.url)}
                        // onClick={signout}
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
