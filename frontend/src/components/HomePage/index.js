import React from "react";
import { useInView } from 'react-intersection-observer';
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
import car from "../../assets/pictures/The_Spindrift_Hostel-img.jpg"
import MyArrowSVG from "../../assets/pictures/icons/arrow-left.svg"
import hostel from "../../assets/pictures/los-patios-card_png.jpg"
import user1 from "../../assets/profile-pics/user1.jpeg"
import user2 from "../../assets/profile-pics/user2.jpeg"
import user3 from "../../assets/profile-pics/user3.jpeg"
import user4 from "../../assets/profile-pics/user4.jpeg"
import user5 from "../../assets/profile-pics/user5.jpeg"
import user6 from "../../assets/profile-pics/user6.jpeg"
import user7 from "../../assets/profile-pics/user7.jpeg"
import user8 from "../../assets/profile-pics/user8.jpeg"
import user9 from "../../assets/profile-pics/user9.jpeg"
import user10 from "../../assets/profile-pics/user10.jpeg"
import user11 from "../../assets/profile-pics/user11.jpeg"

export default function HomePage() {
  sessionStorage.setItem('redirectUrl', window.location.pathname);

  const handleClick = (e) => {
    const checkNew = document.getElementById('see-who-going');
      if (checkNew) {
        checkNew.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
  }  

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

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
    <div className="this-is">
      <div className="this-is-text">
        <div className="this-text">
          <p>
            This is the
            <span style={{color: "#cc0074", marginLeft: "3px", marginRight: "3px"}}>NEW</span> 
            Hostelworld.
          </p>
          <h2>
            Helping you
            <span style={{color: "#cc0074", marginLeft: "10px"}}>connect with travellers</span>
            . Even
            <span style={{color: "#cc0074", marginLeft: "10px", marginRight: "10px"}}>before</span>
            you get to your hostel
          </h2>
          <button onClick={handleClick}>Check what's new
            <img className="arrow-down-this" src={MyArrowSVG}/>
          </button>
        </div>
      </div>
      <div className="this-is-car">
        <img src={car}/>
      </div>
    </div>

    <div className="see-who-going" id="see-who-going" ref={ref}>
    {inView &&
      <div className="animation" >
        <img src={hostel} />
        <div>
          <div className="user-1" >
            <img src={user1} />
          </div>
          <div className="user-2">
            <img src={user2} />
          </div>
          <div className="user-3">
            <img src={user3} />
          </div>
          <div className="user-4">
            <img src={user4} />
          </div>
          <div className="user-5">
            <img src={user5} />
          </div>
          <div className="user-6">
           <img src={user6} />
          </div>
          <div className="user-7">
           <img src={user7} />
          </div>
          <div className="user-8">
           <img src={user8} />
          </div>
          <div className="user-9">
            <img src={user9} />
          </div>
          <div className="user-10">
            <img src={user10} />
          </div>
          <div className="user-11">
           <img src={user11} />
          </div>
        </div>
      </div>
      }
      <div className="see-who-going-text">
          <h2>
            See
            <span style={{marginLeft: "15px", marginRight: "15px", color: "orange"}} >who's</span>
            going.
          </h2>
          <p>Connect with other travellers staying in the same hostel or city as you.</p>
      </div>
    </div>

    <Footer/>
    </>
  );
}
