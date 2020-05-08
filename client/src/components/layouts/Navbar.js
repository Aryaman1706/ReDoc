import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/Auth/authContext';
import AuthState from '../../context/Auth/AuthState'

const Navbar = (props) => {
  const authContext = useContext(AuthContext);
  const { user, logoutUser, loadUser } = authContext;

  // useEffect(()=>{
  //   loadUser();
  //   // eslint-disable-next-line
  // },[user]);

  const onLogout = async() => {
    logoutUser();
  };

    return (
      <nav style={{backgroundColor: 'blue'}}>
        <div className="nav-wrapper">
          <a href="./home" className="brand-logo">Doc Editor</a>
          <ul className="right hide-on-med-and-down">
            <li><a href="./profile">Hello {user && user.name}</a></li>
            <li><a href="./add">Add</a></li>
            <li><a href="./login" onClick={onLogout}>Logout</a></li>
          </ul>
        </div>
      </nav>    
    )
}

export default Navbar
