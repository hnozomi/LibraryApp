import { createContext, ReactNode, useEffect, useState } from "react";

import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";

import {
  auth,
  db,
  collection,
  getDocs,
  addDoc,
  query,
  where,
} from "../lib/Firebase/firebase";
import { UserType } from "../types/types";
import { AccessAlarm } from "@mui/icons-material";

export type LoginUserContextType = {
  userinfo: UserType | null;
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
  const [test, setTest] = useState<any>();

  useEffect(() => {
    console.log("AuthProviderのuseEffect実行");
    console.log("Provider実行");

    const unsub = onAuthStateChanged(auth, async (user: any) => {
      // console.log(user, "外");
      if (user) {
        await checkUser(user);
      } else {
        setUserInfo(null);
      }

      // user?.uid ? await getUserInfo(user) : setUserInfo(null);
      setScreenLoading(false);
    });
  }, []);

  const checkUser = async (user: any) => {
    const querySnapshot = await queryUserInfo(user);

    if (querySnapshot.empty) {
      console.log("存在しません");
      await addDoc(collection(db, "users"), {
        user_id: user.uid,
        username: "名無し",
        icon: "https://",
        role: "readonly",
      }).then(async () => {
        const querySnapshot = await queryUserInfo(user);

        await getUserInfo(querySnapshot);
      });
    } else {
      console.log("存在します");

      await getUserInfo(querySnapshot);
    }
  };

  const queryUserInfo = async (user: any) => {
    const queryResult = query(
      collection(db, "users"),
      where("user_id", "==", user.uid)
    );
    const querySnapshot = await getDocs(queryResult);
    return querySnapshot;
  };

  const getUserInfo = async (querySnapshot: any) => {
    querySnapshot.forEach((doc: any) => {
      const userinfo: any = doc.data();
      setUserInfo(userinfo);
    });
  };

  // const getUserInfo = async (user: any) => {
  //   console.log(user, "getUserInfo");
  //   await axios
  //     .get<UserType>(
  //       "https://9qnebu8p5e.execute-api.ap-northeast-1.amazonaws.com/default/LibraryApp/get_user",
  //       {
  //         params: {
  //           user_id: user?.uid,
  //         },
  //         headers: { "Content-Type": "text/plain" },
  //       }
  //     )
  //     .then((response) => {
  //       setUserInfo(response.data);
  //       setScreenLoading(false);
  //     });
  // };

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
