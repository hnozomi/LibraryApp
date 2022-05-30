import { Box, Container } from "@mui/material";

import { Header } from "../organisms/Header";

export const Toppage = () => {
  console.log("Toppage実行");
  return (
    <>
      <Header />
      <Container>
        <Box>どんなアプリ</Box>
        <Box>できること</Box>
        <Box>登録しよう！</Box>
      </Container>
    </>
  );
};
