import { Typography } from "@mui/material";

import { ProductHeroLayout } from "../../layout/ProductHeroLayout";
import { ProductValues } from "../../organisms/ProductValues";
import { Copyright } from "../../organisms/Copyright";
import { ToppageHeader } from "../../organisms/ToppageHeader";

export const Toppage = () => {
  console.log("Toppage実行");

  const backgroundImage = "/ugur-akdemir-XT-o5O458as-unsplash.jpg";

  return (
    <>
      <ToppageHeader />
      <ProductHeroLayout
        sxBackground={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: "center",
        }}
      >
        <Typography color="inherit" sx={{ alignItems: "center" }} variant="h4">
          書籍を貸し出すサイト
        </Typography>
        <Typography
          color="inherit"
          align="center"
          variant="h6"
          sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
        >
          {`家にある本を知り合いが予約して借りることができる  `}
        </Typography>
        <Typography color="inherit" align="center" variant="h6">
          {`(勉強の一貫で作ったサイトのため、貸し出しは実施していません)`}
        </Typography>
      </ProductHeroLayout>
      <ProductValues />
      <Copyright sx={{ my: 5 }} />
    </>
  );
};
