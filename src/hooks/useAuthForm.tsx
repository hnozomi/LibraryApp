import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { FormNotification } from "../types/review-types";

export const useAuthForm = () => {
  const [open, setOpen] = useState<FormNotification>({
    open: false,
    status: "",
    message: "",
  });

  const navigate = useNavigate();

  const handleClose = () => {
    setOpen({ ...open, open: false });
  };

  const authForm = async (
    e: React.FormEvent<HTMLFormElement>,
    func: (
      email: string,
      password: string
    ) => Promise<{
      open: boolean;
      status: string;
      message: string;
    }>,
    path: string
  ) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const email = data.get("email")?.toString()!;
    const password = data.get("password")?.toString()!;

    const res = await func(email, password);
    setOpen({
      ...open,
      open: res?.open,
      status: res?.status,
      message: res?.message,
    });
    if (res?.status === "login_success") {
      navigate(path);
    } else if (res?.status === "signup_success") {
      navigate(path);
    }
  };

  return { authForm, open, handleClose };
};
