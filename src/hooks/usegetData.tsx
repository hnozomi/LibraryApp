import axios from "axios";
import { useState } from "react";
import { BookType } from "../types/types";

export const useGetData = () => {
  const [books, setBooks] = useState<BookType[]>();
  const options = {
    headers: { "Content-Type": "text/plain" },
  };

  const getBooksByBookId = async () => {
    await axios
      .get<BookType[]>(
        "https://9qnebu8p5e.execute-api.ap-northeast-1.amazonaws.com/default/LibraryApp/get_books",
        options
      )
      .then((res) => {
        console.log(res);
        setBooks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    return books;
  };

  return getBooksByBookId;
};
