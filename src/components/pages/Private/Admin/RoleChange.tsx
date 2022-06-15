import { FC, memo, useState } from "react";

import {
  Box,
  SelectChangeEvent,
  TextField,
  Typography,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

import { usePageTransition } from "../../../../hooks/usePageTransition";
import { usePostData } from "../../../../hooks/usePostData";
import { LoadingScreen } from "../../../organisms/LoadingScreen";
import { BoxLayout } from "../../../layout/BoxLayout";
import { ButtonLayout } from "../../../layout/ButtonLayout";
import { ResultDialog } from "../../../organisms/ResultDialog";

export const RoleChange: FC = memo(() => {
  console.log("RoleChange実行");
  const [role, setRole] = useState("");
  const [mail, setMail] = useState("");

  const { pageTransition } = usePageTransition();
  const { changeRole, postloading, complete, result } = usePostData();

  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };

  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMail(event.target.value as string);
  };

  const handleClick = async () => {
    await changeRole(role, mail).then(() => {
      setRole("");
      setMail("");
    });
  };

  if (postloading) {
    return <LoadingScreen text={"変更中"}></LoadingScreen>;
  }

  if (complete) {
    return <ResultDialog result={result}></ResultDialog>;
  }

  return (
    <>
      <BoxLayout>
        <Box>
          <Typography sx={{ fontSize: "14px" }}>
            役割を変更するメールアドレスを入力してください
          </Typography>
          <TextField
            sx={{ width: "100%", marginTop: "0.5em" }}
            label="Outlined"
            variant="outlined"
            value={mail}
            onChange={handleChangeText}
          />
        </Box>
        <Box sx={{ marginTop: "1em" }}>
          <Typography>変更する内容を選択してください</Typography>
          <Select
            value={role}
            label="変更内容"
            onChange={handleChange}
            sx={{ width: "100%", marginTop: "0.5em" }}
          >
            <MenuItem value={"read/general"}>readonly → general</MenuItem>
            <MenuItem value={"read/admin"}>readonly → admin</MenuItem>
            <MenuItem value={"general/readonly"}>general → readonly</MenuItem>
            <MenuItem value={"general/admin"}>general → admin</MenuItem>
            <MenuItem value={"admin/readonly"}>admin → readonly</MenuItem>
            <MenuItem value={"admin/general"}>admin → general</MenuItem>
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
