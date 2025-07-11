import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {}, [isAuthenticated]);
  return (
    <nav className="navbar">
      <h1 className="text-3xl font-bold md:hidden">My Workout Tracker</h1>
      <ul className="hidden md:flex justify-center items-center gap-x-10 w-full h-full text-xl lg:text-2xl font-bold uppercase">
        {isAuthenticated && (
          <li className="capitalize">Hi, {user.username}!</li>
        )}
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        {isAuthenticated && (
          <>
            <li>
              <NavLink to="/today">today</NavLink>
            </li>
            <li>
              <NavLink to="/workout-routine/active">routine active</NavLink>
            </li>
            <li>
              <NavLink to="/workout-routine/routines">routines</NavLink>
            </li>
          </>
        )}

        {!isAuthenticated ? (
          <>
            <li>
              <NavLink to="/register">sign up</NavLink>
            </li>
            <li>
              <NavLink to="/login">log in</NavLink>
            </li>
          </>
        ) : (
          <li
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="cursor-pointer"
          >
            log out
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
