import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { Header } from "../organisms/Header";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../../provider/LoginUserProvider";
import { useState } from "react";
import { BookCard } from "../organisms/BookCard";
import { BookType } from "../../types/types";
import { usePageTransition } from "../../hooks/usePageTransition";

export const Achievement = () => {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState<BookType[]>();
  const { pageTransition } = usePageTransition();

  const {
    userinfo: { user_id },
  } = useContext(AuthContext);

  useEffect(() => {
    const get = async () => {
      setLoading(true);
      await axios
        .get(
          "https://9qnebu8p5e.execute-api.ap-northeast-1.amazonaws.com/default/LibraryApp/get_achievement",
          {
            params: {
              user_id: user_id,
            },
            headers: { "Content-Type": "text/plain" },
          }
        )
        .then((response) => {
          setBooks(response.data);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    get();
  }, []);

  if (loading) {
    return (
      <Backdrop sx={{ color: "#fff" }} open={true}>
        <Box
          sx={{
            display: "flex",
            flexFlow: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress color="inherit" />
          <Typography sx={{ mt: 1 }}>変更中</Typography>
        </Box>
      </Backdrop>
    );
  }

  console.log(books);
  return (
    <>
      <Header />
      <Container>
        <Box>
          <Grid container spacing={1} sx={{ marginTop: "1em" }}>
            {books?.map((book) => (
              <Grid key={book.book_id} item xs={4} sx={{ height: "500px" }}>
                <BookCard book={book} displayContext={false} />
                <Button
                  onClick={() =>
                    pageTransition("/home/mypage/reviewform", book)
                  }
                >
                  メモを書く
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
};
