import "./Navbar.css";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-menu">
        <div>
          <NavLink
            to="/"
            className="nav-link"
            style={{ textDecoration: "none" }}
          >
            Home
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/login"
            className="nav-link"
            style={{ textDecoration: "none" }}
          >
            Login
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/signup"
            className="nav-link"
            style={{ textDecoration: "none" }}
          >
            Signup
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
