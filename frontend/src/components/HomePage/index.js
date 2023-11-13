import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import './Homepage.css';
import logo from "../../assests/pictures/Screenshot 2023-11-12 at 3.36.15 PM.png";

export default function HomePage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const handleLogout = () => {
    dispatch(sessionActions.logout());
  };

  const handleCircleClick = (circleNumber) => {
    console.log(`Circle ${circleNumber} clicked`);
  };

  return (
    <div className="container">
      <header>
        <div className="left-content">
          <img src={logo} style={{ width: '50px' }} alt="Logo" />
          <p className="WOF">World of Hostels</p>
        </div>
        
        <div className="circles">
          <div className="circle" onClick={() => handleCircleClick(1)}></div>
          <div className="circle" onClick={() => handleCircleClick(2)}></div>
        </div>
      </header>

      {sessionUser && (
        <button onClick={handleLogout}>Logout</button>
      )}
    </div>
  );
}
