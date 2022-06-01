import { FC, useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Dialog,
  DialogContent,
  DialogContentText,
  Divider,
} from "@mui/material";
import axios from "axios";
import UUID from "uuidjs";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";

import { ReservationType } from "../../types/types";
import { LoadingScreen } from "./LoadingScreen";
import { ButtonLayout } from "../layout/BoxLayout";

type Props = {
  book_id: string;
  user_id: string;
};

export const ReservationCulensder: FC<Props> = (props) => {
  const { book_id, user_id } = props;

  const [culenderLoading, setCulenderLoading] = useState(false);
  const [date, setDate] = useState({ start: "", end: "" });
  const [resDate, setresDate] = useState<ReservationType[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const get = async () => {
      await getReservationRecord();
    };
    get();
  }, []);

  const handleClick = () => {
    if (date.start === "" || date.end === "") {
      alert("予約日付を選択してください");
      return;
    }
    setOpen(true);
    insertReservationRecord();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDateClick = useCallback(
    (arg: DateClickArg) => {
      if (date.start === date.end) {
        setDate((prevState) => ({ ...prevState, start: arg.dateStr }));
      } else if (date.start < arg.dateStr) {
        setDate((prevState) => ({ ...prevState, end: arg.dateStr }));
      } else if (date.start > arg.dateStr) {
        setDate((prevState) => ({ ...prevState, start: arg.dateStr }));
      }
    },
    [date]
  );

  const insertReservationRecord = async () => {
    setLoading(true);
    const options = {
      headers: { "Content-Type": "text/plain" },
    };

    const ID = UUID.generate();

    await axios
      .post(
        "https://9qnebu8p5e.execute-api.ap-northeast-1.amazonaws.com/default/LibraryApp/insert_bookReservation",
        {
          reservation_id: ID,
          user_id: user_id,
          book_id: book_id,
          start_day: date.start,
          end_day: date.end,
        },
        options
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
        setOpen(false);
      });
  };

  const reservation = resDate.map((res) => {
    const reservationData = {
      start: res.start_day,
      end: res.end_day + " 23:59:59", //時刻を入力しないと、00:00:00で認識され、日付の表示が前日になる
    };
    return reservationData;
  });

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
        console.log(res.data);
        setresDate(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setCulenderLoading(false);
      });
  };

  if (open) {
    return (
      <Dialog open={open} onClose={handleClose}>
        <Box>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {`予約開始日：${date.start}`}
            </DialogContentText>
            <DialogContentText id="alert-dialog-description">
              {`予約終了日：${date.end}`}
            </DialogContentText>
          </DialogContent>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              上記の日程で予約しますか
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
          <Button variant="outlined">登録</Button>
        </Box>
      </Dialog>
    );
  }

  if (loading) {
    return <LoadingScreen text={"取得中"} />;
  }

  return (
    <Box sx={{ marginTop: "1em" }}>
      {culenderLoading ? (
        <Box
          sx={{
            display: "flex",
            flexFlow: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress color="inherit" />
          <Typography sx={{ mt: 1 }}>予約状況取得中</Typography>
        </Box>
      ) : (
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locale="ja" // 日本語化
          dateClick={handleDateClick}
          events={reservation}
          displayEventTime={false}
        />
      )}
      <Box sx={{ mt: "1em" }}>
        <Typography>{`予約開始日: ${date.start}`}</Typography>
      </Box>
      <Typography>{`予約終了日: ${date.end}`}</Typography>
      <ButtonLayout>
        <Button onClick={handleClick} variant="outlined">
          予約する
        </Button>
      </ButtonLayout>
    </Box>
  );
};
