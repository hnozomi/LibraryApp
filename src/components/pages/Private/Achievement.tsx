import { useContext, useEffect, useState } from "react";
import { Box, Button, Container, Grid } from "@mui/material";

import { BookCard } from "../../organisms/BookCard";
import AuthContext from "../../../provider/LoginUserProvider";
import { usePageTransition } from "../../../hooks/usePageTransition";
import { useGetData } from "../../../hooks/usegetData";
import { BookType } from "../../../types/types";
import { LoadingScreen } from "../../organisms/LoadingScreen";

export const Achievement = () => {
  const {
    userinfo: { user_id },
  } = useContext(AuthContext);

  const [books, setBooks] = useState<BookType[]>();

  const { pageTransition } = usePageTransition();
  const { getAchievementByUserId, loading } = useGetData();

  useEffect(() => {
    const get = async () => {
      await getAchievementByUserId(user_id).then((res) => {
        setBooks(res.achievement);
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
