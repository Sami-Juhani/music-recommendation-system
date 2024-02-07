import { Link } from "react-router-dom";
import PathConstants from "../routes/PathConstants";
import React from "react";

export default function Nav() {
    return (
        <nav className="navbar">
            <Link to={PathConstants.HOME}>
                Home
            </Link>
            <ul className="nav-buttons">
                <li className="nav-button">
                    <span className="signup">
                        <Link to={PathConstants.REGISTER} className="signup-text">
                            Signup
                        </Link>
                    </span>
                </li>
                <li className="nav-button">
                    <span className="login">
                        <Link to={PathConstants.LOGIN} className="login-text">
                            Login
                        </Link>
                    </span>
                </li>
            </ul>
        </nav>
    );
}
