import { FC } from "react";

import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
} from "@mui/material";

import { BookReservationType, BookType } from "@/types";
import { usePageTransition } from "../../hooks";

type Props = {
  book?: BookType | BookReservationType;
  displayContext: boolean;
  state?: State;
};

type State = {
  book: BookType | BookReservationType;
};

export const BookCard: FC<Props> = (props) => {
  const { book, displayContext, state } = props;

  const { pageTransition } = usePageTransition();

  const handleClick = () => {
    if (displayContext) {
      pageTransition("/home/bookcontext", state?.book);
    }
  };

  return (
    <Card sx={{ height: "100%" }}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          src={book ? book?.image_url : state?.book?.image_url}
          alt="書籍の情報"
          sx={{ objectFit: "fill" }}
        />
        <CardContent sx={{ p: 1 }}>
          <Typography gutterBottom component="p" sx={{ fontSize: "8px" }}>
            {book ? book?.title : state?.book?.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
