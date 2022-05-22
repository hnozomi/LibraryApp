import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Admin } from "../components/pages/Admin";
import { BookRegister } from "../components/pages/BookRegister";
import { Home } from "../components/pages/Home";
import { Login } from "../components/pages/Login";
import { Signup } from "../components/pages/Signup";
import { Toppage } from "../components/pages/Toppage";
import { AuthProvider } from "../provider/LoginUserProvider";

export const Router: FC = () => {
  console.log("Router実行");
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Toppage />} />
        </Routes>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
        <Routes>
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Routes>
          <Route path="/home" element={<Home />} />
        </Routes>
        <Routes>
          <Route path="/home/admin" element={<Admin />} />
        </Routes>
        <Routes>
          <Route path="/home/admin/bookregster/" element={<BookRegister />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};
