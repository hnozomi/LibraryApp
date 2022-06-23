import { createContext, ReactNode, useEffect, useState } from "react";

import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../lib/Firebase/firebase";
import { UserType } from "../types/types";

export type LoginUserContextType = {
  userinfo: UserType | null;
  loading: boolean;
  uid: string | undefined;
};

export const AuthContext = createContext<LoginUserContextType>(
  {} as LoginUserContextType
);

type Props = {
  children: ReactNode;
};

// const initialUser = {
//   user_id: "",
//   username: "",
//   icon: "",
//   role: "",
// };

export const AuthProvider = ({ children }: Props) => {
  console.log("AuthProvider実行");
  const [userinfo, setUserInfo] = useState<UserType | null>(null);
  const [screenLoading, setScreenLoading] = useState(true);
  const [loading, setLoading] = useState(true);

  let uid;

  useEffect(() => {
    console.log("AuthProviderのuseEffect実行");
    setLoading(true);
    onAuthStateChanged(auth, async (user: any) => {
      console.log(user);
      user?.uid ? await getUserInfo(user) : setUserInfo(null);
      setScreenLoading(false);
      setLoading(false);
      uid = user?.uid;
    });
  }, []);

  const getUserInfo = async (user: any) => {
    console.log(user);
    await axios
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
        console.log(response.data, "AAAA");
        setUserInfo(response.data);
        setScreenLoading(false);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        userinfo,
        loading,
        uid,
      }}
    >
      {!screenLoading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
