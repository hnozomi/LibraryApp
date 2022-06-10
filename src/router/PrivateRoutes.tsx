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
  const {
    userinfo: { user_id },
  } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user_id);
    user_id === "" && navigate("/");
  }, [user_id]);

  return (
    <BookProvider>
      <Header></Header>
      {children}
    </BookProvider>
  );
});
