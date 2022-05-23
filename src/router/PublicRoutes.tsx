import { FC } from "react";
import { ReactNode } from "react";
import { memo, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../provider/LoginUserProvider";

type Props = {
  children: ReactNode;
};

export const PublicRoutes: FC<Props> = memo((props) => {
  const { children } = props;
  const { userinfo } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    userinfo && navigate("/home");
  }, [userinfo]);

  return <>{children}</>;
});
