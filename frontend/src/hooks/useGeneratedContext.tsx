import { GeneratedContext } from "../context/GeneratedContext"
import { useContext } from "react";

export const useGeneratedContext = () => {
    const context = useContext(GeneratedContext);
    if (context === undefined) {
      throw new Error(
        "useGeneratedContext must be used within a GeneratedContextProvider"
      );
    }
    console.log(context);
    return context;
  }