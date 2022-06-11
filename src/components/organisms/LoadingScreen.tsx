import { FC } from "react";

import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";

type Props = {
  text: string;
};

export const LoadingScreen: FC<Props> = (props) => {
  const { text } = props;

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
        <Typography sx={{ mt: 1 }}>{text}</Typography>
      </Box>
    </Backdrop>
  );
};
