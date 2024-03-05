import React from "react"
import { useLoaderData, useNavigation } from "react-router-dom"
import Home from "./Home";
import Login from "./LoginPage";
import Loader from "../components/Loader";
import {loader} from "../utils/loader";



function MainPage() {
    const { state } = useNavigation();
    const loaderData = useLoaderData() as { user: object | null } | null;
    const user = loaderData ? loaderData.user : null;
    const isLoading = state === "loading";

    if (isLoading) return <Loader title={"Loading"} />

    return (user && !isLoading ? <Home /> : <Login />)
}

export const mainPageRoute = {
    element: <MainPage />,
    loader,
}