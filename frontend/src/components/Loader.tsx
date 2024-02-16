import React from "react";
import TenorGifEmbed from "../assets/TenorGifEmbed";

const Loader = ({ title }: { title: any}) => {
    return (
        <div className="w-full flex justify-center items-center flex-col">
            <TenorGifEmbed postId="24483754" />
            <h1 className="font-bold text-2xl text-white mt-2">{title || "Loading..."}</h1>
        </div>);
};

export default Loader;