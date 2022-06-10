import axios from "axios";

import { auth } from "../lib/Firebase/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { usePageTransition } from "../../src/hooks/usePageTransition";

export const useAuth = () => {
  const { pageTransition } = usePageTransition();

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      return {
        open: false,
        status: "login_success",
        message: "ログインに成功しました",
      };
    } catch (error) {
      return {
        open: true,
        status: "error",
        message: "ログインに失敗しました",
      };
    }
  };

  const signup = async (email: string, password: string) => {
    const options = {
      headers: { "Content-Type": "text/plain" },
    };

    try {
      const firebaseUserId = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await axios.post(
        "https://9qnebu8p5e.execute-api.ap-northeast-1.amazonaws.com/default/LibraryApp/signup_user",
        {
          user_id: firebaseUserId.user.uid,
        },
        options
      );

      return {
        open: false,
        status: "signup_success",
        message: "登録に成功しました",
      };
    } catch (error: any) {
      switch (error.code) {
        case "auth/email-already-in-use":
          return {
            open: true,
            status: "error",
            message: "すでにメールアドレスが存在します",
          };

        case "auth/invalid-email":
          return {
            open: true,
            status: "error",
            message: "メールアドレスの形式が間違っています",
          };
        case "auth/weak-password":
          return {
            open: true,
            status: "error",
            message: "パスワードは6桁以上にしてください",
          };
        default:
          return {
            open: true,
            status: "error",
            message: "登録に失敗しました",
          };
      }
    }
  };

  const signout = async () => {
    await signOut(auth).then(() => {
      pageTransition("/login");
    });
  };

  return { login, signup, signout };
};

// ログインした後、homeに移動するがまだユーザー情報が取得できていなくて、Routingによりトップページに戻される
// しかし、数秒後ユーザーの情報が取得できてルーティングする
