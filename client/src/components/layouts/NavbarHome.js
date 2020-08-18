import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/Auth/authContext";
import { Link } from "react-router-dom";

const NavbarHome = (props) => {
  const authContext = useContext(AuthContext);
  const { user, logoutUser, loadUser, loadMyDocs, loading } = authContext;

  const onLogout = async () => {
    logoutUser();
  };

  return (
    <nav className="nav-extended" style={{ backgroundColor: "blue" }}>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo">
          ReDoc
        </Link>
        <ul className="right">
          <li>
            <Link to="/profile">Hey {user && user.name}</Link>
          </li>
          <li>
            <Link to="/add">Add</Link>
          </li>
          <li>
            <Link to="/login" onClick={onLogout}>
              Logout
            </Link>
          </li>
        </ul>
      </div>

      <div className="nav-content container">
        <div>
          <form>
            <div className="input-field">
              <input
                className="white-text"
                name="search"
                type="text"
                placeholder="Search for Documents..."
                required
              />
            </div>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default NavbarHome;
