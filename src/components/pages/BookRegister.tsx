import { useState } from "react";
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
import UUID from "uuidjs";

import "./book.css";

import { Header } from "../organisms/Header";
import { usePageTransition } from "../../hooks/usePageTransition";

export const BookRegister = () => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(false);
  const [barcode, setBarcode] = useState("");
  const [startStatus, setStartStatus] = useState(false);
  const [stopStatus, setStopStatus] = useState(true);
  const [books, setbooks] = useState({
    title: "",
    author: "",
    category: "",
    url: "",
  });
  const { pageTransition } = usePageTransition();

  const test = async () => {
    // パソコンでバーコードをなぜか読めないため、ボタンを設置した
    let isbn = "9784815610722"; //じゃけぇさんのほん
    // let isbn = "9784480432933"; //横井さんの本
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
          url: res.data[3],
        });
        setOpen(true);
        setStatus(true);
      })
      .catch((err) => {
        console.log(err);
        setStatus(true);
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
          category: "janru",
          image_url: books.url,
        },
        options
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  Quagga.onDetected((result) => {
    if (result !== undefined) {
      if (result.codeResult.code !== null) {
        const init = result.codeResult.code.slice(0, 3);
        if (init === "978" && status === false) {
          Quagga.stop();
          setBarcode(result.codeResult.code);
          setStatus(true);
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

  if (open) {
    return (
      <Dialog open={open} onClose={handleClose}>
        <Card sx={{ height: "400px", width: "250px" }}>
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
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: "10px" }}
              >
                {"↑上記の登録を行います"}
              </Typography>
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
          <Button variant="outlined">登録</Button>
        </Box>
      </Dialog>
    );
  }

  return (
    <>
      <Header></Header>
      <Box
        sx={{
          width: "80%",
          margin: "0 auto",
          textAlign: "center",
          marginTop: "2em",
        }}
      >
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
        <Box sx={{ textAlign: "right", marginTop: "1em" }}>
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
          <Button onClick={test} variant="contained">
            テスト
          </Button>
        </Box>
      </Box>
    </>
  );
};
