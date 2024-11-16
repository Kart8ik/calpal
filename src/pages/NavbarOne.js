import React from 'react'
import {Link} from 'react-router-dom'
const NavbarOne = () => {
  return (
    <nav>
        <ul className='Navbar'>
          <li>
            <Link to="/login" className='link-style'>login</Link>
          </li>
          <li>
            <Link to="/register" className='link-style'>register</Link>
          </li>
        </ul>
    </nav>
  )
}

export default NavbarOne
