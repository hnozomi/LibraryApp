import { useContext, useEffect, useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

import { BookCard } from "../../organisms/BookCard";
import AuthContext from "../../../provider/LoginUserProvider";
import { usePageTransition } from "../../../hooks/usePageTransition";
import { useGetData } from "../../../hooks/usegetData";
import { BookType } from "../../../types/types";
import { LoadingScreen } from "../../organisms/LoadingScreen";
import { GridLayout } from "../../layout/GridLayout";
import { Button } from "../../parts/Button";

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
          <Typography
            sx={{ py: "1em" }}
          >{`読んだ冊数：${books?.length}`}</Typography>
          <GridLayout GridItems={books}>
            <BookCard displayContext={true} />
            <Button
              text="メモを書く"
              route="/home/mypage/reviewform"
              onClick={pageTransition}
            ></Button>
          </GridLayout>
          {/* <Grid container spacing={1}>
            {books?.map((book) => (
              <Grid key={book.book_id} item xs={4} sx={{ textAlign: "center" }}>
                <BookCard book={book} displayContext={false} />
                <Button
                  variant="outlined"
                  sx={{ width: "100%" }}
                  onClick={() =>
                    pageTransition("/home/mypage/reviewform", book)
                  }
                >
                  メモを書く
                </Button>
              </Grid>
            ))}
          </Grid> */}
        </Box>
      </Container>
    </>
  );
};
