import { createContext, useReducer } from 'react'
import { ReactNode } from 'react';
import React from 'react';

export const PlaylistsGetAllContext = createContext(null as any)

export const playlistsReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'SET_PLAYLISTS': 
            return {
                playlists: action.payload
            }
        default:
            return state
    }
}

export const PlaylistsGetAllContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatchPlaylists] = useReducer(playlistsReducer, {
        playlists: null
    })

    return (
        <PlaylistsGetAllContext.Provider value={{...state, dispatchPlaylists}}>
            { children }
        </PlaylistsGetAllContext.Provider>
    )
}