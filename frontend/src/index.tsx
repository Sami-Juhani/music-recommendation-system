import "./style.css";
import "tailwindcss/tailwind.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { MusicGetAllContextProvider } from "./context/MusicGetAllContext";
import { UserContextProvider } from "./context/UserContextProvider";
import { PlaylistsGetAllContextProvider } from "./context/PlaylistsGetAllContext";
import { PlaylistGetContextProvider } from "./context/PlaylistGetContext";
import { GeneratedContextProvider } from "./context/GeneratedContext";
import { NotificationContextProvider } from "./context/NotificationContextProvider";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "./langLocalization/i18n";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <NotificationContextProvider>
      <UserContextProvider>
        <MusicGetAllContextProvider>
          <PlaylistsGetAllContextProvider>
            <PlaylistGetContextProvider>
              <GeneratedContextProvider>
                <div className="relative flex">
                  <RouterProvider router={router} />
                </div>
              </GeneratedContextProvider>
            </PlaylistGetContextProvider>
          </PlaylistsGetAllContextProvider>
        </MusicGetAllContextProvider>
      </UserContextProvider>
    </NotificationContextProvider>
  </React.StrictMode>
);
