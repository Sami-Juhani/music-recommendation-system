import React from "react";
import PathConstants from "./PathConstants";

const Home = React.lazy(() => import("../pages/Home"));
const LoginForm = React.lazy(() => import("../pages/LoginForm"));
const RegistrationForm = React.lazy(() => import("../pages/RegistrationForm"));
const Discover = React.lazy(() => import("../pages/Discover"));

const routes = [
  { path: PathConstants.HOME, element: <Home /> },
  { path: PathConstants.REGISTER, element: <RegistrationForm /> },
  { path: PathConstants.LOGIN, element: <LoginForm /> },
  { path: PathConstants.DISCOVER, element: <Discover /> }
];
export default routes;
