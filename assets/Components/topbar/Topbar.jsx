import React from "react";
import "./topbar.css";
import authApi from "../../services/authApi";
export default function Topbar() {
  const userInfo = authApi.getUser();
  console.log(userInfo);
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Foodomarket</span>
        </div>
        <div className="topRight">
          Bonjour {userInfo.username}
          <div className="topbarIconContainer"></div>
          {/* <img
            src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="topAvatar"
          /> */}
        </div>
      </div>
    </div>
  );
}
