import { FC, ReactNode, memo, useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import AuthContext from "../provider/LoginUserProvider";

type Props = {
  children: ReactNode;
};

export const PublicRoutes: FC<Props> = memo((props) => {
  console.log("PublicRoutes実行");
  const { children } = props;
  const { userinfo, uid } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    userinfo && navigate("/home");
  }, [userinfo]);

  return <>{children}</>;
});
