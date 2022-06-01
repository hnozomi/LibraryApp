import { useContext, useState } from "react";

import { Divider, Grid, IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import BookContext from "../../../provider/BookInformationProvider";
import { BookCard } from "../../organisms/BookCard";
import { LoadingScreen } from "../../organisms/LoadingScreen";
import { SearchBox } from "../../organisms/SearchBox";
import { useEffect } from "react";
import { BoxLayout } from "../../layout/BoxLayout";

export const Home = () => {
  const { books } = useContext(BookContext);
  const [displayBooks, setDisplayBooks] = useState(books);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    setDisplayBooks(books);
  }, [books]);

  const handleClose = () => {
    setOpen(false);
  };

  const searchBooks = () => {
    if (value.trim() === "") {
      setDisplayBooks(books);
    }
    const filterBooks = books?.filter((book) => {
      return book.title.includes(value);
    });

    setDisplayBooks(filterBooks);
    setOpen(false);
    setValue("");
  };

  if (books === undefined) {
    return <LoadingScreen text={"書籍情報取得中"}></LoadingScreen>;
  }

  if (open) {
    return (
      <SearchBox
        onClick={searchBooks}
        handleClose={handleClose}
        setValue={setValue}
      ></SearchBox>
    );
  }

  console.log(displayBooks);
  return (
    <>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "70%",
          marginLeft: "auto",
          marginTop: "0.5em",
          marginBottom: "0.8em",
        }}
        onClick={() => setOpen(true)}
      >
        <InputBase sx={{ ml: 1, flex: 1 }} placeholder="検索" />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <Divider />
      <BoxLayout>
        <Grid container spacing={1} sx={{ mt: 1 }}>
          {displayBooks?.map((book) => (
            // <Grid key={book.book_id} item xs={4} sx={{ height: "500px" }}>
            <Grid key={book.book_id} item xs={4}>
              <BookCard book={book} displayContext={true} />
            </Grid>
          ))}
        </Grid>
      </BoxLayout>
    </>
  );
};