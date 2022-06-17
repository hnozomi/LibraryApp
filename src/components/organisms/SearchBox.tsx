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
import { ButtonLayout } from "../layout/ButtonLayout";
import { categories } from "../../const/Category";

type Props = {
  onClick: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClose: () => void;
  setValue: any;
  setSelectedCategory: any;
};

export const SearchBox: FC<Props> = (props) => {
  const { onClick, onChange, handleClose, setValue, setSelectedCategory } =
    props;

  // const [selectedCategory, setSelectedCategory] = useState();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value as string);
  };

  // const onhandleChange = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  //   category: any
  // ) => {
  //   const Array: Array<string> = ["人文・思想・社会", "科学・技術"];
  //   let newArray = [event.target.value];
  //   if (Array.includes(event.target.value)) {
  //     newArray = Array.filter((value) => value === event.target.value);
  //   }
  //   setSelectedCategory(newArray);
  // };

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
                control={
                  <Checkbox value={category} onChange={(e) => onChange(e)} />
                }
                label={
                  <Typography sx={{ fontSize: "0.75rem" }}>
                    {category}
                  </Typography>
                }
              />
            </Grid>
          ))}
        </Grid>

        <ButtonLayout>
          <Button onClick={onClick} sx={{ width: "100%" }} variant="contained">
            検索する
          </Button>
        </ButtonLayout>
      </Paper>
    </Modal>
  );
};
