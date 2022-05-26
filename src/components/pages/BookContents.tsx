import {
  Button,
  Card,
  Container,
  Rating,
  Tab,
  Tabs,
  TextareaAutosize,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { Header } from "../organisms/Header";

import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import BookContext from "../../provider/BookInformationProvider";
import { BookType, ReservationType } from "../../types/types";
import { Review } from "../organisms/Review";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { useCallback } from "react";
import axios from "axios";
import AuthContext from "../../provider/LoginUserProvider";
import UUID from "uuidjs";
import { useEffect } from "react";
import { ReservationCulensder } from "../organisms/ReservationCulender";

type Props = {};

export const BookContents: FC<Props> = () => {
  const location = useLocation();
  const {
    userinfo: { user_id },
  } = useContext(AuthContext);
  const [date, setDate] = useState({ start: "", end: "" });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [culenderLoading, setCulenderLoading] = useState(false);
  // const [resDate, setresDate] = useState({ start: "", end: "" });
  const [resDate, setresDate] = useState<ReservationType[]>([]);
  const [status, setStatus] = useState("評価");

  const { book_id, title, author, category, image_url } =
    location.state as BookType;

  const changeStatus = (status: string) => {
    setStatus(status);
  };

  // const handleClick = () => {
  //   if (date.start === "" || date.end === "") {
  //     alert("予約日付を選択してください");
  //     return;
  //   }
  //   setOpen(true);
  //   insertReservationRecord();
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const insertReservationRecord = async () => {
  //   setLoading(true);
  //   const options = {
  //     headers: { "Content-Type": "text/plain" },
  //   };

  //   const ID = UUID.generate();

  //   await axios
  //     .post(
  //       "https://9qnebu8p5e.execute-api.ap-northeast-1.amazonaws.com/default/LibraryApp/insert_bookReservation",
  //       {
  //         reservation_id: ID,
  //         user_id: user_id,
  //         book_id: book_id,
  //         start_day: date.start,
  //         end_day: date.end,
  //       },
  //       options
  //     )
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //       setOpen(false);
  //     });
  // };

  const getReservationRecord = async () => {
    setCulenderLoading(true);

    await axios
      .get(
        "https://9qnebu8p5e.execute-api.ap-northeast-1.amazonaws.com/default/LibraryApp/get_bookReservation",
        {
          params: {
            book_id: book_id,
          },
          headers: { "Content-Type": "text/plain" },
        }
      )
      .then((res) => {
        console.log(res.data[0]);
        setresDate(res.data);
        // setresDate({
        //   ...resDate
        //   start: res.data[0].start_day,
        //   end: res.data[0].end_day,
        // });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setCulenderLoading(false);
        setOpen(false);
      });
  };

  // if (loading) {
  //   return (
  //     <Backdrop sx={{ color: "#fff" }} open={true}>
  //       <Box
  //         sx={{
  //           display: "flex",
  //           flexFlow: "column",
  //           justifyContent: "center",
  //           alignItems: "center",
  //         }}
  //       >
  //         <CircularProgress color="inherit" />
  //         <Typography sx={{ mt: 1 }}>変更中</Typography>
  //       </Box>
  //     </Backdrop>
  //   );
  // }

  // if (open) {
  //   return (
  //     <Dialog open={open} onClose={handleClose}>
  //       <Box>
  //         <DialogContent>
  //           <DialogContentText id="alert-dialog-description">
  //             {`予約開始日：${date.start}`}
  //           </DialogContentText>
  //           <DialogContentText id="alert-dialog-description">
  //             {`予約終了日：${date.end}`}
  //           </DialogContentText>
  //         </DialogContent>
  //         <DialogContent>
  //           <DialogContentText id="alert-dialog-description">
  //             上記の日程で予約しますか
  //           </DialogContentText>
  //         </DialogContent>
  //       </Box>
  //       <Box
  //         sx={{ display: "flex", justifyContent: "flex-end", padding: "0.6em" }}
  //       >
  //         <Button
  //           onClick={handleClose}
  //           variant="outlined"
  //           sx={{ marginRight: "0.4em" }}
  //         >
  //           キャンセル
  //         </Button>
  //         <Button variant="outlined">登録</Button>
  //       </Box>
  //     </Dialog>
  //   );
  // }

  return (
    <>
      <Header></Header>
      <Container>
        <Card sx={{ display: "flex" }}>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            src={image_url}
            alt="Live from space album cover"
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                {title}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                {author}
              </Typography>
            </CardContent>
          </Box>
        </Card>
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", marginTop: "1em" }}>
            <Typography variant="h5" sx={{ marginRight: "auto" }}>
              {status}
            </Typography>
            <Box sx={{ textAlign: "right" }}>
              <Button onClick={() => changeStatus("評価")}>評価</Button>
              <Button onClick={() => changeStatus("予約")}>予約</Button>
            </Box>
          </Box>
          {status === "評価" ? (
            <Review />
          ) : (
            <ReservationCulensder book_id={book_id} user_id={user_id} />
          )}

          {/* <Typography>{`予約開始日: ${date.start}`}</Typography>
          <Typography>{`予約終了日: ${date.end}`}</Typography>
          <Button onClick={handleClick} variant="outlined">
            予約する
          </Button> */}
        </Box>
      </Container>
    </>
  );
};
