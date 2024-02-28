import React from "react";
import PathConstants from "./PathConstants";

const Home = React.lazy(() => import("../pages/Home"));
const LoginPage = React.lazy(() => import("../pages/LoginPage"));
const RegistrationPage = React.lazy(() => import("../pages/RegistrationPage"));
const Discover = React.lazy(() => import("../pages/Discover"));
const ProfileUpdate = React.lazy(() => import("../pages/ProfileUpdate"));

const routes = [
  { path: PathConstants.HOME, element: <Home /> },
  { path: PathConstants.REGISTER, element: <RegistrationPage /> },
  { path: PathConstants.LOGIN, element: <LoginPage /> },
  { path: PathConstants.DISCOVER, element: <Discover /> },
  { path: PathConstants.PROFILE_UPDATE, element: <ProfileUpdate /> },
];
export default routes;