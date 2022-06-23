import { createContext, ReactNode, useEffect, useState } from "react";

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

export type LoginUserContextType = {
  userinfo: UserType | null;
  setUserInfo: any;
};

export const AuthContext = createContext<LoginUserContextType>(
  {} as LoginUserContextType
);

type Props = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  console.log("AuthProvider実行");
  const [userinfo, setUserInfo] = useState<UserType | null>(null);
  const [screenLoading, setScreenLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, async (user: any) => {
      if (user) {
        await checkUser(user);
      } else {
        setUserInfo(null);
      }
      setScreenLoading(false);
    });
  }, []);

  const checkUser = async (user: any) => {
    const querySnapshot = await queryUserInfo(user);

    if (querySnapshot.empty) {
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
      console.log(doc.id);
      let userinfo: any = doc.data();
      userinfo.documentId = doc.id;
      setUserInfo(userinfo);
    });
  };

  return (
    <AuthContext.Provider
      value={{
        userinfo,
        setUserInfo,
      }}
    >
      {!screenLoading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
