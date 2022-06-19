import { FC, ReactNode } from "react";

import { Box } from "@mui/material";

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
