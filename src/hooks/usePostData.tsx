import UUID from "uuidjs";
import axios from "axios";
import { useState } from "react";
import { BookReservationType, BookType, NewBookType } from "../types/types";
import { FormatColorReset } from "@mui/icons-material";

export const usePostData = () => {
  const [postloading, setPostLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState({ status: "", message: "" });
  const [complete, setComplete] = useState(false);

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
        // setOpen(true);
        setComplete(true);
        setTimeout(() => {
          setComplete(false);
        }, 3000);
      });
  };

  const deleteBook = async (deleteBook: BookType) => {
    setPostLoading(true);

    await axios
      .post(
        "https://9qnebu8p5e.execute-api.ap-northeast-1.amazonaws.com/default/LibraryApp/delete_book",
        {
          book_id: deleteBook.book_id,
        },
        options
      )
      .then((result) => {
        setResult({
          ...result,
          message: result.data.message,
          status: result.data.status,
        });
      })
      .finally(() => {
        setPostLoading(false);
        setComplete(true);
        setTimeout(() => {
          setComplete(false);
        }, 3000);
      });
  };

  const insertBooks = async (books: NewBookType, category: string) => {
    setPostLoading(true);

    const ID = UUID.generate();
    await axios
      .post(
        "https://9qnebu8p5e.execute-api.ap-northeast-1.amazonaws.com/default/LibraryApp/insert_books",
        {
          book_id: ID,
          title: books.title,
          author: books.author,
          category: category,
          image_url: books.image_url,
        },
        options
      )
      .then((result) => {
        setResult({
          ...result,
          message: result.data.message,
          status: result.data.status,
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setPostLoading(false);
        setComplete(true);
        setTimeout(() => {
          setComplete(false);
        }, 3000);
      });
  };

  const postReview = async (
    reviews_id: string | undefined,
    user_id: string,
    book_id: string | undefined,
    text: string | undefined,
    rate: number | null
  ) => {
    setPostLoading(true);
    const ID = UUID.generate();
    let url = "";
    let params = {};

    if (reviews_id) {
      url =
        "https://9qnebu8p5e.execute-api.ap-northeast-1.amazonaws.com/default/LibraryApp/update_review";

      params = {
        review_id: reviews_id,
        rate: rate,
        text: text,
      };
    } else {
      url =
        "https://9qnebu8p5e.execute-api.ap-northeast-1.amazonaws.com/default/LibraryApp/insert_review";
      params = {
        review_id: ID,
        book_id: book_id,
        user_id: user_id,
        rate: rate,
        text: text,
      };
    }

    await axios
      .post(url, params, options)
      .then((result) => {
        setResult({
          ...result,
          message: result.data.message,
          status: result.data.status,
        });
      })
      .finally(() => {
        setPostLoading(false);
        setTimeout(() => {
          setComplete(false);
        }, 3000);
      });
  };

  return {
    deleteReservation,
    changeRole,
    deleteBook,
    insertBooks,
    postReview,
    postloading,
    open,
    result,
    complete,
  };
};
