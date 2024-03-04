import React from "react"
import { useLoaderData, useNavigation } from "react-router-dom"
import Home from "./Home";
import Login from "./LoginPage";
import Loader from "../components/Loader";

const BASE_URL="http://127.0.0.1:8000"

function MainPage() {
    const { state } = useNavigation();
    const loaderData = useLoaderData() as { user: object | null } | null;
    const user = loaderData ? loaderData.user : null;
    const isLoading = state === "loading";

    if (isLoading) return <Loader title={"Loading"} />

    return (user && !isLoading ? <Home /> : <Login />)
}

async function loader({ request: { signal }} : { request: { signal: AbortSignal } }) {
    try {
        const response = await fetch(`${BASE_URL}/api/user/get`, {
          signal,
          credentials: "include",
        });

        if (response.status !== 200) {
          return null;
        }

        const data = await response.json();
        
        return { user : data.user };
    } catch (error: any) {
        if (error.name === "AbortError") {
          return;
        }
        return null;
    }
}

export const mainPageRoute = {
    element: <MainPage />,
    loader,
}