import { FC, useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputBase,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import SearchIcon from "@mui/icons-material/Search";
import { ButtonLayout } from "../layout/BoxLayout";
import { categories } from "../../const/Category";

type Props = {
  onClick: () => void;
  handleClose: () => void;
  setValue: any;
};

export const SearchBox: FC<Props> = (props) => {
  const { onClick, handleClose, setValue } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value as string);
  };

  return (
    <Modal open={true} onClose={handleClose}>
      <Paper sx={{ m: "1em", p: "1em" }}>
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", right: "15px", top: "15px" }}
        >
          <CloseSharpIcon />
        </IconButton>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            mt: "1.3em",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            onChange={handleChange}
            placeholder="キーワード検索"
          />
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <Typography sx={{ marginTop: "1em" }}>ジャンルで探す</Typography>
        <Grid container spacing={1} sx={{ mt: 1 }}>
          {categories.map((category) => (
            <Grid key={category} item xs={6}>
              <FormControlLabel
                control={<Checkbox />}
                label={
                  <Typography sx={{ fontSize: "0.75rem" }}>
                    {category}
                  </Typography>
                }
              />
            </Grid>
          ))}
        </Grid>
        <Typography>並び替え</Typography>

        <ButtonLayout>
          <Button onClick={onClick} sx={{ width: "100%" }} variant="contained">
            検索する
          </Button>
        </ButtonLayout>
      </Paper>
    </Modal>
  );
};
