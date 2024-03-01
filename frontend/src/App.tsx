import React from "react";
import "./style.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Page404 from "./pages/Page404";
import { UserContext } from "./context/UserContextProvider";
import { useContext, useEffect, useState } from "react";
import PathConstants from "./routes/PathConstants";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ProfileUpdate from "./pages/ProfileUpdate";

// const Home = React.lazy(() => import("./pages/Home"));
// const LoginPage = React.lazy(() => import("./pages/LoginPage"));
// const RegistrationPage = React.lazy(() => import("./pages/RegistrationPage"));
// const ProfileUpdate = React.lazy(() => import("./pages/ProfileUpdate"));



function App() {
  const { user } = useContext(UserContext);
  // const [isLoading, setIsLoading] = useState(true);


  const router = createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <Page404 />,
      children: [
        user ? { path: PathConstants.HOME, element: <Home /> } : { path: PathConstants.HOME, element: <LoginPage /> },
        { path: PathConstants.REGISTER, element: <RegistrationPage /> },
        { path: PathConstants.PROFILE_UPDATE, element: <ProfileUpdate /> },
      ],
    }
  ]);

  return (
    <div className="relative flex">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
