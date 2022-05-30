import { useContext } from "react";

import { Box, Grid, Typography } from "@mui/material";

import { Header } from "../organisms/Header";
import { BookCard } from "../organisms/BookCard";

import BookContext from "../../provider/BookInformationProvider";

export const Home = () => {
  const { books } = useContext(BookContext);

  return (
    <Box>
      <Header></Header>
      {books === undefined ? (
        <Typography>データがありません</Typography>
      ) : (
        <Grid container spacing={1} sx={{ marginTop: "1em" }}>
          {books.map((book) => (
            <Grid key={book.book_id} item xs={4} sx={{ height: "500px" }}>
              <BookCard book={book} displayContext={true} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};
