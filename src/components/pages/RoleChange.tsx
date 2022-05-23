import {
  Box,
  SelectChangeEvent,
  TextField,
  Typography,
  Select,
  MenuItem,
  Button,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { Header } from "../organisms/Header";
import { FC } from "react";
import { useState } from "react";
import axios from "axios";

export const RoleChange: FC = () => {
  const [role, setRole] = useState("");
  const [mail, setMail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    setRole(event.target.value as string);
  };

  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMail(event.target.value as string);
  };

  const handleClick = async () => {
    setLoading(true);
    const options = {
      headers: { "Content-Type": "text/plain" },
    };

    const roleSplit = role.split("/");

    const result = await axios.post(
      "https://9qnebu8p5e.execute-api.ap-northeast-1.amazonaws.com/default/LibraryApp/change_role",
      {
        e_mail: mail,
        previousRole: roleSplit[0],
        nextRole: roleSplit[1],
      },
      options
    );
    console.log(result);
    setRole("");
    setMail("");
    setLoading(false);
  };

  if (loading) {
    return (
      <Backdrop sx={{ color: "#fff" }} open={true}>
        <Box
          sx={{
            display: "flex",
            flexFlow: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress color="inherit" />
          <Typography sx={{ mt: 1 }}>変更中</Typography>
        </Box>
      </Backdrop>
    );
  }

  return (
    <>
      <Header />
      <Box sx={{ width: "90%", margin: "0 auto", marginTop: "1em" }}>
        <Box>
          <Typography sx={{ fontSize: "14px" }}>
            役割を変更するメールアドレスを入力してください
          </Typography>
          <TextField
            sx={{ width: "100%", marginTop: "0.5em" }}
            id="outlined-basic"
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
        <Box sx={{ textAlign: "right" }}>
          <Button
            variant="contained"
            sx={{
              marginRight: "0.4em",
              marginTop: "0.5em",
              marginBottom: "0.5em",
            }}
          >
            キャンセル
          </Button>
          <Button
            sx={{ marginTop: "0.5em", marginBottom: "0.5em" }}
            variant="contained"
            onClick={handleClick}
          >
            変更
          </Button>
        </Box>
      </Box>
    </>
  );
};
