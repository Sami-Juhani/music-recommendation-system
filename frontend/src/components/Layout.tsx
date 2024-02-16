// ./src/components/Layout.js

import { Outlet } from "react-router-dom"
import Nav from "./Nav"
import { Suspense } from "react"
import Loader from "./Loader"
import React from "react"


export default function Layout() {
    return (

        <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#c51bce]">
            <Nav />
            <main>
                <Suspense fallback={<Loader title={"Loading..."}/>}>
                    <Outlet />
                </Suspense>
            </main>
        </div>
    )
}