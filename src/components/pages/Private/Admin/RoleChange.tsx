import { FC, memo, useState } from "react";

import {
  Box,
  SelectChangeEvent,
  TextField,
  Typography,
  Select,
  MenuItem,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

import {
  db,
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "../../../../lib/Firebase/firebase";

import { usePageTransition } from "../../../../hooks/usePageTransition";
import { BoxLayout } from "../../../layout/BoxLayout";
import { ButtonLayout } from "../../../layout/ButtonLayout";
import { DocumentData } from "firebase/firestore";
import { FormNotification } from "../../../../types/types";

export const RoleChange: FC = memo(() => {
  console.log("RoleChange実行");
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");
  const [open, setOpen] = useState<FormNotification>({
    open: false,
    status: "",
    message: "",
  });

  const { pageTransition } = usePageTransition();

  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };

  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value as string);
  };

  const handleClick = async () => {
    let objectId;
    const queryResult = query(
      collection(db, "users"),
      where("user_id", "==", userId)
    );

    const querySnapshot = await getDocs(queryResult);
    querySnapshot.forEach((doc: DocumentData) => {
      objectId = doc.id;
    });

    const selectUserInfo = doc(collection(db, "users"), objectId);
    updateDoc(selectUserInfo, {
      role: role,
    });
    setOpen({ ...open, open: true, message: "変更に成功しました" });
    setRole("");
    setUserId("");
  };

  const handleClose = () => {
    setOpen({ ...open, open: false });
  };

  const SnackAlert = () => {
    return (
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open.open}
        onClose={handleClose}
        autoHideDuration={2500}
      >
        <Alert sx={{ width: "100%" }} severity="success">
          {open.message}
        </Alert>
      </Snackbar>
    );
  };

  return (
    <>
      <BoxLayout>
        <Box>
          {open.open && <SnackAlert />}
          <Typography sx={{ fontSize: "14px" }}>
            役割を変更する人のユーザーIDを入力してください
          </Typography>
          <TextField
            id="component-filled"
            sx={{ width: "100%", marginTop: "0.5em" }}
            variant="outlined"
            value={userId}
            onChange={handleChangeText}
          />
        </Box>
        <Box sx={{ marginTop: "1em" }}>
          <Typography>変更する役割を選択してください</Typography>
          <Select
            value={role}
            label="変更内容"
            onChange={handleChange}
            sx={{ width: "100%", marginTop: "0.5em" }}
          >
            <MenuItem value={"readonly"}>readonlyに変更</MenuItem>
            <MenuItem value={"general"}>generalに変更</MenuItem>
            <MenuItem value={"admin"}>adminに変更</MenuItem>
          </Select>
        </Box>
        <ButtonLayout>
          <Button
            variant="contained"
            sx={{
              marginRight: "0.4em",
            }}
            onClick={() => pageTransition("/home/admin")}
          >
            キャンセル
          </Button>
          <Button variant="contained" onClick={handleClick}>
            変更
          </Button>
        </ButtonLayout>
      </BoxLayout>
    </>
  );
});
