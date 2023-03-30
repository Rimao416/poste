import "./navbar.css"
import React from 'react'
import authApi from "../../services/authApi"
authApi

function Navbar() {
  const moi=authApi.getUser()
  console.log(moi)
  return (
    <div className="navbar">
      <div className="navbar__left">
          Bienvenue dans votre Espace
      </div>
    
    </div>
    
  )
}

export default Navbar