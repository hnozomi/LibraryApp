import { useContext, useEffect, useState } from "react";
import axios from "axios";

import { Box, Button, Container, Grid } from "@mui/material";

import { BookCard } from "../../organisms/BookCard";
import AuthContext from "../../../provider/LoginUserProvider";
import { usePageTransition } from "../../../hooks/usePageTransition";
import { BookType } from "../../../types/types";
import { LoadingScreen } from "../../organisms/LoadingScreen";

export const Achievement = () => {
  const {
    userinfo: { user_id },
  } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState<BookType[]>();

  const { pageTransition } = usePageTransition();

  useEffect(() => {
    setLoading(true);
    const get = async () => {
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
    return <LoadingScreen text={"取得中"} />;
  }

  return (
    <>
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
