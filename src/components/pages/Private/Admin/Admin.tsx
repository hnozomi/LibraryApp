import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";

import { usePageTransition } from "../../../../hooks/usePageTransition";
import { memo } from "react";
import { BoxLayout } from "../../../layout/BoxLayout";

export const Admin = memo(() => {
  console.log("Adminが実行されました");
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
      <BoxLayout>
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
      </BoxLayout>
    </>
  );
});
