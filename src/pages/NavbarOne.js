import React from 'react'
import { Link } from 'react-router-dom'
import '../stylesheets/Navbar.css'
const NavbarOne = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/" className='link-style'>CalPal</Link>
        </div>
        <div className="navbar-right">
          <span>
            <Link to="/login" className='link-style'>Login</Link>
          </span>
          <span>
            <Link to="/register" className='link-style'>Register</Link>
          </span>
        </div>
      </nav>
    </div>
  )
}

export default NavbarOne
