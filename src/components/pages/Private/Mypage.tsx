import { useContext, useEffect, useState, memo } from "react";

import AuthContext from "../../../provider/LoginUserProvider";
import BookContext from "../../../provider/BookInformationProvider";

import { usePostData } from "../../../hooks/usePostData";
import { BookCard } from "../../organisms/BookCard";
import { LoadingScreen } from "../../organisms/LoadingScreen";
import { ResultDialog } from "../../organisms/ResultDialog";
import { GridLayout } from "../../layout/GridLayout";
import { BoxLayout } from "../../layout/BoxLayout";
import { Button } from "../../parts/Button";
import { BookType } from "../../../types/types";
import { ReservationType } from "../../../types/types";
import { PaperBox } from "../../organisms/PaperBox";
import { Profile } from "../../organisms/Profile";
import { getNowYMD } from "../../../utils/getNowYMD";

export const Mypage = memo(() => {
  console.log("Mypage実行");
  const { userinfo } = useContext(AuthContext);
  const { books } = useContext(BookContext);

  const [reservationsBook, setReservationsBook] = useState<BookType[]>([]);
  const [borrowedBook, setBorrowedBook] = useState<BookType[]>([]);
  const [loading, setLoading] = useState(false);

  const { returnBook, postloading, complete, result } = usePostData();

  useEffect(() => {
    // 書籍情報にReservationsが存在しているかチェック
    setLoading(true);
    books?.map(async (book) => {
      if (book.reservations.length !== 0) {
        await checkReservation(book, book.reservations);
      }
    });
    setLoading(false);
  }, [books]);

  let reservation: BookType[] = [];
  let borrowd: BookType[] = [];

  // 予約情報の中にログイン中のユーザーが予約しているか確認
  const checkReservation = async (
    bookInformation: BookType,
    bookReservation: ReservationType[]
  ) => {
    const checkArray = bookReservation.map((res: ReservationType) => {
      return res.user_id;
    });

    // 予約しているユーザーの一覧を抽出し、user_idと一致するか確認
    const isContains = checkArray.some(
      (element: string) => element === userinfo.user_id
    );

    // 一致するデータがあった場合、予約している日をチェックする
    if (isContains) {
      await checkReservationDate(bookReservation, bookInformation);
    }
  };

  // 予約している日かどうかをチェック
  const checkReservationDate = async (
    bookReservation: any,
    bookInformation: any
  ) => {
    const nowDate = getNowYMD();

    bookReservation.forEach((res: any) => {
      if (res.start_day <= nowDate && nowDate <= res.end_day) {
        borrowd.push(bookInformation);
      } else {
        reservation.push(bookInformation);
      }
    });

    setReservationsBook(reservation);
    setBorrowedBook(borrowd);
    setLoading(false);
  };

  const handleClick = async (book: BookType) => {
    // 同じ本をまとめて予約できないことが前提
    const filterReservationByUserId = book?.reservations.filter((res) => {
      return res.user_id === userinfo.user_id;
    });

    const info = {
      reservation_id: filterReservationByUserId[0].reservation_id,
      book_id: book?.book_id,
      user_id: userinfo.user_id,
    };
    await returnBook(info);
  };

  if (loading) {
    return <LoadingScreen text={"取得中"} />;
  }

  if (postloading) {
    return <LoadingScreen text={"削除中"} />;
  }

  if (complete) {
    return <ResultDialog result={result}></ResultDialog>;
  }

  return (
    <>
      <BoxLayout>
        <Profile userinfo={userinfo} />
        <PaperBox
          array={borrowedBook}
          title="借りてる本"
          text="借りている本はありません"
        >
          <GridLayout GridItems={borrowedBook}>
            <BookCard displayContext={true} />
            <Button onClick={handleClick} text="返却"></Button>
          </GridLayout>
        </PaperBox>
        <PaperBox
          array={reservationsBook}
          title="予約している本"
          text="予約している本はありません"
        >
          <GridLayout GridItems={reservationsBook}>
            <BookCard displayContext={true} />
          </GridLayout>
        </PaperBox>
      </BoxLayout>
    </>
  );
});
