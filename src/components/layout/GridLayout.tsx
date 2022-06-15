import { cloneElement, FC, ReactNode, ReactElement } from "react";
import { Grid } from "@mui/material";
import { BookReservationType, BookType } from "../../types/types";

type Props = {
  GridItems: Array<BookType> | undefined;
  children: ReactElement[] | ReactElement;
};

type State = {
  book: BookType | BookReservationType;
};

export const GridLayout: FC<Props> = (props) => {
  const { GridItems, children } = props;

  //   childrenが2つある場合s
  const AddStatexx = (book: State) => {
    const newProps = { state: book };
    let ClonedElementWithMoreProps;
    if (Array.isArray(children)) {
      ClonedElementWithMoreProps = children.map((child: any) => {
        return cloneElement(child, newProps);
      });
    }

    return <>{ClonedElementWithMoreProps}</>;
  };

  const AddState = (book: State) => {
    let ClonedElementWithMoreProps;

    if (!Array.isArray(children)) {
      ClonedElementWithMoreProps = cloneElement(children, {
        state: book,
      });
    }

    return <>{ClonedElementWithMoreProps}</>;
  };

  return (
    <Grid container spacing={1} sx={{ mt: 1 }}>
      {GridItems?.map((item) => (
        <Grid
          key={item.book_id}
          item
          xs={4}
          sx={{ mb: Array.isArray(children) ? "3em" : "0em" }}
        >
          {/* childrenが2つの場合、配列に含まれる */}
          {Array.isArray(children) ? (
            <AddStatexx book={item}></AddStatexx>
          ) : (
            children && <AddState book={item}></AddState>
          )}
        </Grid>
      ))}
    </Grid>
  );
};
