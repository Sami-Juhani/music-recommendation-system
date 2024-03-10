import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContextProvider";
import PathConstants from "../routes/PathConstants";
import { UserContextType } from "../types/UserContextType";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const IS_AUTHENTICATED_URL = BASE_URL + "/api/spotify/is-authenticated/";
const AUTH_URL = BASE_URL + "/api/spotify/auth/";

interface LoginFormState {
  email: string;
  password: string;
}

export const useLogin = () => {
  const [formData, setFormData] = useState<LoginFormState>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { setUser }: UserContextType = useContext<UserContextType>(UserContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (response.status !== 200) return;

      const data = await response.json();

      setUser(data.user);

      if (response.ok) {
        // Check if access_token exists in data (&& data.access_token)
        try {
          const response = await fetch(IS_AUTHENTICATED_URL, {
            credentials: "include",
          });
          if (response.status === 200) {
            const isAuthenticated = await response.json();
            if (!isAuthenticated.status) window.location.href = AUTH_URL;
          } else {
            const error = await response.json();
            console.log(error);
          }
        } catch (e: any) {
          console.log(e.message);
        } finally {
          navigate(PathConstants.HOME);
        }
      } else {
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return { formData, handleChange, handleSubmit };
};

export default useLogin;
