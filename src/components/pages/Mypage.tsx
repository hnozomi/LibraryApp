import {
  Avatar,
  Box,
  Container,
  Divider,
  Typography,
  Button,
} from "@mui/material";
import { Header } from "../organisms/Header";

export const Mypage = () => {
  return (
    <>
      <Header></Header>
      <Container>
        <Box sx={{ display: "flex", p: "1.5em", alignItems: "center" }}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <Box sx={{ marginLeft: "1em" }}>
            <Typography>ユーザー名: nozomi</Typography>
            <Box sx={{ display: "flex" }}>
              <Typography>読んだ冊数: 10冊</Typography>
              <Button sx={{ marginLeft: "5px", p: 0 }}>一覧で見る</Button>
            </Box>
          </Box>
        </Box>
        <Box>
          <Typography>借りてる本</Typography>
          <Divider />
          <Box sx={{ width: "300px", height: "400px" }}></Box>
        </Box>
        <Box>
          <Typography>予約中</Typography>
          <Divider />
        </Box>
      </Container>
    </>
  );
};
