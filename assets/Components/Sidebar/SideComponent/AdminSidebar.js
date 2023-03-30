import React from 'react'
import List from './List'
import {Link} from "react-router-dom"
function AdminSidebar() {
  return (
    <>
    <li>
        <Link to="/admin/user">Gestion des utilisateurs</Link>
    </li>
    <li>
        <Link to="/admin/projet">Gestion des projets</Link>
        {/* <Link to="/admin/profile">Gestion des utilisateurs</Link> */}
          
        </li>
    <li>
        <Link to="/admin/conge">Gestion des congés</Link>
        {/* <Link to="/admin/profile">Gestion des utilisateurs</Link> */}
          
        </li>
    
    </>
  )
}

export default AdminSidebar