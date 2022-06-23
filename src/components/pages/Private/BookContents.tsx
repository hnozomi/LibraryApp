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
import { BoxLayout } from "../../layout/BoxLayout";
import { FlexBoxLayout } from "../../layout/FlexBoxLayout";

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
  const { userinfo } = useContext(AuthContext);

  const location = useLocation();
  const { book_id, title, author, category, image_url, review, reservations } =
    location.state as BookType;

  const [status, setStatus] = useState("レビュー");

  const changeStatus = (status: string) => {
    setStatus(status);
  };

  return (
    <>
      <BoxLayout>
        <Card sx={{ display: "flex" }}>
          <CardMedia
            component="img"
            sx={{ width: "151px", objectFit: "fill" }}
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
        <FlexBoxLayout>
          {/* <Box sx={{ display: "flex", alignItems: "center", marginTop: "1em" }}> */}
          <Typography variant="h5" sx={{ marginRight: "auto" }}>
            {status}
          </Typography>
          <Box sx={{ textAlign: "right" }}>
            <SwitchButton
              active={status}
              name="レビュー"
              onClick={() => changeStatus("レビュー")}
            />
            <SwitchButton
              active={status}
              name="予約"
              onClick={() => changeStatus("予約")}
            />
          </Box>
        </FlexBoxLayout>
        {/* </Box> */}
        {status === "レビュー" ? (
          <Review reviews={review} user_id={userinfo!.user_id} />
        ) : (
          <ReservationCulensder
            book_id={book_id}
            user_id={userinfo!.user_id}
            reservations={reservations}
          />
        )}
      </BoxLayout>
    </>
  );
};
