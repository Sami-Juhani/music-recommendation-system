import { Link } from "react-router-dom";
import PathConstants from "../routes/PathConstants";
import React from "react";

export default function Nav() {
    return (
        <nav className="bg-nav-dark p-4"> {/* Adjust background color as needed */}
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
                        <Link to={PathConstants.LOGIN} className="text-white py-2 px-4 rounded-lg bg-red-500 mr-2">
                            Login
                        </Link>
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
