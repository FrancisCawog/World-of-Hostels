import React from "react";
import './Homepage.css';
import groupPhoto from "../../assets/pictures/hero.chats.webp"
import arrow from "../../assets/pictures/icons/arrow.webp"
import CalenderSVG from "../../assets/pictures/icons/calendar-confirmation.svg"
import profile from "../../assets/pictures/profileusp.webp"
import message from "../../assets/pictures/messageusp.webp"
import walking from "../../assets/pictures/walkingusp.webp"
import Navigation from "../Navigation";
import Footer from "../Footer";
import SearchBar from "../SearchBar";

export default function HomePage() {
  sessionStorage.setItem('redirectUrl', window.location.pathname);

  return (
    <>
    <Navigation/>
    <div className="home-container">
      
      <div className="background">
        <h1>Meet your people.</h1>
        <p>Choose where to stay and we'll show you who with!</p>
        <img className="group-photo" src={groupPhoto} alt="Group" />
        <img className="arrow-photo" src={arrow} alt="arrow" />

       <SearchBar/>
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
    </div>
    <br/>
    <Footer/>
    </>
  );
}
