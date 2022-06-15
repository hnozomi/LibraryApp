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
import { styled } from "@mui/system";

import { ReservationCulensder } from "../../organisms/ReservationCulender";
import { Review } from "../../organisms/Review";
import AuthContext from "../../../provider/LoginUserProvider";
import { BookType } from "../../../types/types";

const SwitchButton = (props: any) => {
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
  const { book_id, title, author, category, image_url, review, reservations } =
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
            sx={{ objectFit: "fill" }}
            src={image_url}
            alt="本の表紙"
          />
          <Box>
            <CardContent sx={{ fontSize: "8px" }}>
              <Typography component="p">{title}</Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="p"
              >
                {author}
              </Typography>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                component="p"
              >
                {category}
              </Typography>
            </CardContent>
          </Box>
        </Card>
        <Box sx={{ display: "flex", alignItems: "center", marginTop: "1em" }}>
          <Typography variant="h5" sx={{ marginRight: "auto" }}>
            {status}
          </Typography>
          <Box sx={{ textAlign: "right" }}>
            <SwitchButton
              active={status}
              name="評価"
              onClick={() => changeStatus("評価")}
            />
            <SwitchButton
              active={status}
              name="予約"
              onClick={() => changeStatus("予約")}
            />
          </Box>
        </Box>
        {status === "評価" ? (
          <Review reviews={review} user_id={user_id} />
        ) : (
          <ReservationCulensder
            book_id={book_id}
            user_id={user_id}
            reservations={reservations}
          />
        )}
      </Container>
    </>
  );
};
