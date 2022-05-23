import { ReactNode } from "react";
import { FC } from "react";
import { memo, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../provider/LoginUserProvider";

type Props = {
  children: ReactNode;
};

export const PrivateRoutes: FC<Props> = memo((props: any) => {
  const { children } = props;
  const { userinfo } = useContext(AuthContext);
  console.log(userinfo);
  const navigate = useNavigate();

  useEffect(() => {
    !userinfo && navigate("/");
  }, [userinfo]);

  return <>{children}</>;
});
