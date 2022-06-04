import axios from "axios";
import { useState } from "react";
import { BookReservationType, BookType } from "../types/types";
import UUID from "uuidjs";

export const useGetData = () => {
  const [loading, setLoading] = useState(false);
  const options = {
    headers: { "Content-Type": "text/plain" },
  };
  // const returnBooks = async (book: BookType) => {
  //   const ID = UUID.generate();
  //   setLoading(true);
  //   await axios
  //     .post(
  //       "https://9qnebu8p5e.execute-api.ap-northeast-1.amazonaws.com/default/LibraryApp/delete_bookReservation",
  //       {
  //         reservation_id: book.reservation_id,
  //         achievement_id: ID,
  //         user_id: book.user_id,
  //         book_id: book.book_id,
  //       },
  //       options
  //     )
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };

  const getAchievementByUserId = async (user_id: string) => {
    setLoading(true);
    let achievement;
    await axios
      .get(
        "https://9qnebu8p5e.execute-api.ap-northeast-1.amazonaws.com/default/LibraryApp/get_achievement",
        {
          params: {
            user_id: user_id,
          },
          headers: { "Content-Type": "text/plain" },
        }
      )
      .then((response) => {
        achievement = response.data;
      })
      .finally(() => {
        setLoading(false);
      });

    return { achievement };
  };

  const getReservationRecord = async (user_id: string) => {
    setLoading(true);
    let data;
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
        data = checkReservationDate(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });

    return { data };
  };

  const getNowYMD = () => {
    var dt = new Date();
    var y = dt.getFullYear();
    var m = ("00" + (dt.getMonth() + 1)).slice(-2);
    var d = ("00" + dt.getDate()).slice(-2);
    var result = y + "-" + m + "-" + d;
    return result;
  };

  const checkReservationDate = (info: BookReservationType[]) => {
    const nowDate = getNowYMD();

    let reservation: BookReservationType[] = [];
    let borrowd: BookReservationType[] = [];
    info.forEach((res: any) => {
      if (res.start_day < nowDate && nowDate < res.end_day) {
        borrowd.push(res);
      } else {
        reservation.push(res);
      }
    });

    return { reservation, borrowd };
  };

  const searchBooks = async (isbn: string) => {
    const param = {
      isbn: isbn,
    };

    let bookInfomation;
    await axios
      .get(
        "https://9qnebu8p5e.execute-api.ap-northeast-1.amazonaws.com/default/LibraryApp/search_books",
        { params: param }
      )
      .then((res) => {
        // setbooks({
        //   ...books,
        //   title: res.data[0],
        //   author: res.data[1],
        //   category: res.data[2],
        //   image_url: res.data[4],
        // });

        bookInfomation = res.data;

        // AWSで他のgetみたいにkeyをつけてreturnする
      })
      .catch((err) => {
        console.log(err);
      });

    return { bookInfomation };
  };

  return { getAchievementByUserId, getReservationRecord, searchBooks, loading };
};
