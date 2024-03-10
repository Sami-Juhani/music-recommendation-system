import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContextProvider";
import { UserContextType } from "../types/UserContextType";
import PathConstants from "../routes/PathConstants";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const useLogout = () => {
 

  const navigate = useNavigate();

  const { setUser } : UserContextType = useContext<UserContextType>(UserContext);


  const logout = () => {
      fetch(`${BASE_URL}/api/user/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
          credentials: 'include',
      })
        .then(() => {
          setUser(undefined);
          console.log("User logged out");
        })
        .catch(error => {
          console.error('Error:', error);
        })
        .finally(() => {
            navigate(PathConstants.HOME);
    });

};
    
      return { logout };
    }	

export default useLogout;
