import { FC } from "react";

import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { Result } from "@/types";

type Props = {
  result: Result;
};

export const ResultDialog: FC<Props> = (props) => {
  const { status, message } = props.result;
  return (
    <Dialog open={true}>
      <DialogTitle>{status}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
