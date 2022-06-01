import { createContext, ReactNode, useEffect, useState } from "react";

import axios from "axios";

import { BookType } from "../types/types";
import { useGetData } from "../hooks/usegetData";

export type BookContextType = {
  books: BookType[] | undefined;
};

export const BookContext = createContext<BookContextType>(
  {} as BookContextType
);

type Props = {
  children: ReactNode;
};

const options = {
  headers: { "Content-Type": "text/plain" },
};

export const BookProvider = ({ children }: Props) => {
  console.log("BookProvider実行");
  const { getBooksByBookId }: any = useGetData();
  // 初期値入れないとundefinedになるのはどうすればよい？
  const [books, setBooks] = useState<BookType[]>();

  useEffect(() => {
    console.log("BookProviderのuseEffect実行");
    const getBooksTable = async () => {
      const test = await getBooksByBookId();
      console.log(test);
      setBooks(test);
    };
    // const getBooksTable = async () => {
    //   await axios
    //     .get<BookType[]>(
    //       "https://9qnebu8p5e.execute-api.ap-northeast-1.amazonaws.com/default/LibraryApp/get_books",
    //       options
    //     )
    //     .then((res) => {
    //       setBooks(res.data);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // };

    getBooksTable();
  }, []);

  return (
    <BookContext.Provider
      value={{
        books,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export default BookContext;
