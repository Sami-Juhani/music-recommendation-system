import React from "react";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Loader from "./Loader";
import { useTranslation } from "react-i18next";

export default function Layout() {
  const { t } = useTranslation();

  return (
    <>
      <Suspense fallback={<Loader title={t("layout.loading")} />}>
        <Outlet />
      </Suspense>
    </>
  );
}
