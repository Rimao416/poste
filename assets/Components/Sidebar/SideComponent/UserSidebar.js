import React from 'react'
import List from './List'
import {Link} from "react-router-dom"
function UserSidebar() {
  return (
    <>
    <li>
        <Link to="/conge">Mes congés</Link>
    </li>
    <li>
        <Link to="/profile">Mon profile</Link>
    </li>
    
    </>
  )
}

export default UserSidebar