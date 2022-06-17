import { memo } from "react";

import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";

import { usePageTransition } from "../../../../hooks/usePageTransition";
import { BoxLayout } from "../../../layout/BoxLayout";
import { AdminPageText } from "../../../../const/Admin";

export const Admin = memo(() => {
  console.log("Adminが実行されました");

  const { pageTransition } = usePageTransition();

  return (
    <>
      <BoxLayout>
        <List sx={{ width: "100%", maxWidth: 360 }}>
          {AdminPageText.map((value) => (
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
