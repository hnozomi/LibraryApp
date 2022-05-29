import {
  Button,
  Card,
  Container,
  Rating,
  Tab,
  Tabs,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { useState } from "react";

type Props = {
  reviews: any;
};

export const Review: FC<Props> = (props) => {
  const { reviews } = props;
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  console.log(reviews[value].rate);
  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        {reviews.map((review: any, index: number) => (
          <Tab label={index + 1} value={index} />
        ))}
      </Tabs>
      <Typography>オススメ度</Typography>
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
  );
};
