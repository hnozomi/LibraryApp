import { FC, ReactNode, memo, useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import AuthContext from "../provider/LoginUserProvider";

type Props = {
  children: ReactNode;
};

export const PublicRoutes: FC<Props> = memo((props) => {
  console.log("PublicRoutes実行");
  const { children } = props;
  const {
    userinfo: { user_id },
  } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    user_id && navigate("/home");
  }, [user_id]);

  return <>{children}</>;
});
