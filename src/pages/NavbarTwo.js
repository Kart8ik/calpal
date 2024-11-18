import React from 'react'
import { Link } from 'react-router-dom'
import '../stylesheets/Navbar.css'

const NavbarTwo = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        {/* <span className="brand">CalPal</span> */}
        <Link to="/" className='link-style'>CalPal</Link>
      </div>
      <div className="navbar-right">
        <span>
          <Link to="/yourtasks" className='link-style'>Your Tasks</Link>
        </span>
        <span>
          <Link to="/friends" className='link-style'>Friends</Link>
        </span>
        <span>
          <Link to="/groups" className='link-style'>Groups</Link>
        </span>
      </div>
    </nav>
  )
}

export default NavbarTwo
