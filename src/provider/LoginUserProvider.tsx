import { createContext, ReactNode, useEffect, useState } from "react";

import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../lib/Firebase/firebase";
import { UserType } from "../types/types";

export type LoginUserContextType = {
  userinfo: UserType;
};

export const AuthContext = createContext<LoginUserContextType>(
  {} as LoginUserContextType
);

type Props = {
  children: ReactNode;
};

const initialUser = {
  user_id: "",
  username: "",
  icon: "",
  role: "",
};

export const AuthProvider = ({ children }: Props) => {
  console.log("AuthProvider実行");
  const [userinfo, setUserInfo] = useState<UserType>(initialUser);
  const [screenLoading, setScreenLoading] = useState(true);

  useEffect(() => {
    console.log("AuthProviderのuseEffect実行");
    onAuthStateChanged(auth, async (user: any) => {
      user?.uid
        ? await axios
            .get<UserType>(
              "https://9qnebu8p5e.execute-api.ap-northeast-1.amazonaws.com/default/LibraryApp/get_user",
              {
                params: {
                  user_id: user?.uid,
                },
                headers: { "Content-Type": "text/plain" },
              }
            )
            .then((response) => {
              setUserInfo(response.data);
              setScreenLoading(false);
            })
        : setUserInfo(initialUser);
      setScreenLoading(false);
    });
  }, []);

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
