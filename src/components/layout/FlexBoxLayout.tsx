import { Box } from "@mui/material";
import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  style?: any;
};

export const FlexBoxLayout: FC<Props> = (props) => {
  const { children, style } = props;
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        ...style,
      }}
    >
      {children}
    </Box>
  );
};
