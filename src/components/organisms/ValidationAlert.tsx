import { Alert, Snackbar } from "@mui/material";
import { FormNotification } from "../../types/types";

type Props = {
  open: FormNotification;
  handleClose: () => void;
};

export const ValidationAlert = (props: Props) => {
  const { open, handleClose } = props;

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open.open}
      onClose={handleClose}
      autoHideDuration={1500}
    >
      <Alert sx={{ width: "100%" }} severity="error">
        {open.message}
      </Alert>
    </Snackbar>
  );
};
