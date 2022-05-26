import {
  Avatar,
  Box,
  Container,
  Divider,
  Typography,
  Button,
  Backdrop,
  CircularProgress,
  Grid,
} from "@mui/material";
import { Header } from "../organisms/Header";
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import AuthContext from "../../provider/LoginUserProvider";
import { useEffect } from "react";
import { BookType } from "../../types/types";
import { BookCard } from "../organisms/BookCard";
import { FormControlUnstyledContext } from "@mui/base";

export const Mypage = () => {
  const [reservationsBook, setReservationsBook] = useState<BookType[]>();
  const [borrowedBook, setBorrowedBook] = useState<BookType[]>();
  const [loading, setLoading] = useState(false);
  const {
    userinfo: { user_id },
  } = useContext(AuthContext);

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
    // const date = new Date();
    // // const day = `${date.getFullYear()}-${
    // //   date.getMonth() + 1
    // // }-${date.getDate()}`;
    const res2222 = getNowYMD();

    const test = info.filter((res: any) => {
      return res.start_day < res2222 && res2222 < res.end_day;
    });

    let reservation: any = [];
    let borrowd: any = [];
    info.forEach((res1: any) => {
      if (res1.start_day < res2222 && res2222 < res1.end_day) {
        console.log("範囲に含まれます");
        borrowd.push(res1);
      } else {
        reservation.push(res1);
        console.log("範囲に含まれないです");
      }
    });

    // console.log(reservation);
    // console.log(borrowd);
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
        console.log(res.data);
        check(res.data);
        // setReservationsBook(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

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

  return (
    <>
      <Header></Header>
      <Container>
        <Box sx={{ display: "flex", p: "1.5em", alignItems: "center" }}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <Box sx={{ marginLeft: "1em" }}>
            <Typography>ユーザー名: nozomi</Typography>
            <Box sx={{ display: "flex" }}>
              <Typography>読んだ冊数: 10冊</Typography>
              <Button sx={{ marginLeft: "5px", p: 0 }}>一覧で見る</Button>
            </Box>
          </Box>
        </Box>
        <Box>
          <Typography>借りてる本</Typography>
          <Divider />
          <Grid container spacing={1} sx={{ marginTop: "1em" }}>
            {borrowedBook?.map((borrowed) => (
              <Grid item xs={4} sx={{ height: "450px" }}>
                <BookCard book={borrowed} />
              </Grid>
            ))}
          </Grid>
          {/* <Box sx={{ width: "300px", height: "400px" }}></Box> */}
        </Box>
        <Box>
          <Typography>予約中</Typography>
          <Grid container spacing={1} sx={{ marginTop: "1em" }}>
            {reservationsBook?.map((reservation) => (
              <Grid item xs={4} sx={{ height: "450px" }}>
                <BookCard book={reservation} />
              </Grid>
            ))}
          </Grid>
          <Divider />
        </Box>
      </Container>
    </>
  );
};
