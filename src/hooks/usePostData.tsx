import UUID from "uuidjs";
import axios from "axios";
import { useState } from "react";
import {
  BookType,
  DeleteReservationType,
  NewBookType,
  ReservationDate,
  Result,
} from "../types/types";
import { useCallback } from "react";

export const usePostData = () => {
  const [postloading, setPostLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState<Result>({
    status: "success",
    message: "",
  });
  const [complete, setComplete] = useState(false);

  const options = {
    headers: { "Content-Type": "text/plain" },
  };

  const returnBook = async (book: DeleteReservationType) => {
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
        setComplete(true);
        setTimeout(() => {
          setComplete(false);
        }, 3000);
      });
  };

  const insertReservation = async (
    user_id: string,
    book_id: string,
    date: ReservationDate
  ) => {
    setPostLoading(true);

    const ID = UUID.generate();

    await axios
      .post(
        "https://9qnebu8p5e.execute-api.ap-northeast-1.amazonaws.com/default/LibraryApp/insert_bookReservation",
        {
          reservation_id: ID,
          user_id: user_id,
          book_id: book_id,
          start_day: date.start,
          end_day: date.end,
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
        // setOpen(false);
      });

    return "成功しました";
  };

  // const EditUserName = useCallback(
  //   async (user_id: string, username: string) => {
  //     setPostLoading(true);

  //     await axios
  //       .post(
  //         "https://9qnebu8p5e.execute-api.ap-northeast-1.amazonaws.com/default/LibraryApp/update_username",
  //         {
  //           user_id: user_id,
  //           username: username,
  //         },
  //         options
  //       )
  //       .then((result) => {
  //         setResult({
  //           ...result,
  //           message: result.data.message,
  //           status: result.data.status,
  //         });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       })
  //       .finally(() => {
  //         setPostLoading(false);
  //         setComplete(true);
  //         setTimeout(() => {
  //           setComplete(false);
  //         }, 3000);
  //       });
  //   },
  //   []
  // );

  const deleteReview = useCallback(async (reviews_id: string) => {
    setPostLoading(true);

    await axios
      .post(
        "https://9qnebu8p5e.execute-api.ap-northeast-1.amazonaws.com/default/LibraryApp/delete_review",
        {
          review_id: reviews_id,
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
  }, []);

  return {
    returnBook,
    deleteBook,
    insertBooks,
    postReview,
    insertReservation,
    // EditUserName,
    deleteReview,
    postloading,
    open,
    result,
    complete,
  };
};
