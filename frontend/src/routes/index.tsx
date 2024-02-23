import React from "react";
import PathConstants from "./PathConstants";

const Home = React.lazy(() => import("../pages/Home"));
const LoginForm = React.lazy(() => import("../pages/LoginForm"));
const Logout = React.lazy(() => import("../pages/Logout"));
const RegistrationForm = React.lazy(() => import("../pages/RegistrationForm"));
const Discover = React.lazy(() => import("../pages/Discover"));
const ProfileUpdate = React.lazy(() => import("../pages/ProfileUpdate"));

const routes = [
  { path: PathConstants.HOME, element: <Home /> },
  { path: PathConstants.REGISTER, element: <RegistrationForm /> },
  { path: PathConstants.LOGIN, element: <LoginForm /> },
  { path: PathConstants.LOGOUT, element: <Logout />},
  { path: PathConstants.DISCOVER, element: <Discover /> },
  { path: PathConstants.PROFILE_UPDATE, element: <ProfileUpdate /> },
];
export default routes;
