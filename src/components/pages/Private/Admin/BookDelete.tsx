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
import axios from "axios";

import BookContext from "../../../../provider/BookInformationProvider";
import { BookType } from "../../../../types/types";
import { BookCard } from "../../../organisms/BookCard";
import { LoadingScreen } from "../../../organisms/LoadingScreen";
import { memo } from "react";
import { BoxLayout, ButtonLayout } from "../../../layout/BoxLayout";

export const BookDelete: FC = memo(() => {
  console.log("BookDelete実行");
  const { books } = useContext(BookContext);
  const [bookName, setBookName] = useState<string>();
  const [BookNameByfilter, setBookNameByfilter] = useState<BookType[]>([]);
  const [deleteBook, setDeletebook] = useState<BookType>({
    book_id: "",
    title: "",
    author: "",
    category: "",
    image_url: "",
    review: [],
  });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [result, setResult] = useState({ status: "", message: "" });

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
    setDeletebook(book);
  };

  const deleteStep = async () => {
    setLoading(true);
    const options = {
      headers: { "Content-Type": "text/plain" },
    };

    await axios
      .post(
        "https://9qnebu8p5e.execute-api.ap-northeast-1.amazonaws.com/default/LibraryApp/delete_book",
        {
          book_id: deleteBook.book_id,
        },
        options
      )
      .then((result) => {
        console.log(result);
        setResult({
          ...result,
          message: result.data.message,
          status: result.data.status,
        });
      })
      .finally(() => {
        setOpen(false);
        setLoading(false);
        setComplete(true);
        setTimeout(() => {
          setComplete(false);
        }, 3000);
      });
  };

  if (loading) {
    return <LoadingScreen text={"削除中"} />;
  }

  if (open) {
    return (
      <Dialog open={open} onClose={handleClose}>
        <Box>
          <DialogContent>
            <BookCard book={deleteBook} displayContext={false} />
          </DialogContent>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              上記の本を削除しますか
            </DialogContentText>
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
          <Button onClick={deleteStep} variant="outlined">
            削除
          </Button>
        </Box>
      </Dialog>
    );
  }

  if (complete) {
    return (
      <Dialog open={complete} onClose={() => setComplete(false)}>
        <DialogTitle id="alert-dialog-title">{"result.status"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {"result.message"}
          </DialogContentText>
        </DialogContent>
      </Dialog>
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
