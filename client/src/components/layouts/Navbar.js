import React from 'react'

const Navbar = () => {
    return (
        <nav style={{backgroundColor: 'blue'}}>
        <div className="nav-wrapper">
          <a href="./home" className="brand-logo">Doc Editor</a>
          <ul className="right hide-on-med-and-down">
            <li><a href="./add">Add</a></li>
            <li><a href="#!">Link</a></li>
            <li><a href="#!">Link</a></li>
          </ul>
        </div>
      </nav>    
    )
}

export default Navbar
