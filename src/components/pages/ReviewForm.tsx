import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Rating,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { setTextRange } from "typescript";
import { Header } from "../organisms/Header";
import axios from "axios";
import AuthContext from "../../provider/LoginUserProvider";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { BookType } from "../../types/types";
import UUID from "uuidjs";

type Rare = number | null;

type LocationState = {
  book_id?: string;
  reviews_id?: string;
  review_user_id?: string;
  rate?: number;
  text?: string;
};

export const ReviewForm = () => {
  const location = useLocation();
  const {
    book_id,
    review_user_id,
    reviews_id,
    rate: pastRate = 2.5,
    text: pastText,
  } = location.state as LocationState;
  const [rate, setRate] = useState<Rare>(pastRate);
  const [text, setText] = useState(pastText);
  const [loading, setLoading] = useState(false);
  const {
    userinfo: { user_id },
  } = useContext(AuthContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const options = {
    headers: { "Content-Type": "text/plain" },
  };

  console.log(reviews_id);

  const handleClick = async () => {
    setLoading(true);
    const ID = UUID.generate();
    let url = "";
    let params = {};

    if (reviews_id) {
      console.log("更新");
      url =
        "https://9qnebu8p5e.execute-api.ap-northeast-1.amazonaws.com/default/LibraryApp/update_review";

      params = {
        review_id: reviews_id,
        rate: rate,
        text: text,
      };
    } else {
      console.log("作成");
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
      .post(
        url,
        params,
        // {
        //   review_id: ID,
        //   book_id: book_id,
        //   user_id: user_id,
        //   rate: rate,
        //   text: text,
        // },
        options
      )
      .then((response) => {
        console.log(response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <Backdrop sx={{ color: "#fff" }} open={true}>
        <Box
          sx={{
            display: "flex",
            flexFlow: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress color="inherit" />
          <Typography sx={{ mt: 1 }}>変更中</Typography>
        </Box>
      </Backdrop>
    );
  }

  return (
    <>
      <Header />
      <Container sx={{ width: "94%" }}>
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
        <Box>
          <Button variant="contained">キャンセル</Button>
          <Button onClick={handleClick} variant="contained">
            投稿
          </Button>
        </Box>
      </Container>
    </>
  );
};
