// ./src/components/Layout.js
import React from "react";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Loader from "./Loader";

const BASE_URL = "http://127.0.0.1:8000";

export default function Layout() {
  return (
    <div className="flex-1 flex flex-col">
      <main>
        <Suspense fallback={<Loader title={"Loading..."} />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}
