// import React from "react";
// import PathConstants from "./PathConstants";

// const Home = React.lazy(() => import("../pages/Home"));
// const LoginForm = React.lazy(() => import("../pages/LoginForm"));
// const RegistrationForm = React.lazy(() => import("../pages/RegistrationForm"));
// const Discover = React.lazy(() => import("../pages/Discover"));

// const routes = [
//   { path: PathConstants.HOME, element: <Home /> },
//   { path: PathConstants.REGISTER, element: <RegistrationForm /> },
//   { path: PathConstants.LOGIN, element: <LoginForm onLoginSuccess={function (): void {
//     throw new Error("Function not implemented.");
//   } } /> },
//   { path: PathConstants.DISCOVER, element: <Discover /> }
// ];
// export default routes;


import React from "react";
import PathConstants from "./PathConstants";
import RegistrationForm from "../pages/RegistrationForm";
import LoginForm from "../pages/LoginForm";
import Home from "../pages/Home";
import Discover from "../pages/Discover";

const routes = [
  { path: PathConstants.HOME, element: <Home /> },
  { path: PathConstants.REGISTER, element: <RegistrationForm formData={{ email: "", first_name: "", last_name: "", password: "" }} handleChange={() => {}} handleSubmit={() => {}} /> },
  { path: PathConstants.LOGIN, element: <LoginForm formData={{ email: "", password: "" }} handleChange={() => {}} handleSubmit={() => {}} /> },
  { path: PathConstants.DISCOVER, element: <Discover /> }
];
export default routes;
