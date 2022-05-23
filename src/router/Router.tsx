import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Admin } from "../components/pages/Admin";
import { BookRegister } from "../components/pages/BookRegister";
import { Home } from "../components/pages/Home";
import { Login } from "../components/pages/Login";
import { RoleChange } from "../components/pages/RoleChange";
import { Signup } from "../components/pages/Signup";
import { Toppage } from "../components/pages/Toppage";
import { AuthProvider } from "../provider/LoginUserProvider";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";

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
            path="/home/admin"
            element={
              <PrivateRoutes>
                <Admin />
              </PrivateRoutes>
            }
          />

          <Route
            path="/home/admin/bookregister/"
            element={
              <PrivateRoutes>
                <BookRegister />
              </PrivateRoutes>
            }
          />
          <Route
            path="/home/admin/rolechange/"
            element={
              <PrivateRoutes>
                <RoleChange />
              </PrivateRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};
