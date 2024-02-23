// ./src/components/Layout.js
import { useState, createContext, useEffect } from "react"
import { Outlet } from "react-router-dom"
import Nav from "./Nav"
import { Suspense } from "react"
import Loader from "./Loader"
import React from "react"

export type userProps = {
    user?: object,
    setUser: React.Dispatch<React.SetStateAction<object | undefined>>
}

export const UserContext = createContext<userProps>({
    user: undefined,
    setUser: () => {}
});

export default function Layout() {
    const [user, setUser] = useState<object>();

    useEffect(() => {
        console.log(user)
    }, [user])

    return (
        <UserContext.Provider value={{user, setUser}}>
        <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#c51bce]">
            <Nav />
            <main>
                <Suspense fallback={<Loader title={"Loading..."}/>}>
                    <Outlet />
                </Suspense>
            </main>
        </div>
        </UserContext.Provider>
    )
}