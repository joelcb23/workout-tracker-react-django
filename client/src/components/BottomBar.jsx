import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaHouse, FaListCheck, FaUserPen } from "react-icons/fa6";
import { IoToday, IoLogIn, IoLogOut, IoBody } from "react-icons/io5";
const BottomBar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {}, [isAuthenticated]);
  return (
    <ul className="bottom-bar">
      <li>
        <NavLink to="/" className="item-bottom-bar">
          <FaHouse className="text-2xl " /> Home
        </NavLink>
      </li>
      {isAuthenticated && (
        <>
          <li>
            <NavLink to="/today" className="item-bottom-bar">
              <IoToday className="text-2xl" />
              today
            </NavLink>
          </li>
          <li>
            <NavLink to="/workout-routine/active" className="item-bottom-bar">
              <IoBody className="text-2xl" />
              active
            </NavLink>
          </li>
          <li>
            <NavLink to="/workout-routine/routines" className="item-bottom-bar">
              <FaListCheck className="text-2xl" />
              routines
            </NavLink>
          </li>
        </>
      )}

      {!isAuthenticated ? (
        <>
          <li>
            <NavLink to="/register" className="item-bottom-bar">
              <FaUserPen className="text-2xl" />
              SignUp
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className="item-bottom-bar">
              <IoLogIn className="text-2xl" />
              LogIn
            </NavLink>
          </li>
        </>
      ) : (
        <li
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="item-bottom-bar"
        >
          <IoLogOut className="text-2xl" />
          LogOut
        </li>
      )}
    </ul>
  );
};
export default BottomBar;
