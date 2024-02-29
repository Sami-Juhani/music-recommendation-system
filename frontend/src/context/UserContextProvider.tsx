import React, { useEffect, useState, createContext } from "react";
import { UserContextType } from "../types/UserContextType";

const BASE_URL="http://127.0.0.1:8000"

export const UserContext = createContext<UserContextType>({
  user: undefined,
  setUser: () => {},
  children: undefined,
});

export function UserContextProvider({ children }: { children: React.ReactNode }) {
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
    <UserContext.Provider value={{ user, setUser, children }}>
      {children}
    </UserContext.Provider>
  );
}