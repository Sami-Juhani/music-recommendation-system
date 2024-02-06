import React from "react";
import PathConstants from "./PathConstants";

const Home = React.lazy(() => import("../pages/Home"));
const LogIn = React.lazy(() => import("../pages/LogIn"));
const UserRegister = React.lazy(() => import("../pages/UserRegister"));

const routes = [
  { path: PathConstants.HOME, element: <Home /> },
  { path: PathConstants.REGISTER, element: <UserRegister /> },
  { path: PathConstants.LOGIN, element: <LogIn /> }
];
export default routes;
