import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import "tailwindcss/tailwind.css";
import App from "./App";
import { MusicGetAllContextProvider } from "./context/MusicGetAllContext";
import { UserContextProvider } from "./context/UserContextProvider";
import { PlaylistsGetAllContextProvider } from "./context/PlaylistsGetAllContext";
import { PlaylistGetContextProvider } from "./context/PlaylistGetContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <UserContextProvider>
      <MusicGetAllContextProvider>
        <PlaylistsGetAllContextProvider>
          <PlaylistGetContextProvider>
            <App />
          </PlaylistGetContextProvider>
        </PlaylistsGetAllContextProvider>
      </MusicGetAllContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
