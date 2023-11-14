import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import './Homepage.css';
import logo from "../../assests/pictures/Screenshot 2023-11-12 at 3.36.15 PM.png";
import groupPhoto from "../../assests/pictures/hero.chats.webp"
import arrow from "../../assests/pictures/icons/arrow.webp"
// import locationPic from "../../assests/pictures/icons/Screenshot 2023-11-13 at 4.48.41 PM.png"
import { useState } from "react";

export default function HomePage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const handleLogout = () => {
    dispatch(sessionActions.logout());
  };

  const handleCircleClick = (circleNumber) => {
    console.log(`Circle ${circleNumber} clicked`);
  };

  const [searchInputs, setSearchInputs] = useState({
    location: "",
    checkInDate: "",
    checkOutDate: "",
    guests: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value
    }));
  };

  const handleSearch = () => {
    console.log("Search clicked with inputs:", searchInputs);
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
      
      <div className="background">
        <h1>Meet your people.</h1>
        <p>Choose where to stay and we'll show you who with!</p>
        <img className="group-photo" src={groupPhoto} alt="Group" />
        <img className="arrow-photo" src={arrow} alt="arrow" />

        <div className="search-bar">
        {/* <img src={locationPic} style={{ width: '50px' }}/> */}
          <input
            type="text"
            name="location"
            id="location"
            placeholder="Where do you want to go?"
            value={searchInputs.location}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="checkInDate"
            id="checkInDate"
            placeholder="Check in"
            value={searchInputs.checkInDate}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="checkOutDate"
            id="checkOutDate"
            placeholder="Check out"
            value={searchInputs.checkOutDate}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="guests"
            id="guests"
            placeholder="Guests"
            value={searchInputs.guests}
            onChange={handleInputChange}
          />
          <button type="button" onClick={handleSearch}>Let's Go!</button>
        </div>
      </div>
    </div>
  );
}
