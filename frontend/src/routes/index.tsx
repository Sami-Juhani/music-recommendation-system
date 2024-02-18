import React from "react";
import PathConstants from "./PathConstants";
import useRegistration from "../hooks/useRegistration";
import useLogin from "../hooks/useLogin";

const Home = React.lazy(() => import("../pages/Home"));
const LoginForm = React.lazy(() => import("../pages/LoginForm"));
const RegistrationForm = React.lazy(() => import("../pages/RegistrationForm"));
const Discover = React.lazy(() => import("../pages/Discover"));

const routes = [
  { path: PathConstants.HOME, element: <Home /> },
  { path: PathConstants.REGISTER, element: <RegistrationForm useRegistration={useRegistration}  /> },
  { path: PathConstants.LOGIN, element: <LoginForm useLogin={useLogin} /> },
  { path: PathConstants.DISCOVER, element: <Discover /> }
];
export default routes;
