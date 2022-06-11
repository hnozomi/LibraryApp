import { useContext, useState } from "react";
import { Button, Rating, TextField, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

import AuthContext from "../../../provider/LoginUserProvider";
import { LoadingScreen } from "../../organisms/LoadingScreen";
import { usePostData } from "../../../hooks/usePostData";
import { ButtonLayout, BoxLayout } from "../../layout/BoxLayout";
import { usePageTransition } from "../../../hooks/usePageTransition";
import { ResultDialog } from "../../organisms/ResultDialog";

type Rare = number | null;

type LocationState = {
  book_id?: string;
  reviews_id?: string;
  review_user_id?: string;
  rate?: number;
  text?: string;
};

export const ReviewForm = () => {
  console.log("ReviewForm実行");
  const location = useLocation();
  const {
    book_id,
    reviews_id,
    rate: pastRate = 2.5,
    text: pastText,
  } = location.state as LocationState;
  const [rate, setRate] = useState<Rare>(pastRate);
  const [text, setText] = useState(pastText);
  const {
    userinfo: { user_id },
  } = useContext(AuthContext);
  const { pageTransition } = usePageTransition();

  const { postReview, postloading, complete, result } = usePostData();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  if (postloading) {
    return <LoadingScreen text={"投稿中"} />;
  }

  if (complete) {
    return <ResultDialog result={result}></ResultDialog>;
  }

  return (
    <>
      <BoxLayout>
        <form>
          <Typography>オススメ度</Typography>
          <Rating
            name="half-rating"
            value={rate}
            onChange={(event, newValue) => {
              setRate(newValue);
            }}
          />
          <Typography>メモ</Typography>
          <TextField
            placeholder="MultiLine with rows: 2 and rowsMax: 4"
            multiline
            rows={15}
            sx={{ width: "100%" }}
            value={text}
            onChange={handleChange}
          />
        </form>
        <ButtonLayout>
          <Button variant="contained" onClick={() => pageTransition("/home")}>
            キャンセル
          </Button>
          <Button
            sx={{ marginLeft: "1em" }}
            onClick={() => postReview(reviews_id, user_id, book_id, text, rate)}
            variant="contained"
          >
            投稿
          </Button>
        </ButtonLayout>
      </BoxLayout>
    </>
  );
};
