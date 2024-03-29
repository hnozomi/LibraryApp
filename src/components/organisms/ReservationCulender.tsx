import { FC, useCallback, useContext, useEffect, useState } from "react";

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  Fab,
  Snackbar,
} from "@mui/material";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";

import { usePostData } from "../../hooks/usePostData";
import { DateType, ReservationType } from "@/types";
import { LoadingScreen } from "./LoadingScreen";
import { ButtonLayout } from "../layout/ButtonLayout";
import { ResultDialog } from "./ResultDialog";
import { SelectDate } from "./SelectDate";
import { checkReservationDate } from "../../utils/validation/dateCheckValidation";
import BookContext from "../../provider/BookInformationProvider";

type Props = {
  book_id: string;
  user_id: string;
  reservations: ReservationType[];
};

export const ReservationCulensder: FC<Props> = (props) => {
  const { book_id, user_id, reservations } = props;

  const [date, setDate] = useState({ start: "", end: "" });
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: "" });
  const [isStart, setIsStart] = useState(true);

  const { insertReservation, postloading, result, complete } = usePostData();
  const { getBooksByBookId } = useContext(BookContext);

  const [reservationDate, setReservationDate] = useState<Array<DateType>>([]);

  useEffect(() => {
    let reservation = reservations.map((res: ReservationType) => {
      const reservationData = {
        start: res.start_day + " 00:00:00",
        end: res.end_day + " 23:59:59", //時刻を入力しないと、00:00:00で認識され、日付の表示が前日になる
      };
      return reservationData;
    });
    setReservationDate(reservation);
  }, [reservations]);

  const handleClick = () => {
    const result = checkReservationDate(date, reservations, user_id);
    if (result.isCheck) {
      setAlert({ ...alert, open: true, message: result.message });
      return;
    }

    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleDateClick = useCallback(
    (arg: DateClickArg) => {
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
    ) as HTMLCollectionOf<HTMLElement>; //デフォルトではHTMLCollectionOf<Element>になっており、datasetがない

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
    date.end = date.end + " 23:59:59";
    let newArray = [...reservationDate, date];
    insertReservation(user_id, book_id, date).then((res) => {
      setReservationDate(newArray);
      getBooksByBookId();
    });
  };

  // let reservation = reservations.map((res: ReservationType) => {
  //   const reservationData = {
  //     start: res.start_day + " 00:00:00",
  //     end: res.end_day + " 23:59:59", //時刻を入力しないと、00:00:00で認識され、日付の表示が前日になる
  //   };
  //   return reservationData;
  // });

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

  return (
    <Box sx={{ marginTop: "1em" }}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale="ja" // 日本語化
        dateClick={handleDateClick}
        events={reservationDate}
        displayEventTime={false}
      />
      <Box sx={{ mt: "1em" }}>
        <SelectDate
          text={"開始日"}
          selectedDate={date.start}
          date={date}
          onClick={handleStartDateChange}
        />
        <SelectDate
          text={"終了日"}
          selectedDate={date.end}
          date={date}
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
