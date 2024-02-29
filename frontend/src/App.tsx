import React from "react";
import "./style.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";
import Layout from "./components/Layout";
import Page404 from "./pages/Page404";
import { UserContext } from "./context/UserContextProvider";
import { useContext } from "react";
import LoginPage from "./pages/LoginPage";

function App() {

  const { user, setUser } = useContext(UserContext);

  const router = createBrowserRouter([
    {
      element: user ? <Layout /> : <LoginPage />,
      errorElement: <Page404 />,
      children: routes
    }
  ]);

  return (
    <div className="relative flex">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;