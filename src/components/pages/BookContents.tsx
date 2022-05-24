import {
  Button,
  Card,
  Container,
  Rating,
  Tab,
  Tabs,
  TextareaAutosize,
} from "@mui/material";
import { Header } from "../organisms/Header";

import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { useState } from "react";

type Props = {};

export const BookContents: FC<Props> = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Header></Header>
      <Container>
        <Card sx={{ display: "flex" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                砂漠
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                伊坂幸太郎
              </Typography>
            </CardContent>
          </Box>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image="/static/images/cards/live-from-space.jpg"
            alt="Live from space album cover"
          />
        </Card>
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", marginTop: "1em" }}>
            <Typography variant="h5" sx={{ marginRight: "auto" }}>
              評価
            </Typography>
            <Box sx={{ textAlign: "right" }}>
              <Button>評価</Button>
              <Button>予約</Button>
            </Box>
          </Box>

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
        </Box>
      </Container>
    </>
  );
};
