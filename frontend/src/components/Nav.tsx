import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../components/Layout";
import PathConstants from "../routes/PathConstants";

export default function Nav() {
    const { user } = useContext(UserContext);

    return (
        <nav className="bg-nav-dark p-4">
            <div className="flex items-center justify-between">
                <Link to={PathConstants.HOME} className="text-white py-2 px-4 rounded-lg bg-blue-500 mr-2">
                    Home
                </Link>
                <ul className="flex">
                    <li>
                        <Link to={PathConstants.REGISTER} className="text-white py-2 px-4 rounded-lg bg-green-500 mr-2">
                            Signup
                        </Link>
                    </li>
                    <li>
                        {user ? (
                            <Link to={PathConstants.LOGOUT} className="text-white py-2 px-4 rounded-lg bg-red-500 mr-2">
                                Logout
                            </Link>
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