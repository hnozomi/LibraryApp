import { ConstructionOutlined } from "@mui/icons-material";
import { Button as MUIButton } from "@mui/material";
import { FC } from "react";
import { usePageTransition } from "../../hooks/usePageTransition";

type Props = {
  onClick: any;
  text: string;
  state?: any;
  route?: string;
};

export const Button: FC<Props> = (props) => {
  const { text, state, route, onClick } = props;

  return (
    <MUIButton
      variant="outlined"
      sx={{ width: "100%" }}
      //   本の情報を取得してDialogを開くパターン
      //   本の情報を取得して別のページに遷移するパターン
      //   onClick={() => onClick(state?.book)}
      onClick={() => onClick(route ? route : state.book, state.book)}
    >
      {text}
    </MUIButton>
  );
};
