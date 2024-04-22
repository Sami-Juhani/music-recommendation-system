import React from "react";
import PathConstants from "./PathConstants";

const Home = React.lazy(() => import("../pages/Home"));
const LoginPage = React.lazy(() => import("../pages/LoginPage"));
const ProfileUpdate = React.lazy(() => import("../pages/ProfileUpdate"));


const routes = [
  { path: PathConstants.HOME, element: <Home /> },
  { path: PathConstants.LOGIN, element: <LoginPage /> },
  { path: PathConstants.PROFILE_UPDATE, element: <ProfileUpdate /> },
];
export default routes;