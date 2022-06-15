import { FC, useState, useContext } from "react";

import {
  Box,
  Button as MUIButton,
  Divider,
  Grid,
  TextField,
  Typography,
  Dialog,
  DialogContent,
  DialogContentText,
} from "@mui/material";

import BookContext from "../../../../provider/BookInformationProvider";
import { BookType } from "../../../../types/types";
import { BookCard } from "../../../organisms/BookCard";
import { LoadingScreen } from "../../../organisms/LoadingScreen";
import { memo } from "react";
import { BoxLayout } from "../../../layout/BoxLayout";
import { ButtonLayout } from "../../../layout/ButtonLayout";
import { usePostData } from "../../../../hooks/usePostData";
import { ResultDialog } from "../../../organisms/ResultDialog";
import { GridLayout } from "../../../layout/GridLayout";
import { Button } from "../../../parts/Button";

export const BookDelete: FC = memo(() => {
  console.log("BookDelete実行");
  const { books, deleteStateBooks } = useContext(BookContext);
  const [bookName, setBookName] = useState<string>();
  const [BookNameByfilter, setBookNameByfilter] = useState<BookType[]>([]);
  const [selectedBook, setSelectedbook] = useState<BookType>({
    book_id: "",
    title: "",
    author: "",
    category: "",
    image_url: "",
    review: [],
    reservations: [],
  });
  const [open, setOpen] = useState(false);
  const { deleteBook, postloading, result, complete } = usePostData();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBookName(event.target.value as string);
  };

  const handleClick = () => {
    if (books !== undefined) {
      let filterBook = books.filter((book) => {
        if (bookName !== undefined) {
          return book.title.includes(bookName);
        }
      });
      setBookNameByfilter(filterBook);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (book: BookType) => {
    setOpen(true);
    setSelectedbook(book);
    console.log(book);
  };

  if (postloading) {
    return <LoadingScreen text={"削除中"} />;
  }

  if (open) {
    return (
      <Dialog open={open} onClose={handleClose}>
        <Box>
          <DialogContent>
            <BookCard book={selectedBook} displayContext={false} />
          </DialogContent>
          <DialogContent>
            <DialogContentText>上記の本を削除しますか</DialogContentText>
          </DialogContent>
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", padding: "0.6em" }}
        >
          <MUIButton
            onClick={handleClose}
            variant="outlined"
            sx={{ marginRight: "0.4em" }}
          >
            キャンセル
          </MUIButton>
          <MUIButton
            onClick={() => {
              setOpen(false);
              deleteBook(selectedBook);
              deleteStateBooks(selectedBook.book_id);
              setBookName("");
              setBookNameByfilter([]);
            }}
            variant="outlined"
          >
            削除
          </MUIButton>
        </Box>
      </Dialog>
    );
  }

  if (complete) {
    return <ResultDialog result={result}></ResultDialog>;
  }

  return (
    <>
      <BoxLayout>
        <Typography>削除する書籍を検索してください</Typography>
        <TextField
          sx={{ width: "100%", marginTop: "0.5em" }}
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          value={bookName}
          onChange={handleChange}
        />
        <ButtonLayout>
          <MUIButton variant="contained" onClick={handleClick}>
            検索する
          </MUIButton>
        </ButtonLayout>
        <Box>
          <Typography>{`検索結果 ${BookNameByfilter.length}冊ヒットしました`}</Typography>
          <Divider />
          <GridLayout GridItems={BookNameByfilter}>
            <BookCard displayContext={false} />
            <Button text="削除する" onClick={handleOpen}></Button>
          </GridLayout>
          {/* <Grid container spacing={1} sx={{ marginTop: "1em" }}>
            {BookNameByfilter.map((book) => (
              <Grid key={book.book_id} item xs={4}>
                <BookCard book={book} displayContext={false} />
                <Button
                  variant="outlined"
                  sx={{ width: "100%" }}
                  onClick={() => handleOpen(book)}
                >
                  削除する
                </Button>
              </Grid>
            ))}
          </Grid> */}
        </Box>
      </BoxLayout>
    </>
  );
});
