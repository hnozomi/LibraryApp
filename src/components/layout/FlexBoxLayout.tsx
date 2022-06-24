import { CssRounded } from "@mui/icons-material";
import { Box } from "@mui/material";
import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  css?: any;
};

export const FlexBoxLayout: FC<Props> = (props) => {
  const { children, css } = props;
  console.log(css);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        ...css,
      }}
    >
      {children}
    </Box>
  );
};
