import { useEffect, useContext, useState } from "react";

import { Divider } from "@mui/material";

import BookContext from "../../../provider/BookInformationProvider";
import { BookCard } from "../../organisms/BookCard";
import { LoadingScreen } from "../../organisms/LoadingScreen";
import { SearchBox } from "../../organisms/SearchBox";
import { BoxLayout } from "../../layout/BoxLayout";
import { SearchForm } from "../../organisms/SearchForm";
import { GridLayout } from "../../layout/GridLayout";

export const Home = () => {
  const { books, loading } = useContext(BookContext);
  const [displayBooks, setDisplayBooks] = useState(books);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Array<string>>([]);

  useEffect(() => {
    setDisplayBooks(books);
  }, [books]);

  const handleClose = () => {
    setOpen(false);
  };

  const searchBooks = () => {
    if (value.trim() === "") {
      setDisplayBooks(books);
    }
    const filterBooks = books?.filter((book) => {
      return book.title.includes(value);
    });

    setDisplayBooks(filterBooks);

    let filterByCategory;
    if (selectedCategory.length !== 0) {
      filterByCategory = filterBooks?.filter((book) => {
        return selectedCategory.some((category) => category === book.category);
      });
      setDisplayBooks(filterByCategory);
    }

    setSelectedCategory([]);
    setOpen(false);
    setValue("");
  };

  const searchBooksByCategory = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let newArray = [...selectedCategory, event.target.value];
    if (selectedCategory.includes(event.target.value)) {
      newArray = selectedCategory.filter(
        (value) => value !== event.target.value
      );
    }
    setSelectedCategory(newArray);
  };

  if (loading) {
    return <LoadingScreen text={"書籍情報取得中"}></LoadingScreen>;
  }

  if (open) {
    return (
      <SearchBox
        onClick={searchBooks}
        handleClose={handleClose}
        setValue={setValue}
        onChange={searchBooksByCategory}
      ></SearchBox>
    );
  }

  return (
    <>
      <SearchForm setOpen={setOpen}></SearchForm>
      <Divider />
      <BoxLayout>
        <GridLayout GridItems={displayBooks}>
          <BookCard displayContext={true} />
        </GridLayout>
      </BoxLayout>
    </>
  );
};
