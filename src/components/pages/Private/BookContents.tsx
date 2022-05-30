import { FC, useContext, useState } from "react";

import { useLocation } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";

import { ReservationCulensder } from "../../organisms/ReservationCulender";
import { Review } from "../../organisms/Review";
import AuthContext from "../../../provider/LoginUserProvider";
import { BookType } from "../../../types/types";

const TestButton = (props: any) => {
  const { active, name, onClick } = props;
  const color = active === name ? "primary" : "inherit";
  return (
    <Button
      color={color}
      sx={{ marginRight: "0.5em" }}
      onClick={onClick}
      variant="contained"
    >
      {name}
    </Button>
  );
};

export const BookContents: FC = () => {
  const {
    userinfo: { user_id },
  } = useContext(AuthContext);

  const location = useLocation();
  const { book_id, title, author, image_url, review } =
    location.state as BookType;

  const [status, setStatus] = useState("評価");

  const changeStatus = (status: string) => {
    setStatus(status);
  };

  return (
    <>
      <Container>
        <Card sx={{ display: "flex" }}>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            src={image_url}
            alt="Live from space album cover"
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                {title}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                {author}
              </Typography>
            </CardContent>
          </Box>
        </Card>
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", marginTop: "1em" }}>
            <Typography variant="h5" sx={{ marginRight: "auto" }}>
              {status}
            </Typography>
            <Box sx={{ textAlign: "right" }}>
              <TestButton
                active={status}
                name="評価"
                onClick={() => changeStatus("評価")}
              />
              <TestButton
                active={status}
                name="予約"
                onClick={() => changeStatus("予約")}
              />
            </Box>
          </Box>
          {status === "評価" ? (
            <Review reviews={review} user_id={user_id} />
          ) : (
            <ReservationCulensder book_id={book_id} user_id={user_id} />
          )}
        </Box>
      </Container>
    </>
  );
};
