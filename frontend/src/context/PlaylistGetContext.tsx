import { createContext, useReducer } from 'react'
import { ReactNode } from 'react';
import React from 'react';

export const PlaylistGetContext = createContext(null as any)

export const playlistReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'SET_PLAYLIST': 
            return {
                playlist: action.payload
            }
        default:
            return state
    }
}

export const PlaylistGetContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatchSingle] = useReducer(playlistReducer, {
        playlists: null
    })

    return (
        <PlaylistGetContext.Provider value={{...state, dispatchSingle}}>
            { children }
        </PlaylistGetContext.Provider>
    )
}