import { Dispatch, SetStateAction } from "react";


interface UserData {
  firstname?: string;
  lastname?: string;
}

export interface UserContextType {
  user: UserData | undefined;
  setUser: Dispatch<SetStateAction<UserData | undefined>>;
  children: React.ReactNode;
}

// export type UserContextType = {
//     user?: object;
//     setUser: React.Dispatch<React.SetStateAction<object | undefined>>;
//     children: React.ReactNode;
//   };