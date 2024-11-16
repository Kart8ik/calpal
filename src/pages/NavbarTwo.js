import React from 'react'
import { Link } from 'react-router-dom'

const NavbarTwo = () => {
  return (
    <nav>
        <ul className='Navbar'>
          <li>
            <Link to="/yourtasks" className='link-style'>Your Tasks</Link>
          </li>
          <li>
            <Link to="/friends" className='link-style'>Friends</Link>
          </li>
          <li>
            <Link to="/groups" className='link-style'>Groups</Link>
          </li>
        </ul>
    </nav>
  )
}

export default NavbarTwo
