import { Box } from "@mui/material";
import { FC } from "react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const ButtonLayout: FC<Props> = (props) => {
  const { children } = props;
  return (
    <Box sx={{ textAlign: "right", marginTop: "1em", marginBottom: "1.5em" }}>
      {children}
    </Box>
  );
};
