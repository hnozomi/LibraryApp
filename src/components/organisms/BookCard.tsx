import { Box, Grid, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";

import { BookType } from "../../types/types";
import { FC } from "react";

type Props = {
  book: BookType;
};

export const BookCard: FC<Props> = (props) => {
  const { book } = props;
  return (
    <Card sx={{ height: "200px", width: "110px" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="120"
          src={
            "https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/2933/9784480432933.jpg"
          }
          // src={book.image_url}
          alt="green iguana"
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
