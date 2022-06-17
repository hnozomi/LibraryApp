import { Dispatch, FC, SetStateAction } from "react";

import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/system";

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const SearchFormStyle = styled(Paper)({
  padding: "2px 4px",
  display: "flex",
  alignItems: "center",
  width: "70%",
  marginLeft: "auto",
  marginTop: "0.5em",
  marginBottom: "0.8em",
});

export const SearchForm: FC<Props> = (props) => {
  const { setOpen } = props;
  return (
    <SearchFormStyle
      onClick={() => setOpen(true)}
      sx={{ marginRight: "0.3em" }}
    >
      <InputBase sx={{ ml: 1, flex: 1 }} placeholder="検索" />
      <IconButton sx={{ p: "0.5em" }}>
        <SearchIcon />
      </IconButton>
    </SearchFormStyle>
  );
};
