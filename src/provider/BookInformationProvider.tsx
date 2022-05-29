import { createContext, ReactNode, useEffect, useState } from "react";
import axios from "axios";
import { BookType, UserType } from "../types/types";

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
  // 初期値入れないとundefinedになるのはどうすればよい？
  const [books, setBooks] = useState<BookType[]>();
  const [screenLoading, setScreenLoading] = useState(true);

  useEffect(() => {
    const getBooksTable = async () => {
      await axios
        .get<BookType[]>(
          "https://9qnebu8p5e.execute-api.ap-northeast-1.amazonaws.com/default/LibraryApp/get_books",
          options
        )
        .then((res) => {
          console.log(res.data);
          setScreenLoading(true);
          setBooks(res.data);
        })
        .catch((err) => {
          setScreenLoading(true);
          console.log(err);
        });
    };

    getBooksTable();
    setScreenLoading(true);
  }, []);

  return (
    <BookContext.Provider
      value={{
        books,
      }}
    >
      {children}
      {/* {screenLoading && children} */}
    </BookContext.Provider>
  );
};

export default BookContext;
