import { Box, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { Header } from "../organisms/Header";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { BookType } from "../../types/types";
import { BookCard } from "../organisms/BookCard";

export const Home = () => {
  const [books, setBooks] = useState<BookType[]>();
  const options = {
    headers: { "Content-Type": "text/plain" },
  };

  useEffect(() => {
    const getBooksTable = async () => {
      await axios
        .get<BookType[]>(
          "https://9qnebu8p5e.execute-api.ap-northeast-1.amazonaws.com/default/LibraryApp/get_books",
          options
        )
        .then((res) => {
          console.log(res.data);
          setBooks(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getBooksTable();
  }, []);

  console.log(books);

  return (
    <Box>
      <Header></Header>
      {books === undefined ? (
        <Typography>データがありません</Typography>
      ) : (
        <Grid container spacing={1} sx={{ marginTop: "1em" }}>
          {books.map((book) => (
            <Grid item xs={4} sx={{ height: "500px" }}>
              <BookCard book={book} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};
