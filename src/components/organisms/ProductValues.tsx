import * as React from "react";
import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const item: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 5,
};

function ProductValues() {
  return (
    <Box
      component="section"
      sx={{ display: "flex", overflow: "hidden", backgroundColor: "#EEFFFF" }}
    >
      <Container sx={{ mt: 15, mb: 30, display: "flex", position: "relative" }}>
        <Box
          component="img"
          src="/static/themes/onepirate/productCurvyLines.png"
          alt="curvy lines"
          sx={{ pointerEvents: "none", position: "absolute", top: -180 }}
        />
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src="/22768079.png"
                alt="読書"
                sx={{ height: 100 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                借りる
              </Typography>
              <Typography variant="h5">書籍を借りて読む</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src="/22778418.png"
                alt="メモ"
                sx={{ height: 100 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                メモする
              </Typography>
              <Typography variant="h5">読んだ本の感想を書こう</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src="/22753313.png"
                alt="共有"
                sx={{ height: 100 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                共有する
              </Typography>
              <Typography variant="h5">未搭載</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductValues;
