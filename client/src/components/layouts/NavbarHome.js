import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/Auth/authContext';

const NavbarHome = (props) => {
  const authContext = useContext(AuthContext);
  const { user, logoutUser, loadUser, loadMyDocs } = authContext;

  useEffect(()=>{
    loadUser();
    // eslint-disable-next-line
  },[localStorage.getItem('token'), props.history]);

  const onLogout = async() => {
    logoutUser();
  };

    return (
        <nav  className="nav-extended" style={{backgroundColor: 'blue'}}>
          <div className="nav-wrapper">
            <a href="./" className="brand-logo">ReDoc</a>
            <ul className="right">
              <li><a href="./profile">Hello {user && user.name}</a></li>
              <li><a href="./add">Add</a></li>
              <li><a href="./login" onClick={onLogout}>Logout</a></li>
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
    )
}

export default NavbarHome


