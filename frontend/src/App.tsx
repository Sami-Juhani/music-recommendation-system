import React from "react";
import "./style.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Page404 from "./pages/Page404";
import PathConstants from "./routes/PathConstants";
import { RegistrationRoute } from "./pages/RegistrationPage";
import ProfileUpdate from "./pages/ProfileUpdate";
import { mainPageRoute } from "./pages/MainPage";

function App() {
  let BASE_NAME;
  if (process.env.NODE_ENV === "production") {
    BASE_NAME = "/music-recommender";
  } else {
    BASE_NAME = "/";
  }

  const router = createBrowserRouter(
    [
      {
        element: <Layout />,
        children: [
          { index: true, ...mainPageRoute },
          { path: "*", element: <Page404 /> },
          { ...RegistrationRoute },
          { path: PathConstants.PROFILE_UPDATE, element: <ProfileUpdate /> },
        ],
      },
    ],
    {
      basename: BASE_NAME,
    }
  );

  return (
    <div className="relative flex">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
