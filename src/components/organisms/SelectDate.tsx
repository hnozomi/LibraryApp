import { FC, memo } from "react";

import { Box, Button, Typography } from "@mui/material";

type Props = {
  selectedDate: string;
  text: string;
  onClick: () => void;
  date: {
    start: string;
    end: string;
  };
};

export const SelectDate: FC<Props> = memo((props) => {
  const { selectedDate, text, onClick, date } = props;
  return (
    <Box sx={{ display: "flex", alignItems: "center", py: "0.1em" }}>
      <Typography>{`${text}:`}</Typography>
      {!selectedDate ? (
        <Typography sx={{ ml: "0.5em" }}>
          カレンダーから選択してください
        </Typography>
      ) : (
        <Typography>{selectedDate}</Typography>
      )}
      {date.start !== "" && date.end !== "" && (
        <Button onClick={onClick} sx={{ p: "0" }} size="small">
          変更する
        </Button>
      )}
    </Box>
  );
});
