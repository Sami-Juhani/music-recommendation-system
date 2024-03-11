import { UserType } from "./UserType";

export type UserContextType = {
  user?: UserType | undefined;
  setUser: React.Dispatch<React.SetStateAction<object | undefined>>;
  children: React.ReactNode;
};
