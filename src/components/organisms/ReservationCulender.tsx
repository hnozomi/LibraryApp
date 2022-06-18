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

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleDateClick = useCallback(
    (arg: DateClickArg) => {
      // const data = document.querySelectorAll('[data-user-id]');
      // const elements = document.querySelectorAll(
      //   '[data-date="2022-05-29"]'
      // ) as HTMLCollectionOf<HTMLElement>;
      if (date.start !== "" && date.end !== "") {
        return;
      }

      let selectedDate = { start: "", end: "" };
      if (isStart) {
        setIsStart(false); // 初めに開始日を選択することになり、そのあと、終了日を選択してもらうため

        selectedDate.start = arg.dateStr;
        selectedDate.end = date.end;
        setDate((prevState) => ({ ...prevState, start: arg.dateStr }));
      } else {
        selectedDate.start = date.start;
        selectedDate.end = arg.dateStr;
        setDate((prevState) => ({ ...prevState, end: arg.dateStr }));
      }

      selectedDateWithColor(selectedDate);
    },
    [date, isStart]
  );

  const selectedDateWithColor = (date: any) => {
    var GridElements = document.getElementsByClassName(
      "fc-daygrid-day"
    ) as HTMLCollectionOf<HTMLElement>;

    for (let step = 0; step < GridElements.length; step++) {
      var GridElement = GridElements.item(step);

      if (GridElement !== null) {
        if (GridElement.dataset.date === date.start) {
          GridElement.style.backgroundColor = "pink";
        } else if (GridElement.dataset.date === date.end) {
          GridElement.style.backgroundColor = "pink";
        } else {
          GridElement.style.backgroundColor = "white";
        }
      }
    }
  };

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

  const handleCloseSnackBar = () => {
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
      <Dialog open={open} onClose={handleCloseDialog}>
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
            onClick={handleCloseDialog}
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

  const SelectedDate = (props: any) => {
    const { selectedDate, text, onClick } = props;
    return (
      <Box sx={{ display: "flex", alignItems: "center", py: "0.1em" }}>
        <Typography>{`${text}:`}</Typography>
        {!selectedDate ? (
          <Typography sx={{ ml: "0.5em" }}>
            カレンダーから選択してください
          </Typography>
        ) : (
          <Typography>{selectedDate}</Typography>
        )}
        {date.start !== "" && date.end !== "" && (
          <Button onClick={onClick} sx={{ p: "0" }} size="small">
            変更する
          </Button>
        )}
      </Box>
    );
  };

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
        <SelectedDate
          text={"開始日"}
          selectedDate={date.start}
          onClick={handleStartDateChange}
        />
        <SelectedDate
          text={"終了日"}
          selectedDate={date.end}
          onClick={handleEndDateChange}
        />
      </Box>
      <ButtonLayout>
        <Fab
          variant="extended"
          size="large"
          color="primary"
          onClick={handleClick}
        >
          予約する
        </Fab>
        <Snackbar
          open={alert.open}
          autoHideDuration={1000}
          message={alert.message}
          onClose={handleCloseSnackBar}
          sx={{ bottom: { xs: 90, sm: 0 } }}
        />
      </ButtonLayout>
    </Box>
  );
};
