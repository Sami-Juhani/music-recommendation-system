import { createContext, useReducer } from 'react'
import React from 'react';

export const MusicGetAllContext = createContext(null as any)

export const musicReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'SET_MUSIC': 
            return {
                music: action.payload
            }
        default:
            return state
    }
}

export const MusicGetAllContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(musicReducer, {
        music: null
    })

    return (
        <MusicGetAllContext.Provider value={{...state, dispatch}}>
            { children }
        </MusicGetAllContext.Provider>
    )
}