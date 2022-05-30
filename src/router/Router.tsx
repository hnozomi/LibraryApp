import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AdminRoutes } from "./AdminRoutes";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";

import { Achievement } from "../components/pages/Private/Achievement";
import { Admin } from "../components/pages/Private/Admin/Admin";
import { BookContents } from "../components/pages/Private/BookContents";
import { BookDelete } from "../components/pages/Private/Admin/BookDelete";
import { BookRegister } from "../components/pages/Private/Admin/BookRegister";
import { Home } from "../components/pages/Private/Home";
import { Login } from "../components/pages/Public/Login";
import { Mypage } from "../components/pages/Private/Mypage";
import { ReviewForm } from "../components/pages/Private/ReviewForm";
import { RoleChange } from "../components/pages/Private/Admin/RoleChange";
import { Signup } from "../components/pages/Public/Signup";
import { Toppage } from "../components/pages/Public/Toppage";
import { AuthProvider } from "../provider/LoginUserProvider";

export const Router: FC = () => {
  console.log("Router実行");
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoutes>
                <Toppage />
              </PublicRoutes>
            }
          />

          <Route
            path="/login"
            element={
              <PublicRoutes>
                <Login />
              </PublicRoutes>
            }
          />

          <Route
            path="/signup"
            element={
              <PublicRoutes>
                <Signup />
              </PublicRoutes>
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoutes>
                <Home />
              </PrivateRoutes>
            }
          />
          <Route
            path="/home/bookcontext"
            element={
              <PrivateRoutes>
                <BookContents />
              </PrivateRoutes>
            }
          />
          <Route
            path="/home/mypage"
            element={
              <PrivateRoutes>
                <Mypage />
              </PrivateRoutes>
            }
          />
          <Route
            path="/home/mypage/booklist"
            element={
              <PrivateRoutes>
                <Achievement />
              </PrivateRoutes>
            }
          />
          <Route
            path="/home/mypage/reviewform"
            element={
              <PrivateRoutes>
                <ReviewForm />
              </PrivateRoutes>
            }
          />

          <Route
            path="/home/admin"
            element={
              <PrivateRoutes>
                <AdminRoutes>
                  <Admin />
                </AdminRoutes>
              </PrivateRoutes>
            }
          />

          <Route
            path="/home/admin/bookregister/"
            element={
              <PrivateRoutes>
                <AdminRoutes>
                  <BookRegister />
                </AdminRoutes>
              </PrivateRoutes>
            }
          />
          <Route
            path="/home/admin/bookdelete/"
            element={
              <PrivateRoutes>
                <AdminRoutes>
                  <BookDelete />
                </AdminRoutes>
              </PrivateRoutes>
            }
          />
          <Route
            path="/home/admin/rolechange/"
            element={
              <PrivateRoutes>
                <AdminRoutes>
                  <RoleChange />
                </AdminRoutes>
              </PrivateRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};
