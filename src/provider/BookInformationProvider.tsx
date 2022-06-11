import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";

import { BookType } from "../types/types";
import AuthContext from "./LoginUserProvider";

export type BookContextType = {
  books: BookType[] | undefined;
  loading: boolean;
  deleteStateBooks: (book_id: string) => void;
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
  // const { getBooksByBookId, loading }: any = useGetData();
  // 初期値入れないとundefinedになるのはどうすればよい？
  const [books, setBooks] = useState<BookType[]>();
  const [loading, setLoading] = useState(false);

  const {
    userinfo: { user_id },
  } = useContext(AuthContext);

  useEffect(() => {
    console.log("BookProviderのuseEffect実行");
    const getBooksTable = async () => {
      await getBooksByBookId();
    };

    getBooksTable();
  }, [user_id]);

  const getBooksByBookId = async () => {
    setLoading(true);
    await axios
      .get<BookType[]>(
        "https://9qnebu8p5e.execute-api.ap-northeast-1.amazonaws.com/default/LibraryApp/get_books",
        options
      )
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteStateBooks = (book_id: string) => {
    const newBooks = books?.filter((book) => {
      return book.book_id !== book_id;
    });
    setBooks(newBooks);
  };

  return (
    <BookContext.Provider
      value={{
        books,
        loading,
        deleteStateBooks,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export default BookContext;
