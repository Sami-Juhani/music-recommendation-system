import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Loader from "./Loader";
import { NotificationModal } from "./NotificationModal";
import { NotificationContext } from "../context/NotificationContextProvider";
import { useTranslation } from "react-i18next";

export default function Layout() {
  const { t } = useTranslation();
  const { notification, setNotification } = useContext(NotificationContext);
  const [t] = useTranslation();

  return (
    <div className="flex-1 flex flex-col">
      <main>
        <Suspense fallback={<Loader title={t('layout.loading')} />}>
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
