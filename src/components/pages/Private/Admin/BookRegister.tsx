import { FC, memo, useState } from "react";
import Quagga from "@ericblade/quagga2";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Dialog,
  Typography,
} from "@mui/material";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";

import "./book.css";

import { BoxLayout } from "../../../layout/BoxLayout";
import { LoadingScreen } from "../../../organisms/LoadingScreen";
import { usePostData } from "../../../../hooks/usePostData";
import { useGetData } from "../../../../hooks/usegetData";
import { ResultDialog } from "../../../organisms/ResultDialog";

type Book = {
  title: string;
  author: string;
  category: [];
  image_url: string;
};

export const BookRegister: FC = memo(() => {
  const [open, setOpen] = useState(false);
  const [startStatus, setStartStatus] = useState(false);
  const [stopStatus, setStopStatus] = useState(true);
  const [books, setbooks] = useState<Book>({
    title: "",
    author: "",
    category: [],
    image_url: "",
  });
  const [category, setCategory] = useState("");
  const { insertBooks, postloading, complete, result } = usePostData();
  const { searchBooks } = useGetData();

  Quagga.onDetected(async (result) => {
    let status = false;
    let barcode = await BarcodeDetect(result);

    const init = barcode.slice(0, 3);
    if (init === "978" && status === false) {
      Quagga.stop();

      await executeSearchBook(barcode);

      setStartStatus(false);
      setStopStatus(true);
      setOpen(true);
    }
  });

  const BarcodeDetect = async (result: any) => {
    if (result !== undefined) {
      if (result.codeResult.code !== null) {
        return result.codeResult.code;
      }
    }
  };

  const executeSearchBook = async (barcode: string) => {
    await searchBooks(barcode).then((res) => {
      if (res.bookInfomation !== undefined) {
        setbooks({
          ...books,
          title: res.bookInfomation[0],
          author: res.bookInfomation[1],
          category: res.bookInfomation[2],
          image_url: res.bookInfomation[4],
        });
      }
    });
  };

  // Quagga.onDetected(async (result) => {
  //   if (result !== undefined) {
  //     if (result.codeResult.code !== null) {
  //       const init = result.codeResult.code.slice(0, 3);
  //       if (init === "978" && status === false) {
  //         Quagga.stop();
  //         setStatus(true);
  //         await searchBooks(result.codeResult.code).then((res) => {
  //           if (res.bookInfomation !== undefined) {
  //             setbooks({
  //               ...books,
  //               title: res.bookInfomation[0],
  //               author: res.bookInfomation[1],
  //               category: res.bookInfomation[2],
  //               image_url: res.bookInfomation[4],
  //             });
  //           }
  //         });

  //         setStartStatus(false);
  //         setStopStatus(true);
  //         setStatus(false);
  //         setOpen(true);
  //       }
  //     }
  //   }
  // });

  const onStart = () => {
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: "#preview", // Or '#yourElement' (optional)
        },
        frequency: 3,
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
    // Quagga.stop();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (data: string) => {
    setCategory(data);
  };

  const handleClick = () => {
    if (category) {
      insertBooks(books, category);
      setOpen(false);
      setStartStatus(false);
      setStopStatus(true);
      setCategory("");
    }
  };

  if (postloading) {
    return <LoadingScreen text={"登録中"} />;
  }

  if (open) {
    return (
      <Dialog open={open} onClose={handleClose}>
        <Card sx={{ height: "500px", width: "100%" }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="280"
              src={books.image_url}
              // src={book.image_url}
              alt="書籍の画像"
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
                      key={data}
                      value={data}
                      control={<Radio />}
                      label={data}
                      onChange={() => handleChange(data)}
                    />
                  ))}
              </RadioGroup>
              <CardContent sx={{ p: 0 }}>
                {category.length === 0 && (
                  <Typography sx={{ color: "red", fontSize: "10px" }}>
                    カテゴリを選択してください
                  </Typography>
                )}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: "14px" }}
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
          <Button onClick={() => handleClick()} variant="outlined">
            登録
          </Button>
        </Box>
      </Dialog>
    );
  }

  if (complete) {
    return <ResultDialog result={result}></ResultDialog>;
  }

  return (
    <>
      <BoxLayout>
        <div>バーコードをスキャンしてください</div>
        <Button disabled={startStatus} onClick={onStart}>
          START
        </Button>
        <Button disabled={stopStatus} onClick={onStop}>
          STOP
        </Button>
        <Box id="preview"></Box>
      </BoxLayout>
    </>
  );
});
