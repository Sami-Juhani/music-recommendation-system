import React from "react";
import PathConstants from "./PathConstants";

const Home = React.lazy(() => import("../pages/Home"));
const LoginForm = React.lazy(() => import("../pages/LoginForm"));
const RegistrationForm = React.lazy(() => import("../pages/RegistrationForm"));

const routes = [
  { path: PathConstants.HOME, element: <Home /> },
  { path: PathConstants.REGISTER, element: <RegistrationForm /> },
  { path: PathConstants.LOGIN, element: <LoginForm onLoginSuccess={function (): void {
    throw new Error("Function not implemented.");
  } } /> }
];
export default routes;
