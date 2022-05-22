import { useState, useEffect } from "react";
import "./book.css";
import Quagga from "@ericblade/quagga2";
import axios from "axios";
import { Header } from "../organisms/Header";
import { Box, Button, Divider, Typography } from "@mui/material";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import UUID from "uuidjs";

export const BookRegister = () => {
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

  useEffect(() => {
    status && getBookInformation(barcode);
  }, [status]);

  const getBookInformation = async (isbn: string) => {
    const param = {
      isbn: isbn,
    };
    if (status) {
      await axios
        .get(
          "https://9qnebu8p5e.execute-api.ap-northeast-1.amazonaws.com/default/LibraryApp/search_books",
          { params: param }
        )
        .then((res) => {
          setStatus(true);
        })
        .catch((err) => {
          console.log(err);
          setStatus(true);
        });
    }
  };

  const test = async () => {
    // パソコンでバーコードをなぜか読めないため、ボタンを設置した
    // let isbn = "9784815610722"; //じゃけぇさんのほん
    let isbn = "9784480432933"; //横井さんの本
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

        {status && (
          <>
            <Typography>取得した情報</Typography>
            <Divider />
            <Card sx={{ display: "flex", marginTop: "1em" }}>
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                src={books.url}
                alt="本の画像"
              />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography sx={{ fontSize: "8px" }} component="div">
                    {books.title}
                  </Typography>
                  <Typography
                    sx={{ fontSize: "8px" }}
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    {books.author}
                  </Typography>
                </CardContent>
                <Box
                  sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                ></Box>
              </Box>
            </Card>
          </>
        )}
        <Box sx={{ textAlign: "right", marginTop: "1em" }}>
          <Button sx={{ marginRight: "5px" }} variant="contained">
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
