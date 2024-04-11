import React, { useEffect, useState, createContext } from "react";
import { UserContextType } from "../types/UserContextType";
import { UserType } from "../types/UserType";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const UserContext = createContext<UserContextType>({
  user: undefined,
  setUser: () => {},
  children: undefined,
});

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
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
        console.log(data.user)

        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
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
    <UserContext.Provider value={{ user: user as UserType, setUser, children }}>
      {children}
    </UserContext.Provider>
  );
}
