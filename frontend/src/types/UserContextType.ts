export type UserContextType = {
    user?: object;
    setUser: React.Dispatch<React.SetStateAction<object | undefined>>;
    children: React.ReactNode;
  };