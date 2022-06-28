import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import {
  auth,
  db,
  collection,
  getDocs,
  addDoc,
  query,
  where,
  onAuthStateChanged,
} from "../lib/Firebase/firebase";

import { User } from "firebase/auth";
import { DocumentData, QuerySnapshot } from "firebase/firestore";

import { UserType } from "../types/types";

export type LoginUserContextType = {
  userinfo: UserType | null;
  setUserInfo: Dispatch<SetStateAction<UserType | null>>;
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
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        await checkUser(user);
      } else {
        setUserInfo(null);
      }
      setScreenLoading(false);
    });
  }, []);

  const checkUser = async (user: User) => {
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

  const queryUserInfo = async (user: User) => {
    const queryResult = query(
      collection(db, "users"),
      where("user_id", "==", user.uid)
    );
    const querySnapshot = await getDocs(queryResult);
    return querySnapshot;
  };

  const getUserInfo = async (querySnapshot: QuerySnapshot<DocumentData>) => {
    querySnapshot.forEach((doc: DocumentData) => {
      let userinfo: UserType = doc.data();
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
