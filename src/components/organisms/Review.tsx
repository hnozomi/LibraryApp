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
import { useState } from "react";

export const Review = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        <Tab label="Item One" />
        <Tab label="Item Two" />
        <Tab label="Item Three" />
        <Tab label="Item Four" />
        <Tab label="Item Five" />
        <Tab label="Item Six" />
        <Tab label="Item Seven" />
      </Tabs>
      <Typography>投稿者</Typography>
      <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
      <Typography>感想</Typography>
      <TextareaAutosize
        aria-label="empty textarea"
        placeholder="Empty"
        minRows={15}
        style={{ width: "100%" }}
      />
    </>
  );
};
