import { FC, useState } from "react";

import {
  Avatar,
  Box,
  Typography,
  Button as MUIButton,
  IconButton,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { db, collection, doc, updateDoc } from "../../lib/Firebase/firebase";

import { usePageTransition } from "../../hooks/usePageTransition";
import { usePostData } from "../../hooks/usePostData";

import { UserType } from "../../types/types";
import { FlexBoxLayout } from "../layout/FlexBoxLayout";

type Props = {
  // userinfo: UserType;
  userinfo: any;
  setUserInfo: any;
};

export const Profile: FC<Props> = (props) => {
  const { userinfo, setUserInfo } = props;

  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(userinfo.username);

  const { pageTransition } = usePageTransition();
  const { EditUserName, result, complete } = usePostData();

  if (complete) {
    return (
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={complete}
        autoHideDuration={1500}
        sx={{ zIndex: 999 }}
      >
        <Alert sx={{ width: "100%" }} severity={result.status}>
          {result.message}
        </Alert>
      </Snackbar>
    );
  }

  const editUsername = () => {
    const newCityRef = doc(collection(db, "users"), userinfo.documentId);
    updateDoc(newCityRef, {
      username: value,
    });
    setUserInfo({ ...userinfo, username: value });
    setEdit(false);
  };

  return (
    <FlexBoxLayout>
      {/* 後でアイコンを設定できるようにする */}
      <Avatar alt="アイコン" src="/static/images/avatar/1.jpg" />
      <Box sx={{ marginLeft: "1em" }}>
        {edit ? (
          <FlexBoxLayout>
            <TextField
              value={value}
              label="新たな名前"
              onChange={(e) => setValue(e.target.value)}
              sx={{ p: "1px" }}
            />
            <MUIButton variant="text" onClick={() => setEdit(false)}>
              閉じる
            </MUIButton>
            <MUIButton
              onClick={editUsername}
              // onClick={() => {
              //   EditUserName(userinfo.user_id, value).finally(() => {
              //     setEdit(false);
              //   });
              // }}
              variant="text"
            >
              変更
            </MUIButton>
          </FlexBoxLayout>
        ) : (
          <FlexBoxLayout>
            <Typography>{`ユーザー名: ${value}`}</Typography>
            <IconButton
              sx={{ p: 0, ml: "0.2em" }}
              onClick={() => setEdit(true)}
            >
              <EditIcon />
            </IconButton>
          </FlexBoxLayout>
          // <Typography
          //   sx={{ mb: "0.1em", display: "flex", alignItems: "center" }}
          // >
          //   {`ユーザー名: ${value}`}
          //   <IconButton
          //     sx={{ p: 0, ml: "0.2em" }}
          //     onClick={() => setEdit(true)}
          //   >
          //     <EditIcon />
          //   </IconButton>
          // </Typography>
        )}

        <Box>
          <MUIButton
            onClick={() => pageTransition("/home/mypage/booklist")}
            sx={{ p: 0 }}
          >
            読んだ本を一覧で見る
          </MUIButton>
        </Box>
      </Box>
    </FlexBoxLayout>
  );
};
