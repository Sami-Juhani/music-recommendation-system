// ./src/components/Layout.js

import { Outlet } from "react-router-dom"
import Nav from "./Nav"
import { Suspense } from "react"
import Loader from "./Loader"
import React from "react"


export default function Layout() {
    return (
        <>
            <Nav />
            <main>
                <Suspense fallback={<Loader />}>
                    <Outlet />
                </Suspense>
            </main>
        </>
    )
}