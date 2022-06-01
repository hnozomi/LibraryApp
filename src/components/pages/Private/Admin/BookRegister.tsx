import { FC, memo, useState } from "react";
import axios from "axios";
import Quagga from "@ericblade/quagga2";
import {
  Box,
  Button,
  Typography,
  Dialog,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
} from "@mui/material";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import UUID from "uuidjs";

import "./book.css";

import { usePageTransition } from "../../../../hooks/usePageTransition";
import { BoxLayout, ButtonLayout } from "../../../layout/BoxLayout";

type Book = {
  title: string;
  author: string;
  category: [];
  url: string;
};

export const BookRegister: FC = memo(() => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(false);
  const [barcode, setBarcode] = useState("");
  const [startStatus, setStartStatus] = useState(false);
  const [stopStatus, setStopStatus] = useState(true);
  const [books, setbooks] = useState<Book>({
    title: "",
    author: "",
    category: [],
    url: "",
  });
  const [category, setCategory] = useState("");
  const { pageTransition } = usePageTransition();

  const searchBooks = async (isbn: string) => {
    const param = {
      isbn: isbn,
    };

    await axios
      .get(
        "https://9qnebu8p5e.execute-api.ap-northeast-1.amazonaws.com/default/LibraryApp/search_books",
        { params: param }
      )
      .then((res) => {
        console.log(res.data);
        setbooks({
          ...books,
          title: res.data[0],
          author: res.data[1],
          category: res.data[2],
          url: res.data[4],
        });
        setOpen(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const options = {
    headers: { "Content-Type": "text/plain" },
  };

  const insertBooksTable = async () => {
    const ID = UUID.generate();
    await axios
      .post(
        "https://9qnebu8p5e.execute-api.ap-northeast-1.amazonaws.com/default/LibraryApp/insert_books",
        {
          book_id: ID,
          title: books.title,
          author: books.author,
          category: category,
          image_url: books.url,
        },
        options
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setStatus(true);
        setOpen(false);
      });
  };

  Quagga.onDetected((result) => {
    if (result !== undefined) {
      if (result.codeResult.code !== null) {
        const init = result.codeResult.code.slice(0, 3);
        if (init === "978" && status === false) {
          Quagga.stop();
          // setStatus(true);
          searchBooks(result.codeResult.code);
          // setBarcode(result.codeResult.code);
        }
      }
    }
  });

  const onStart = () => {
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: "#preview", // Or '#yourElement' (optional)
        },
        decoder: {
          readers: ["ean_reader"],
        },
      },
      function (err: any) {
        if (err) {
          console.log(err);
          return;
        }
        Quagga.start();
      }
    );
    setStartStatus(true);
    setStopStatus(false);
  };

  const onStop = () => {
    setStartStatus(false);
    setStopStatus(true);
    Quagga.stop();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (data: string) => {
    console.log(data);
    setCategory(data);
  };

  if (open) {
    return (
      <Dialog open={open} onClose={handleClose}>
        <Card sx={{ height: "500px", width: "100%" }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="280"
              src={books.url}
              // src={book.image_url}
              alt="green iguana"
              sx={{ objectFit: "fill" }}
            />
            <CardContent>
              <Typography gutterBottom component="p" sx={{ fontSize: "12px" }}>
                {books.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: "12px" }}
              >
                {books.author}
              </Typography>
              <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                {books.category.length !== 0 &&
                  books.category.map((data) => (
                    <FormControlLabel
                      value={data}
                      control={<Radio />}
                      label={data}
                      onChange={() => handleChange(data)}
                    />
                  ))}
              </RadioGroup>
              <CardContent>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: "10px" }}
                >
                  {"↑上記の登録を行います"}
                </Typography>
              </CardContent>
            </CardContent>
          </CardActionArea>
        </Card>
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", padding: "0.6em" }}
        >
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{ marginRight: "0.4em" }}
          >
            キャンセル
          </Button>
          <Button onClick={insertBooksTable} variant="outlined">
            登録
          </Button>
        </Box>
      </Dialog>
    );
  }

  return (
    <>
      {/* <Box
        sx={{
          width: "80%",
          margin: "0 auto",
          textAlign: "center",
          marginTop: "2em",
        }}
      > */}
      <BoxLayout>
        <div>バーコードをスキャンしてください</div>
        <Button disabled={startStatus} onClick={onStart}>
          START
        </Button>
        <Button disabled={stopStatus} onClick={onStop}>
          STOP
        </Button>
        {status ? (
          <Box sx={{ width: "100%", height: "300px" }}>
            <Typography>登録が完了しました</Typography>
          </Box>
        ) : (
          <div id="preview"></div>
        )}
        <ButtonLayout>
          <Button
            onClick={() => pageTransition("/home/admin")}
            sx={{ marginRight: "5px" }}
            variant="contained"
          >
            キャンセル
          </Button>
          <Button onClick={insertBooksTable} variant="contained">
            登録
          </Button>
          {/* <Button onClick={test} variant="contained">
            テスト
          </Button> */}
        </ButtonLayout>
      </BoxLayout>
      {/* </Box> */}
    </>
  );
});
