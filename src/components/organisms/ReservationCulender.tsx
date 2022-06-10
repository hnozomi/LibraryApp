import { FC, useCallback, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";

import { ReservationDate, ReservationType } from "../../types/types";
import { LoadingScreen } from "./LoadingScreen";
import { ButtonLayout } from "../layout/BoxLayout";
import { usePostData } from "../../hooks/usePostData";

type Props = {
  book_id: string;
  user_id: string;
  reservations: ReservationType[];
};

export const ReservationCulensder: FC<Props> = (props) => {
  const { book_id, user_id, reservations } = props;

  const [date, setDate] = useState({ start: "", end: "" });
  const [open, setOpen] = useState(false);

  const { insertReservation, postloading, result, complete } = usePostData();

  const handleClick = () => {
    if (date.start === "" || date.end === "") {
      alert("予約日付を選択してください");
      return;
    }

    const diff = checkDate(date);
    if (diff > 14) {
      alert("1回の予約は14日以内にしてください");
      return;
    }

    const current = checkCurrentReservation(reservations);
    if (current) {
      alert("現在の予約が終わってからにしてください");
      return;
    }

    setOpen(true);
  };

  const checkDate = (date: ReservationDate) => {
    const startDate = new Date(date.start);
    const endDate = new Date(date.end);
    const diffDate =
      Math.floor(endDate.getTime() - startDate.getTime()) / 86400000;

    return diffDate;
  };

  const checkCurrentReservation = (reservations: any) => {
    const current = reservations.some(
      (reservation: any) => reservation.user_id === user_id
    );
    return current;
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

  const handlePostClick = () => {
    setOpen(false);
    insertReservation(user_id, book_id, date);
  };

  const reservation = reservations.map((res: ReservationType) => {
    const reservationData = {
      start: res.start_day,
      end: res.end_day + " 23:59:59", //時刻を入力しないと、00:00:00で認識され、日付の表示が前日になる
    };
    return reservationData;
  });

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
          <Button variant="outlined" onClick={handlePostClick}>
            登録
          </Button>
        </Box>
      </Dialog>
    );
  }

  if (postloading) {
    return <LoadingScreen text={"取得中"} />;
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
    <Box sx={{ marginTop: "1em" }}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale="ja" // 日本語化
        dateClick={handleDateClick}
        events={reservation}
        displayEventTime={false}
      />
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
