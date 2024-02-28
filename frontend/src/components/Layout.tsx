// ./src/components/Layout.js
import React, { useState, createContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import { Suspense } from "react";
import Loader from "./Loader";

const BASE_URL = "http://127.0.0.1:8000";

export type userProps = {
  user?: object;
  setUser: React.Dispatch<React.SetStateAction<object | undefined>>;
};

export const UserContext = createContext<userProps>({
  user: undefined,
  setUser: () => {},
});

export default function Layout() {

  const [user, setUser] = useState<object | undefined>(undefined);

  useEffect(() => {
    const controller = new AbortController();
    
    const getUser = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/user/get`, {
          signal: controller.signal,
          credentials: "include",
        });

        if (response.status !== 200) {
          return;
        }

        const data = await response.json();
        setUser(data.user);
      } catch (error: any) {
        if (error.name === "AbortError") {
          return;
        }
        console.error(error);
      }
    };

    getUser();

    return () => controller.abort();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser: setUser }}>
      <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#c51bce]">
        <Nav />
        <main>
          <Suspense fallback={<Loader title={"Loading..."} />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </UserContext.Provider>
  );
}
