import { useContext, useEffect, useState } from "react";
import { Typography } from "@mui/material";

import { BookCard } from "../../organisms/BookCard";
import AuthContext from "../../../provider/LoginUserProvider";
import { usePageTransition } from "../../../hooks/usePageTransition";
import { useGetData } from "../../../hooks/usegetData";
import { BookType } from "@/types";
import { LoadingScreen } from "../../organisms/LoadingScreen";
import { GridLayout } from "../../layout/GridLayout";
import { Button } from "../../parts/Button";
import { BoxLayout } from "../../layout/BoxLayout";

export const Achievement = () => {
  const { userinfo } = useContext(AuthContext);

  const [books, setBooks] = useState<BookType[]>([]);

  const { pageTransition } = usePageTransition();
  const { getAchievementByUserId, loading } = useGetData();

  useEffect(() => {
    const get = async () => {
      await getAchievementByUserId(userinfo!.user_id).then((res) => {
        if (res.achievement !== undefined) {
          setBooks(res.achievement);
        }
      });
    };

    get();
  }, [userinfo!.user_id]);

  if (loading) {
    return <LoadingScreen text={"取得中"} />;
  }

  console.log(books);
  return (
    <>
      <BoxLayout>
        <Typography>{`読んだ冊数：${books?.length}`}</Typography>
        <GridLayout GridItems={books}>
          <BookCard displayContext={true} />
          <Button
            text="メモを書く"
            route="/home/mypage/reviewform"
            onClick={pageTransition}
          ></Button>
        </GridLayout>
      </BoxLayout>
    </>
  );
};
