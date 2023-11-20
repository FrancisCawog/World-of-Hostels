import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import './Homepage.css';
import logo from "../../assets/pictures/Screenshot 2023-11-12 at 3.36.15 PM.png";
import groupPhoto from "../../assets/pictures/hero.chats.webp"
import arrow from "../../assets/pictures/icons/arrow.webp"
import locationPic from "../../assets/pictures/icons/Screenshot 2023-11-13 at 4.48.41 PM.png"
import { useState } from "react";
import CalenderSVG from "../../assets/pictures/icons/calendar-confirmation.svg"
import profile from "../../assets/pictures/profileusp.webp"
import message from "../../assets/pictures/messageusp.webp"
import walking from "../../assets/pictures/walkingusp.webp"
import userIcon from "../../assets/pictures/icons/user-128.svg"
import { Link } from "react-router-dom";

export default function HomePage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const handleLogout = () => {
    dispatch(sessionActions.logout());
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
    // console.log("Search clicked with inputs:", searchInputs);
  };

  return (
    <>
    <div className="container">
      <header>
        <div className="left-content">
          <img src={logo} style={{ width: '50px' }} alt="Logo" />
          <p className="WOF" >World of Hostels</p>
        </div>
        
          <div className="circles">
            <Link to="/login">
              <div className="circle"> <img src={userIcon} ></img></div>
            </Link>
            <div className="circle" ></div>
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
        <img src={locationPic} style={{ width: '50px' }}/>
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

    <br/>
    <br/>
    <br/>
    
    <div className="cancellation">
      <p>
        <img src={CalenderSVG} id="calender" style={{ width: '24px' }}/>
        <span className="bold">Free Cancellation</span> & <span className="bold">Flexible Booking</span> available
      </p>

      {/* <body> */}
        <br/>
        <br/>
        <br/>
        <div className="boxContainer">
          <div className="box" id="box1">
            <img className="profile" src={profile} alt="profile" />
            <div className="card-tag1">
            <div className="contentBox">
                <h1 id="boxH1">View Traveller Profiles</h1>
                <p id="boxp">See who's going!</p>
            </div>
            </div>
          </div>
          <div className="box" id="box2">
            <div className="card-tag2">
            <div className="contentBox">
              <h1 id="boxH1">Join your hostel's Chat</h1>
              <p id="boxp">Chat with travellers 14 days before check-in</p>
            </div>
            </div>
            <img className="message" src={message} alt="message" />
            <div className="card-tag"></div>
          </div>
          <div className="box" id="box3">
            <div className="card-tag3">
            <div className="contentBox">
              <h1 id="boxH1">RSVP to Linkups</h1>
              <p id="boxp">Explore and hang out with travellers.</p>
            </div>
            </div>
            <img className="walking" src={walking} alt="walking" />
            <div className="card-tag"></div>
          </div>
        </div>
      {/* </body> */}
    </div>
    </>
  );
}
