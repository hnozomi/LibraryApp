import { useContext, useEffect, useState } from "react";

import {
  Avatar,
  Box,
  Container,
  Divider,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import axios from "axios";
import UUID from "uuidjs";

import { usePageTransition } from "../../../hooks/usePageTransition";
import { BookCard } from "../../organisms/BookCard";
import AuthContext from "../../../provider/LoginUserProvider";
import { BookType } from "../../../types/types";
import { LoadingScreen } from "../../organisms/LoadingScreen";

export const Mypage = () => {
  console.log("Mypage実行");
  const {
    userinfo: { user_id },
  } = useContext(AuthContext);

  const [reservationsBook, setReservationsBook] = useState<BookType[]>();
  const [borrowedBook, setBorrowedBook] = useState<BookType[]>();
  const [loading, setLoading] = useState(false);

  const { pageTransition } = usePageTransition();

  useEffect(() => {
    const get = async () => {
      await getReservationRecord();
    };
    get();
  }, []);

  const getNowYMD = () => {
    var dt = new Date();
    var y = dt.getFullYear();
    var m = ("00" + (dt.getMonth() + 1)).slice(-2);
    var d = ("00" + dt.getDate()).slice(-2);
    var result = y + "-" + m + "-" + d;
    return result;
  };

  const check = (info: any) => {
    const nowDate = getNowYMD();

    let reservation: any = [];
    let borrowd: any = [];
    info.forEach((res1: any) => {
      if (res1.start_day < nowDate && nowDate < res1.end_day) {
        borrowd.push(res1);
      } else {
        reservation.push(res1);
      }
    });

    setReservationsBook(reservation);
    setBorrowedBook(borrowd);
  };

  const getReservationRecord = async () => {
    setLoading(true);
    await axios
      .get(
        "https://9qnebu8p5e.execute-api.ap-northeast-1.amazonaws.com/default/LibraryApp/get_bookReservation",
        {
          params: {
            user_id: user_id,
          },
          headers: { "Content-Type": "text/plain" },
        }
      )
      .then((res) => {
        check(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const options = {
    headers: { "Content-Type": "text/plain" },
  };

  const handleClick = async (book: any) => {
    const ID = UUID.generate();
    setLoading(true);
    await axios
      .post(
        "https://9qnebu8p5e.execute-api.ap-northeast-1.amazonaws.com/default/LibraryApp/delete_bookReservation",
        {
          reservation_id: book.reservation_id,
          achievement_id: ID,
          user_id: book.user_id,
          book_id: book.book_id,
        },
        options
      )
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
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
        <Box>
          <Typography>借りてる本</Typography>
          <Divider />
          <Grid container spacing={1} sx={{ marginTop: "1em" }}>
            {borrowedBook?.map((borrowed) => (
              <Grid key={borrowed.book_id} item xs={4} sx={{ height: "450px" }}>
                <BookCard book={borrowed} displayContext={true} />
                <Button onClick={() => handleClick(borrowed)}>返却</Button>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box>
          <Typography>予約中</Typography>
          <Grid container spacing={1} sx={{ marginTop: "1em" }}>
            {reservationsBook?.map((reservation) => (
              <Grid
                key={reservation.book_id}
                item
                xs={4}
                sx={{ height: "450px" }}
              >
                <BookCard book={reservation} displayContext={true} />
              </Grid>
            ))}
          </Grid>
          <Divider />
        </Box>
      </Container>
    </>
  );
};
