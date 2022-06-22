import { DateType, ReservationDate, ReservationType } from "../../types/types";
import { getNowYMD } from "../getNowYMD";


// 日付のチェックを1つずつの関数にした方がよいか 又は 1つの関数でまとめて全てのチェックができるほうがよいか
// 1つのほうが他の箇所でも使える。しかし、予約のチェックのため現状他の箇所で使わない
// 1つにまとめたほうが1つの関数を呼ぶだけで足りるので楽。コードの記述量が減る
// チェックと言っても条件が違うだけでコードはほとんど同じ。checkの中にif文だけなので特に必要なさそう

// export const checkBlankDate = (date: any, setAlert:any) => {

//     if (date.start === "" || date.end === "") {
//         setAlert({ ...alert, open: true, message: "予約日付を選択してください" });
//         return  false
//       }
// }

// export const checkPastDate = (date: any, nowDate: string, setAlert:any) => {
//     if (date.start < nowDate) {
//         setAlert({
//           ...alert,
//           open: true,
//           message: "過去の日付を予約することはできません",
//         });
//         return;
//       }
// }

// export const checkStartDate = (date: any, setAlert:any) => {
//     if (date.start > date.end) {
//         setAlert({
//           ...alert,
//           open: true,
//           message: "開始日は終了日よりも前の日付にしてください",
//         });
//         return;
//       }
// }

// export const checkReservattionPeriod = (date: any, setAlert:any) => {
//     const diff = checkDate(date);
//     if (diff > 14) {
//       setAlert({
//         ...alert,
//         open: true,
//         message: "1回の予約は14日以内にしてください",
//       });
//       return;
//     }
// }

const checkDate = (date: ReservationDate) => {
    const startDate = new Date(date.start);
    const endDate = new Date(date.end);
    const diffDate =
      Math.floor(endDate.getTime() - startDate.getTime()) / 86400000;
  
    return diffDate;
  };


//   export const checkCurrentReservation = (reservations: any, setAlert: any, user_id: string) => {

//       const current = checkMyReservation(reservations, user_id);
//         if (current) {
//           setAlert({
//             ...alert,
//             open: true,
//             message: "現在の予約が終わってからにしてください",
//           });
//           return;
//         }
//   }


  const checkMyReservation = (reservations: any, user_id: string) => {
    const current = reservations.some(
      (reservation: any) => reservation.user_id === user_id
    );
    return current;
  };

  export const checkReservationDate = (date: DateType, reservations: ReservationType[], user_id: string) => {

    let message = ""
    let isCheck = false

    const nowDate = getNowYMD();

      if (date.start < nowDate) {
        message = "過去の日付を予約することはできません"
        isCheck = true
      }

      if (date.start > date.end) {
        message = "開始日は終了日よりも前の日付にしてください"
        isCheck = true
      }

      const diff = checkDate(date);
      if (diff > 14) {
        message = "1回の予約は14日以内にしてください"
        isCheck = true
      }

      const current = checkMyReservation(reservations, user_id);
      if (current) {
        message = "現在の予約が終わってからにしてください"
        isCheck = true
      }

      if (date.start === "" || date.end === "") {
        message = "予約日付を選択してください"
        isCheck = true
      }

      return {message, isCheck}
  }