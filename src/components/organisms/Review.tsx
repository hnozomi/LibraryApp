import { FC, useState } from "react";
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

import { usePageTransition } from "../../hooks/usePageTransition";
import { usePostData } from "../../hooks/usePostData";
import { ResultDialog } from "./ResultDialog";
import { LoadingScreen } from "./LoadingScreen";
import { FlexBoxLayout } from "../layout/FlexBoxLayout";
import { ReviewType } from "@/types";

type Props = {
  reviews: Array<ReviewType>;
  user_id: string | undefined;
};

export const Review: FC<Props> = (props) => {
  const { reviews, user_id } = props;
  console.log(reviews);

  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);

  const { pageTransition } = usePageTransition();
  const { deleteReview, postloading, result, complete } = usePostData();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (open) {
    return (
      <Dialog open={open} onClose={handleClose}>
        <Box>
          <DialogContent>
            <DialogContentText>
              <Rating name="half-rating" value={reviews[value].rate} />
            </DialogContentText>
            <DialogContentText>{reviews[value].text}</DialogContentText>
          </DialogContent>
          <DialogContent>
            <DialogContentText>上記のメモを削除します</DialogContentText>
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
          <Button
            onClick={() => deleteReview(reviews[value].review_id)}
            variant="outlined"
          >
            削除
          </Button>
        </Box>
      </Dialog>
    );
  }

  if (postloading) {
    return <LoadingScreen text={"削除中"} />;
  }

  if (complete) {
    return <ResultDialog result={result}></ResultDialog>;
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
            {reviews.map((review: ReviewType, index: number) => (
              <Tab label={index + 1} value={index} key={review.review_id} />
            ))}
          </Tabs>

          <FlexBoxLayout>
            <Typography>オススメ度</Typography>
            {user_id === reviews[value].user_id && (
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
          </FlexBoxLayout>

          <Rating value={reviews[value].rate} readOnly />
          <Box sx={{ width: "100%" }}>
            <Typography>感想</Typography>
            <TextareaAutosize
              placeholder="Empty"
              value={reviews[value].text}
              minRows={13}
              style={{ width: "100%", boxSizing: "border-box" }}
            />
          </Box>
        </>
      )}
    </>
  );
};
