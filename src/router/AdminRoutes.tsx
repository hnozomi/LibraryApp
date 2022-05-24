import { FC } from "react";
import { ReactNode } from "react";
import { memo, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../provider/LoginUserProvider";

type Props = {
  children: ReactNode;
};

export const AdminRoutes: FC<Props> = memo((props) => {
  const { children } = props;
  const {
    userinfo: { role },
  } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    role !== "admin" && navigate("/home");
  }, [role]);

  return <>{children}</>;
});
