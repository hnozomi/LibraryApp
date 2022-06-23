import { Link, Typography } from "@mui/material";

export const Copyright = (props: any) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © nozomi.portfolio"}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};
