import { FC, useState, useContext } from "react";

import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import BookContext from "../../../../provider/BookInformationProvider";
import { BookType } from "../../../../types/types";
import { BookCard } from "../../../organisms/BookCard";
import { LoadingScreen } from "../../../organisms/LoadingScreen";
import { memo } from "react";
import { BoxLayout, ButtonLayout } from "../../../layout/BoxLayout";
import { usePostData } from "../../../../hooks/usePostData";
import { ResultDialog } from "../../../organisms/ResultDialog";
import { resourceLimits } from "worker_threads";

export const BookDelete: FC = memo(() => {
  console.log("BookDelete実行");
  const { books } = useContext(BookContext);
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
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{ marginRight: "0.4em" }}
          >
            キャンセル
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
              deleteBook(selectedBook);
            }}
            variant="outlined"
          >
            削除
          </Button>
        </Box>
      </Dialog>
    );
  }

  if (complete) {
    return (
      <ResultDialog result={result}></ResultDialog>
      // <Dialog open={complete}>
      //   <DialogTitle id="alert-dialog-title">{result.status}</DialogTitle>
      //   <DialogContent>
      //     <DialogContentText id="alert-dialog-description">
      //       {result.message}
      //     </DialogContentText>
      //   </DialogContent>
      // </Dialog>
    );
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
          <Button variant="contained" onClick={handleClick}>
            検索する
          </Button>
        </ButtonLayout>
        <Box>
          <Typography>検索結果</Typography>
          <Divider />
          <Grid container spacing={1} sx={{ marginTop: "1em" }}>
            {BookNameByfilter.map((book) => (
              <Grid key={book.book_id} item xs={4} sx={{ height: "500px" }}>
                <BookCard book={book} displayContext={false} />
                <Button onClick={() => handleOpen(book)}>削除する</Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      </BoxLayout>
    </>
  );
});
