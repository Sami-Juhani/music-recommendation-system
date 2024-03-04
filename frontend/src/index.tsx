import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import "tailwindcss/tailwind.css";
import App from "./App";
import { MusicGetAllContextProvider } from "./context/MusicGetAllContext";
import { UserContextProvider } from "./context/UserContextProvider";
import { PlaylistsGetAllContextProvider } from "./context/PlaylistsGetAllContext";
import { PlaylistGetContextProvider } from "./context/PlaylistGetContext";
import { GeneratedContextProvider } from "./context/GeneratedContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <UserContextProvider>
      <MusicGetAllContextProvider>
        <PlaylistsGetAllContextProvider>
          <PlaylistGetContextProvider>
            <GeneratedContextProvider>
              <App />
            </GeneratedContextProvider>
          </PlaylistGetContextProvider>
        </PlaylistsGetAllContextProvider>
      </MusicGetAllContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
