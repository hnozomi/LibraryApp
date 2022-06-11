import { FC } from "react";

import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
} from "@mui/material";

import { BookReservationType, BookType } from "../../types/types";
import { usePageTransition } from "../../hooks/usePageTransition";

type Props = {
  book: BookType | BookReservationType;
  displayContext: boolean;
};

export const BookCard: FC<Props> = (props) => {
  const { book, displayContext } = props;

  const { pageTransition } = usePageTransition();

  const handleClick = () => {
    if (displayContext) {
      pageTransition("/home/bookcontext", book);
    }
  };

  return (
    <Card sx={{ height: "100%" }}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          src={book.image_url}
          alt="書籍の情報"
          sx={{ objectFit: "fill" }}
        />
        <CardContent sx={{ p: 1 }}>
          <Typography gutterBottom component="p" sx={{ fontSize: "8px" }}>
            {book.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
