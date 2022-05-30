import { useState, FC } from "react";
import axios from "axios";

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
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { Header } from "../organisms/Header";
import { usePageTransition } from "../../hooks/usePageTransition";

export const RoleChange: FC = () => {
  console.log("RoleChange実行");
  const [role, setRole] = useState("");
  const [mail, setMail] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState({ status: "", message: "" });

  const { pageTransition } = usePageTransition();

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
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

    await axios
      .post(
        "https://9qnebu8p5e.execute-api.ap-northeast-1.amazonaws.com/default/LibraryApp/change_role",
        {
          e_mail: mail,
          previousRole: roleSplit[0],
          nextRole: roleSplit[1],
        },
        options
      )
      .then((res) => {
        console.log(res, "OK");
        setResult({
          ...result,
          message: res.data.message,
          status: res.data.status,
        });
        setLoading(false);
        setRole("");
        setMail("");
      })
      .catch((err) => {
        console.log(err, "err");
        setLoading(false);
      })
      .finally(() => {
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
        }, 3000);
      });
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

  if (open) {
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">{result.status}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {result.message}
          </DialogContentText>
        </DialogContent>
      </Dialog>
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
            onClick={() => pageTransition("/home/admin")}
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
