import { Box } from "@mui/material";
import { FC } from "react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const BoxLayout: FC<Props> = (props) => {
  const { children } = props;
  return (
    <Box sx={{ width: "92%", margin: "0 auto", marginTop: "1em" }}>
      {children}
    </Box>
  );
};

export const ButtonLayout: FC<Props> = (props) => {
  const { children } = props;
  return (
    <Box sx={{ textAlign: "right", marginTop: "1em", marginBottom: "1em" }}>
      {children}
    </Box>
  );
};
