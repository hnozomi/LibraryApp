import { FC, ReactNode, memo, useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { Header } from "../../src/components/organisms/Header";
import AuthContext from "../provider/LoginUserProvider";
import { BookProvider } from "../provider/BookInformationProvider";

type Props = {
  children: ReactNode;
};

export const PrivateRoutes: FC<Props> = memo((props) => {
  console.log("PrivateRoutes実行");
  const { children } = props;
  const { userinfo, uid } = useContext(AuthContext);
  console.log(userinfo);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(userinfo);
    userinfo === null && navigate("/");
  }, [userinfo]);

  return (
    <BookProvider>
      <Header></Header>
      {children}
    </BookProvider>
  );
});
