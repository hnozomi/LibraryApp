import { useState } from "react";

import axios from "axios";

export const useGetData = () => {
  const [loading, setLoading] = useState(false);

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
