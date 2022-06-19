import { Box } from "@mui/material";
import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const FlexBoxLayout: FC<Props> = (props) => {
  const { children } = props;
  return (
    <Box sx={{ display: "flex", alignItems: "center", marginTop: "1em" }}>
      {children}
    </Box>
  );
};
