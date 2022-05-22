import { createContext, ReactNode, useEffect, useState } from "react";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/Firebase/firebase";
import { UserType } from "../types/types";

export type LoginUserContextType = {
  userinfo: UserType;
};
console.log("LoginUserProvider実行");

export const AuthContext = createContext<LoginUserContextType>(
  {} as LoginUserContextType
);

type Props = {
  children: ReactNode;
};

const initialUser = {
  user_id: "",
  username: "nozomi",
  icon: "aaa",
  role: "admin",
};

const options: AxiosRequestConfig = {
  headers: { "Content-Type": "text/plain" },
};

export const AuthProvider = ({ children }: Props) => {
  console.log("AuthProvider実行");
  const [userinfo, setUserInfo] = useState<UserType>(initialUser);
  const [screenLoading, setScreenLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, async (user: any) => {
      console.log("providerが実行されました", user);
      user?.uid &&
        (await axios
          .get<UserType>(
            "https://9qnebu8p5e.execute-api.ap-northeast-1.amazonaws.com/default/LibraryApp/get_user",
            {
              params: {
                user_id: user?.uid,
              },
              headers: { "Content-Type": "text/plain" },
            }
          )
          .then((userinfo) => {
            console.log(userinfo);
            // setUserInfo(userinfo);
            setScreenLoading(false);
          }));
      setScreenLoading(false);
    });
  }, []);

  console.log(screenLoading, "screenLoading");
  return (
    <AuthContext.Provider
      value={{
        userinfo,
      }}
    >
      {!screenLoading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
