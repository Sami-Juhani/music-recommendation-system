import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import "tailwindcss/tailwind.css";
import App from "./App";
import { MusicGetAllContextProvider } from "./context/MusicGetAllContext";
import { UserContextProvider } from "./context/UserContextProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <UserContextProvider>
      <MusicGetAllContextProvider>
        <App />
      </MusicGetAllContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
