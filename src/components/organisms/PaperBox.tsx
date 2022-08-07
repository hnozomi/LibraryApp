import { FC, ReactNode } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { BookType } from "@/types";

type Props = {
  children: ReactNode;
  array: Array<BookType>;
  title: string;
  text: string;
};

export const PaperBox: FC<Props> = (props) => {
  const { children, array, title, text } = props;
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
