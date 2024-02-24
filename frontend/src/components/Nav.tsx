import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../components/Layout";
import PathConstants from "../routes/PathConstants";

const BASE_URL = "http://127.0.0.1:8000";

export default function Nav() {
    const { user, setUser } = useContext(UserContext);

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
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }

    return (
        <nav className="bg-nav-dark p-4">
            <div className="flex items-center justify-between">
                <Link to={PathConstants.HOME} className="text-white py-2 px-4 rounded-lg bg-blue-500 mr-2">
                    Home
                </Link>
                <ul className="flex">
                <li>
                    {user ? (
                        <Link to={PathConstants.PROFILE_UPDATE} className="text-white py-2 px-4 rounded-lg bg-green-500 mr-2">
                            Profile Update
                        </Link>
                    ) : (
                        <Link to={PathConstants.REGISTER} className="text-white py-2 px-4 rounded-lg bg-green-500 mr-2">
                            Signup
                        </Link>
                    )}
                </li>
                    <li>
                    {user ? (
                        <button onClick={logout} className="text-white py-2 px-4 rounded-lg bg-red-500 mr-2">
                            Logout
                        </button>
                        ) : (
                        <Link to={PathConstants.LOGIN} className="text-white py-2 px-4 rounded-lg bg-red-500 mr-2">
                            Login
                        </Link>
                    )}
                    </li>
                    <li>
                        <Link to={PathConstants.DISCOVER} className="text-white py-2 px-4 rounded-lg bg-indigo-500">
                            Discover
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}