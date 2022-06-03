import { useContext, useEffect, useState } from "react";

import {
  Avatar,
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
} from "@mui/material";

import { usePageTransition } from "../../../hooks/usePageTransition";
import { useGetData } from "../../../hooks/usegetData";
import { usePostData } from "../../../hooks/usePostData";
import { BookCard } from "../../organisms/BookCard";
import AuthContext from "../../../provider/LoginUserProvider";
import { BookReservationType } from "../../../types/types";
import { LoadingScreen } from "../../organisms/LoadingScreen";
import BookContext from "../../../provider/BookInformationProvider";

export const Mypage = () => {
  console.log("Mypage実行");
  const {
    userinfo: { user_id },
  } = useContext(AuthContext);
  const { books } = useContext(BookContext);

  const [reservationsBook, setReservationsBook] =
    useState<BookReservationType[]>();
  const [borrowedBook, setBorrowedBook] = useState<BookReservationType[]>();
  // const [loading, setLoading] = useState(false);

  const { pageTransition } = usePageTransition();
  const { getReservationRecord, loading } = useGetData();
  const { deleteReservation, postloading } = usePostData();

  type ResultData = {
    data:
      | undefined
      | {
          reservation: BookReservationType[] | undefined;
          borrowd: BookReservationType[] | undefined;
        };
  };

  useEffect(() => {
    console.log(books);
    const get = async () => {
      await getReservationRecord(user_id).then((res: ResultData) => {
        if (res.data !== undefined) {
          setReservationsBook(res.data.reservation);
          setBorrowedBook(res.data.borrowd);
        }
      });
    };
    get();
  }, []);

  const handleClick = async (book: BookReservationType) => {
    await deleteReservation(book);
  };

  if (loading) {
    return <LoadingScreen text={"取得中"} />;
  }

  if (postloading) {
    return <LoadingScreen text={"取得中"} />;
  }

  return (
    <>
      <Container>
        <Box sx={{ display: "flex", p: "1.5em", alignItems: "center" }}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <Box sx={{ marginLeft: "1em" }}>
            <Typography>ユーザー名: nozomi</Typography>
            <Box sx={{ display: "flex" }}>
              <Typography>読んだ冊数: 10冊</Typography>
              <Button
                onClick={() => pageTransition("/home/mypage/booklist")}
                sx={{ marginLeft: "5px", p: 0 }}
              >
                一覧で見る
              </Button>
            </Box>
          </Box>
        </Box>
        <Box sx={{ mb: "1em" }}>
          <Typography sx={{ marginBottom: "0.7em" }}>借りてる本</Typography>
          {borrowedBook?.length === 0 ? (
            <Paper sx={{ p: "1em" }}>実績がありません</Paper>
          ) : (
            <Grid container spacing={1}>
              {borrowedBook?.map((borrowed) => (
                <Grid key={borrowed.book_id} item xs={4}>
                  <BookCard book={borrowed} displayContext={true} />
                  <Button onClick={() => handleClick(borrowed)}>返却</Button>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
        <Box>
          <Typography sx={{ marginBottom: "0.7em" }}>予約中</Typography>
          <Grid container spacing={1}>
            {reservationsBook?.map((reservation) => (
              <Grid key={reservation.book_id} item xs={4}>
                <BookCard book={reservation} displayContext={true} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
};
