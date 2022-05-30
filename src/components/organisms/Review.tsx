import {
  Box,
  Button,
  Rating,
  Tab,
  Tabs,
  TextareaAutosize,
  Typography,
  Dialog,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { FC } from "react";
import { useState } from "react";
import { usePageTransition } from "../../hooks/usePageTransition";
import axios from "axios";

type Props = {
  reviews: any;
  user_id: string;
};

export const Review: FC<Props> = (props) => {
  const { reviews, user_id } = props;

  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);

  const { pageTransition } = usePageTransition();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleClick = async () => {
    const url =
      "https://9qnebu8p5e.execute-api.ap-northeast-1.amazonaws.com/default/LibraryApp/delete_review";

    const params = {
      review_id: reviews.reviews_id,
    };

    const options = {
      headers: { "Content-Type": "text/plain" },
    };

    await axios
      .post(url, params, options)
      .then((response) => {})
      .finally(() => {
        // setLoading(false);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (open) {
    return (
      <Dialog open={open} onClose={handleClose}>
        <Box>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Rating name="half-rating" value={reviews.rate} />
            </DialogContentText>
            <DialogContentText id="alert-dialog-description">
              {reviews.text}
            </DialogContentText>
          </DialogContent>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              上記のメモを削除します
            </DialogContentText>
          </DialogContent>
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", padding: "0.6em" }}
        >
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{ marginRight: "0.4em" }}
          >
            キャンセル
          </Button>
          <Button onClick={handleClick} variant="outlined">
            削除
          </Button>
        </Box>
      </Dialog>
    );
  }

  return (
    <>
      {reviews.length === 0 ? (
        <Box sx={{ marginTop: "1em" }}>投稿がありません</Box>
      ) : (
        <>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            {reviews.map((review: any, index: number) => (
              <Tab label={index + 1} value={index} key={review.review_id} />
            ))}
          </Tabs>
          <Box sx={{ display: "flex", alignItems: "center", marginTop: "1em" }}>
            <Typography>オススメ度</Typography>
            {user_id === reviews[value].review_user_id && (
              <Box sx={{ marginLeft: "auto" }}>
                <Button onClick={() => setOpen(true)}>削除する</Button>
                <Button
                  onClick={() =>
                    pageTransition("/home/mypage/reviewform", reviews[value])
                  }
                >
                  修正する
                </Button>
              </Box>
            )}
          </Box>
          <Rating name="half-rating" value={reviews[value].rate} readOnly />
          <Typography>感想</Typography>
          <TextareaAutosize
            aria-label="empty textarea"
            placeholder="Empty"
            value={reviews[value].text}
            minRows={15}
            style={{ width: "100%" }}
          />
        </>
      )}
    </>
  );
};
