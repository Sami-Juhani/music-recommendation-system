import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext, userProps } from "../components/Layout"
import PathConstants from "../routes/PathConstants";

const BASE_URL = "http://127.0.0.1:8000";
const IS_AUTHENTICATED_URL = "http://127.0.0.1:8000/api/spotify/is-authenticated/"
const AUTH_URL = "http://127.0.0.1:8000/api/spotify/auth/"

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

  const { setUser } : userProps = useContext<userProps>(UserContext);

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
        credentials: 'include'
      }); 
      
      if (response.status !== 200) return 
      
      const data = await response.json();

      setUser(data.user)
      
      if (response.ok) {
        // Check if access_token exists in data (&& data.access_token)
        try {
          const response = await fetch(
            IS_AUTHENTICATED_URL, {
              credentials: 'include'
            });
          if (response.status === 200) {
            const isAuthenticated = await response.json();
            if (!isAuthenticated.status)
              window.location.href = AUTH_URL;
          } else {
            const error = await response.json();
            console.log(error)
          }
        } catch (e: any) {
          console.log(e.message);
        } finally {
          navigate(PathConstants.HOME);
        }
      } else {
        
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      
      console.error('Error:', error);
    }
  };

  return { formData, handleChange, handleSubmit };
};

export default useLogin;
