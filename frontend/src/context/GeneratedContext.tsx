import { createContext, useReducer } from 'react'
import { ReactNode } from 'react';
import React from 'react';

export const GeneratedContext = createContext(null as any)

export const generatedReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'SET_GENERATED': 
            return {
                generated: action.payload
            }
        default:
            return state
    }
}

export const GeneratedContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatchGenerated] = useReducer(generatedReducer, {
        generated: null
    })

    return (
        <GeneratedContext.Provider value={{...state, dispatchGenerated}}>
            { children }
        </GeneratedContext.Provider>
    )
}