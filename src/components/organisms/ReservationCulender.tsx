import { FC, useCallback, useState } from "react";

import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogContent,
  DialogContentText,
  IconButton,
  Fab,
  Snackbar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";

import { usePostData } from "../../hooks/usePostData";
import { ReservationDate, ReservationType } from "../../types/types";
import { LoadingScreen } from "./LoadingScreen";
import { ButtonLayout } from "../layout/ButtonLayout";
import { ResultDialog } from "./ResultDialog";

type Props = {
  book_id: string;
  user_id: string;
  reservations: ReservationType[];
};

export const ReservationCulensder: FC<Props> = (props) => {
  const { book_id, user_id, reservations } = props;

  const [date, setDate] = useState({ start: "", end: "" });
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: "" });
  const [isStart, setIsStart] = useState(true);

  const { insertReservation, postloading, result, complete } = usePostData();

  const handleClick = () => {
    console.log(date);
    if (date.start === "" || date.end === "") {
      // alert("予約日付を選択してください");
      setAlert({ ...alert, open: true, message: "予約日付を選択してください" });
      return;
    }

    if (date.start > date.end) {
      setAlert({
        ...alert,
        open: true,
        message: "開始日は終了日よりも前の日付にしてください",
      });
      return;
    }

    if (date.start > date.end) {
      setAlert({
        ...alert,
        open: true,
        message: "開始日は終了日よりも前の日付にしてください",
      });
      return;
    }

    const diff = checkDate(date);
    if (diff > 14) {
      setAlert({
        ...alert,
        open: true,
        message: "1回の予約は14日以内にしてください",
      });
      return;
    }

    const current = checkCurrentReservation(reservations);
    if (current) {
      setAlert({
        ...alert,
        open: true,
        message: "現在の予約が終わってからにしてください",
      });
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
        if (arg.dateStr < date.end) {
          setDate((prevState) => ({ ...prevState, start: arg.dateStr }));
        } else {
          setDate((prevState) => ({ ...prevState, end: arg.dateStr }));
        }
      } else if (date.start > arg.dateStr) {
        setDate((prevState) => ({ ...prevState, start: arg.dateStr }));
      }
    },
    [date]
  );

  const selectedStart = useCallback(
    (arg: DateClickArg) => {
      setIsStart((prevState) => prevState);
      if (isStart) {
        setIsStart(false);
        setDate((prevState) => ({ ...prevState, start: arg.dateStr }));
      } else {
        setDate((prevState) => ({ ...prevState, end: arg.dateStr }));
      }
    },
    [date, isStart]
  );

  const handlePostClick = () => {
    setOpen(false);
    insertReservation(user_id, book_id, date);
  };

  let reservation = reservations.map((res: ReservationType) => {
    const reservationData = {
      start: res.start_day,
      end: res.end_day + " 23:59:59", //時刻を入力しないと、00:00:00で認識され、日付の表示が前日になる
    };
    return reservationData;
  });

  const handleClose1 = () => {
    setAlert({
      ...alert,
      open: false,
      message: "",
    });
  };

  const handleStartDateChange = () => {
    setIsStart(true);
    setDate((prevState) => ({ ...prevState, start: "" }));
  };

  const handleEndDateChange = () => {
    setIsStart(false);
    setDate((prevState) => ({ ...prevState, end: "" }));
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
    return <ResultDialog result={result}></ResultDialog>;
  }

  return (
    <Box sx={{ marginTop: "1em" }}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale="ja" // 日本語化
        dateClick={selectedStart}
        events={reservation}
        displayEventTime={false}
      />
      <Box sx={{ mt: "1em" }}>
        {/* <Typography onClick={() => setIsStart(true)}>
          {`予約開始日: ${!date.start ? "開始日を選択" : date.start}  ${
            isStart ? "選択中" : ""
          }`}
        </Typography>
        <Typography onClick={() => setIsStart(false)}>{`予約終了日: ${
          !date.end ? "終了日を選択" : date.end
        }  ${!isStart ? "選択中" : ""}`}</Typography> */}

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography>開始日：</Typography>
          {!date.start ? (
            // <Button onClick={() => setIsStart(true)} size="small">
            //   カレンダーから選択してください
            // </Button>
            <Typography sx={{ ml: "1em" }}>
              カレンダーから選択してください
            </Typography>
          ) : (
            date.start
          )}
          {date.start && (
            <Button
              onClick={handleStartDateChange}
              sx={{ ml: "1em" }}
              size="small"
            >
              変更する
            </Button>
          )}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography>終了日：</Typography>
          {!date.end ? (
            <Typography sx={{ ml: "1em" }}>
              カレンダーから選択してください
            </Typography>
          ) : (
            date.end
          )}
          {date.end && (
            <Button
              onClick={handleEndDateChange}
              sx={{ ml: "1em" }}
              size="small"
            >
              変更する
            </Button>
          )}
        </Box>
      </Box>
      <ButtonLayout>
        <Fab
          variant="extended"
          size="large"
          color="primary"
          onClick={handleClick}
        >
          {/* <button> cannot appear as a descendant of <button>のエラーが出る */}
          {/* <Button variant="text" sx={{ color: "white" }} onClick={handleClick}> */}
          予約する
          {/* </Button> */}
        </Fab>
        <Snackbar
          open={alert.open}
          autoHideDuration={1000}
          message={alert.message}
          onClose={handleClose1}
          sx={{ bottom: { xs: 90, sm: 0 } }}
        />
      </ButtonLayout>
    </Box>
  );
};
