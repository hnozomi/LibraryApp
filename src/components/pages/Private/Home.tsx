import { useContext } from "react";

import { Box, Grid } from "@mui/material";

import { BookCard } from "../../organisms/BookCard";

import BookContext from "../../../provider/BookInformationProvider";
import { LoadingScreen } from "../../organisms/LoadingScreen";

export const Home = () => {
  const { books } = useContext(BookContext);

  if (books === undefined) {
    return <LoadingScreen text={"書籍情報取得中"}></LoadingScreen>;
  }

  return (
    <Box>
      <Grid container spacing={1} sx={{ marginTop: "1em" }}>
        {books.map((book) => (
          <Grid key={book.book_id} item xs={4} sx={{ height: "500px" }}>
            <BookCard book={book} displayContext={true} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
