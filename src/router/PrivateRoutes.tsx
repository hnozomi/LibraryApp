import { ReactNode } from "react";
import { FC } from "react";
import { memo, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../provider/LoginUserProvider";
import { BookProvider } from "../provider/BookInformationProvider";

type Props = {
  children: ReactNode;
};

export const PrivateRoutes: FC<Props> = memo((props: any) => {
  const { children } = props;
  const {
    userinfo: { user_id },
  } = useContext(AuthContext);
  console.log(user_id);
  const navigate = useNavigate();

  useEffect(() => {
    user_id === "" && navigate("/");
  }, [user_id]);

  return <BookProvider>{children}</BookProvider>;
});
