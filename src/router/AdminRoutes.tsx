import { ReactNode, FC, memo, useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import AuthContext from "../provider/LoginUserProvider";

type Props = {
  children: ReactNode;
};

export const AdminRoutes: FC<Props> = memo((props) => {
  console.log("AdminRoutes実行");
  const { children } = props;
  const { userinfo } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    userinfo!.role !== "admin" && navigate("/home");
  }, [userinfo!.role]);

  return <>{children}</>;
});
