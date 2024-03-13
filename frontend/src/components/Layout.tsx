import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Loader from "./Loader";
import { NotificationModal } from "./NotificationModal";
import { NotificationContext } from "../context/NotificationContextProvider";

export default function Layout() {
  const { notification, setNotification } = useContext(NotificationContext);

  return (
    <div className="flex-1 flex flex-col">
      <main>
        <Suspense fallback={<Loader title={"Loading..."} />}>
          <Outlet />
        </Suspense>
        <NotificationModal
          text={notification?.text}
          success={notification?.success}
          setNotification={setNotification}
        />
      </main>
    </div>
  );
}
