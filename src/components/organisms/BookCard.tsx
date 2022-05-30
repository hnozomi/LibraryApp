import { FC } from "react";

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
} from "@mui/material";

import { BookType } from "../../types/types";
import { usePageTransition } from "../../hooks/usePageTransition";

type Props = {
  book: BookType;
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
    <Card sx={{ height: "200px", width: "110px" }}>
      {/* <CardActionArea onClick={() => pageTransition("/home/bookcontext", book)}> */}
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          height="120"
          src={book.image_url}
          alt="書籍の情報"
          sx={{ objectFit: "fill" }}
        />
        <CardContent>
          <Typography gutterBottom component="p" sx={{ fontSize: "8px" }}>
            {book.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "8px" }}
          >
            {book.author}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
