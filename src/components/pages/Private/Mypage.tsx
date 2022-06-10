import { useContext, useEffect, useState } from "react";

import {
  Avatar,
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  IconButton,
  TextField,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { usePageTransition } from "../../../hooks/usePageTransition";
import { usePostData } from "../../../hooks/usePostData";
import { BookCard } from "../../organisms/BookCard";
import AuthContext from "../../../provider/LoginUserProvider";
import { BookType } from "../../../types/types";
import { ReservationType } from "../../../types/types";
import { LoadingScreen } from "../../organisms/LoadingScreen";
import BookContext from "../../../provider/BookInformationProvider";
import { memo } from "react";

export const Mypage = memo(() => {
  console.log("Mypage実行");
  const { userinfo } = useContext(AuthContext);
  const { books } = useContext(BookContext);

  const [reservationsBook, setReservationsBook] = useState<BookType[]>([]);
  const [borrowedBook, setBorrowedBook] = useState<BookType[]>([]);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");

  const { pageTransition } = usePageTransition();
  const { returnBook, EditUserName, postloading, complete, result } =
    usePostData();

  useEffect(() => {
    // 書籍情報にReservationsが存在しているかチェック
    setLoading(true);
    books?.map(async (book) => {
      if (book.reservations.length !== 0) {
        await checkReservation(book, book.reservations);
      }
    });
  }, [books]);

  let reservation: BookType[] = [];
  let borrowd: BookType[] = [];

  // 予約情報の中にログイン中のユーザーが予約しているか確認
  const checkReservation = async (
    bookInformation: BookType,
    bookReservation: ReservationType[]
  ) => {
    const checkArray = bookReservation.map((res: ReservationType) => {
      return res.user_id;
    });

    // 予約しているユーザーの一覧を抽出し、user_idと一致するか確認
    const isContains = checkArray.some(
      (element: string) => element === userinfo.user_id
    );

    // 一致するデータがあった場合、予約している日をチェックする
    if (isContains) {
      await checkReservationDate(bookReservation, bookInformation);
    }
  };

  // 予約している日かどうかをチェック
  const checkReservationDate = async (
    bookReservation: any,
    bookInformation: any
  ) => {
    const nowDate = getNowYMD();

    bookReservation.forEach((res: any) => {
      if (res.start_day <= nowDate && nowDate <= res.end_day) {
        borrowd.push(bookInformation);
      } else {
        reservation.push(bookInformation);
      }
    });

    console.log(borrowd);
    setReservationsBook(reservation);
    setBorrowedBook(borrowd);
    setLoading(false);
  };

  const getNowYMD = () => {
    var dt = new Date();
    var y = dt.getFullYear();
    var m = ("00" + (dt.getMonth() + 1)).slice(-2);
    var d = ("00" + dt.getDate()).slice(-2);
    var result = y + "-" + m + "-" + d;
    return result;
  };

  const handleClick = async (book: BookType, index: number) => {
    // 同じ本をまとめて予約できないことが前提
    const filterReservationByUserId = book?.reservations.filter((res) => {
      return res.user_id === userinfo.user_id;
    });

    const info = {
      reservation_id: filterReservationByUserId[0].reservation_id,
      book_id: book?.book_id,
      user_id: userinfo.user_id,
    };
    await returnBook(info);
  };

  if (loading) {
    return <LoadingScreen text={"取得中"} />;
  }

  if (postloading) {
    return <LoadingScreen text={"削除中"} />;
  }

  if (complete) {
    return (
      <Dialog open={complete}>
        <DialogTitle id="alert-dialog-title">{result.status}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {result.message}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      <Container>
        <Box sx={{ display: "flex", py: "1.5em", alignItems: "center" }}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <Box sx={{ marginLeft: "1em" }}>
            {edit ? (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TextField
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  sx={{ p: "1px" }}
                />
                <Button variant="text" onClick={() => setEdit(false)}>
                  閉じる
                </Button>
                <Button
                  onClick={() => EditUserName(userinfo.user_id, value)}
                  variant="text"
                >
                  変更
                </Button>
              </Box>
            ) : (
              <Typography sx={{ display: "flex", alignItems: "center" }}>
                {`ユーザー名: ${userinfo.username}`}
                <IconButton sx={{ p: 0 }} onClick={() => setEdit(true)}>
                  <EditIcon />
                </IconButton>
              </Typography>
            )}
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
        <Box sx={{ mb: "2.5em" }}>
          <Typography sx={{ marginBottom: "0.7em" }}>借りてる本</Typography>
          {borrowedBook?.length === 0 ? (
            <Paper sx={{ p: "1em" }}>実績がありません</Paper>
          ) : (
            <Grid container spacing={1}>
              {borrowedBook?.map((borrowed, index) => (
                // <Grid key={borrowed.book_id} item xs={4}>
                <Grid key={index} item xs={4} sx={{ textAlign: "center" }}>
                  <BookCard book={borrowed} displayContext={true} />
                  <Button
                    variant="outlined"
                    sx={{ width: "100%" }}
                    onClick={() => handleClick(borrowed, index)}
                  >
                    返却
                  </Button>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
        <Box>
          <Typography sx={{ marginBottom: "0.7em" }}>予約中</Typography>
          <Grid container spacing={1}>
            {reservationsBook?.map((reservation, index) => (
              // <Grid key={reservation.book_id} item xs={4}>
              <Grid key={index} item xs={4}>
                <BookCard book={reservation} displayContext={true} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
});
