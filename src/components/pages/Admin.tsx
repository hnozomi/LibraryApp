import { Box } from "@mui/material";
import { Header } from "../organisms/Header";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";

import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import { usePageTransition } from "../../hooks/usePageTransition";

export const Admin = () => {
  const { pageTransition } = usePageTransition();
  const ListText = [
    {
      text: "書籍の登録を行う",
      url: "/home/admin/bookregister/",
    },
    {
      text: "書籍の削除を行う",
      url: "/home/admin/bookdelete/",
    },
    {
      text: "ユーザーの役割を変更する",
      url: "/home/admin/rolechange/",
    },
  ];
  return (
    <>
      <Header></Header>
      <Box sx={{ width: "90%", margin: "0 auto", padding: "1em" }}>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {ListText.map((value) => (
            <ListItem
              onClick={() => pageTransition(`${value.url}`)}
              key={value.url}
              disableGutters
              secondaryAction={
                <IconButton aria-label="arrow">
                  <ArrowCircleRightOutlinedIcon />
                </IconButton>
              }
            >
              <ListItemText primary={`${value.text}`} />
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
};
