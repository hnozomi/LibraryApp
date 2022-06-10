import axios from "axios";
import { useState } from "react";

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
        bookInfomation = res.data;
      })
      .catch((err) => {
        console.log(err);
      });

    return { bookInfomation };
  };

  return { getAchievementByUserId, searchBooks, loading };
};
