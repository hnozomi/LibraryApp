import { Box, Paper, Typography } from "@mui/material";

export const PaperBox = (props: any) => {
  const { array, title, text, children } = props;
  return (
    <Box sx={{ marginBottom: "1em" }}>
      <Typography sx={{ marginBottom: "0.5em" }}>{title}</Typography>
      {array?.length === 0 ? (
        <Paper sx={{ p: "1em" }}>{text}</Paper>
      ) : (
        <>{children}</>
      )}
    </Box>
  );
};
