import UUID from "uuidjs";
import axios from "axios";
import { useState } from "react";
import { BookReservationType, BookType } from "../types/types";

export const usePostData = () => {
  const [postloading, setPostLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState({ status: "", message: "" });

  const options = {
    headers: { "Content-Type": "text/plain" },
  };

  const deleteReservation = async (book: BookReservationType) => {
    setPostLoading(true);
    const ID = UUID.generate();
    await axios
      .post(
        "https://9qnebu8p5e.execute-api.ap-northeast-1.amazonaws.com/default/LibraryApp/delete_bookReservation",
        {
          reservation_id: book.reservation_id,
          achievement_id: ID,
          user_id: book.user_id,
          book_id: book.book_id,
        },
        options
      )
      .finally(() => {
        setPostLoading(false);
      });
  };

  const changeRole = async (role: any, mail: any) => {
    setPostLoading(true);

    await axios
      .post(
        "https://9qnebu8p5e.execute-api.ap-northeast-1.amazonaws.com/default/LibraryApp/change_role",
        {
          e_mail: mail,
          previousRole: role[0],
          nextRole: role[1],
        },
        options
      )
      .then((res) => {
        setResult({
          ...result,
          message: res.data.message,
          status: res.data.status,
        });
      })
      .catch((err) => {
        console.log(err, "err");
      })
      .finally(() => {
        setPostLoading(false);
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
        }, 3000);
      });
  };

  return { deleteReservation, changeRole, postloading, open, result };
};
