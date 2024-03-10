import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Error from "../components/Error";
import Loader from "../components/Loader";
import SongCard from "../components/SongCard";
import { genres, song, list } from "../assets/constants";
import { musicExamples } from "../assets/musicExapmles";
import { useMusicGetAllContext } from "../hooks/useMusicGetAllContext";
import { RootState } from "../redux/features/rootReducer";

const Discover = () => {

    //const disp = useDispatch();
    //const { activeSong, isPlaying } = useSelector((state: RootState)=>state.player);
    const activeSong = "";
    const isPlaying = false;
    const [genre, setGenre] = useState("Pop");
    const { music, dispatch } = useMusicGetAllContext();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getMusic = async () => {
            setIsLoading(true); // Start loading
            try {
                const response = await fetch("http://localhost:4000/api/suositukset/");
                const data = await response.json();
                if (!response.ok) {
                    console.log(data.error);
                    dispatch({ type: "SET_MUSIC", payload: [...musicExamples] });
                } else {
                    dispatch({ type: "SET_MUSIC", payload: data });
                }
            } catch (error) {
                console.log(error);
                dispatch({ type: "SET_MUSIC", payload: [...list] });
                setError(true);
            }
            setIsLoading(false);
        };
        getMusic();
    }, [dispatch]);

    if (isLoading) {
        return (
            <div className="flex-1 flex flex-col bg-gradient-to-br">
                <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
                    <div className="flex-1 h-fit pb-40">
                        <Loader title="Loading" />;
                    </div>
                </div>
            </div>);
    };

    // Return when API is ready
    /*if (error) {
        return (
            <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">
                <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
                    <div className="flex-1 h-fit pb-40">
                        <Error />;
                    </div>
                </div>
            </div>);
    };*/

    return (
        <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#c51bce]">
            <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
                <div className="flex-1 h-fit pb-40">
                    <div className="flex flex-col">
                        <div className="w-full flex flex-col justify-center items-center mt-4 mb-10">
                            <h2 className="font-bold text-3xl text-white text-center mb-4">Discover</h2>
                            <select className="max-w-xs bg-black text-gray-300 p-3 text-sm rounded-lg ouline-none sm:mt-5 mt-5"
                                onChange={(newGenre) => { setGenre(newGenre.target.value)}}
                                value={genre}
                            >
                                {genres.map((genre) => <option key={genre.value} value={genre.value}>{genre.title}</option>)}
                            </select>
                        </div>
                        <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                            {music?.map((i: number) => (
                                <SongCard
                                    key={i}
                                    song={song}
                                    isPlaying={isPlaying}
                                    activeSong={activeSong}
                                    music={music}
                                    i={i} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Discover;