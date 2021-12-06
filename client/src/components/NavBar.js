import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/userReducer";

const NavBar = () => {
    const { isAuth } = useSelector(state => state.user);
    const dispatch = useDispatch();

    return (
        <div className="navbar">
            <Link style={{textDecoration: 'none'}} to="/">
                <p className="brand">Quiz App</p>
            </Link>
            <ul className="nav-reg-login">
                {!isAuth &&
                <li className="nav-links">
                    <Link className="reg-log-btn" to="/login">Login</Link>
                </li>
                }
                {!isAuth &&
                <li className="nav-links">
                    <Link className="reg-log-btn" to="/register">Register</Link>
                </li>
                }
                {isAuth && <li
                    className="nav-links"
                    onClick={(e) => {
                        e.preventDefault();
                        dispatch(logout());
                    }}
                >
                    <Link className="reg-log-btn" to="/login">Logout</Link>
                </li>
                }
            </ul>
        </div>
    );
};

export default NavBar;