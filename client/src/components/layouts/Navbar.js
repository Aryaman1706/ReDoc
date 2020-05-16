import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/Auth/authContext';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
  const authContext = useContext(AuthContext);
  const { user, logoutUser, loadUser, loadMyDocs } = authContext;

  const onLogout = async() => {
    logoutUser();
  };

    return (
        <nav  className="nav-extended" style={{backgroundColor: 'blue'}}>
          <div className="nav-wrapper">
            <a href="./" className="brand-logo">ReDoc</a>
            <ul className="right">
              <li><Link to="/profile">Hello {user && user.name}</Link></li>
              <li><Link to="/add">Add</Link></li>
              <li><Link to="/login" onClick={onLogout}>Logout</Link></li>
            </ul>
          </div>
        </nav>   
    )
}

export default Navbar

