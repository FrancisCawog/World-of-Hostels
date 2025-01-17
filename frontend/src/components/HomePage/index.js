import React, {useEffect} from "react";
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
import beach from "../../assets/pictures/palmar.beach.lodge.jpg"
import eco from "../../assets/pictures/icons/eco.svg"
import cnc from "../../assets/pictures/icons/cnc.svg"
import InstaPage from "./Instapage";
import WorldsBest from "./WorldsBest";
import SeeWhosGoing from "./SeeWhosGoing";
import { useDispatch, useSelector } from "react-redux";
import { fetchListings } from "../../store/listings";


export default function HomePage() {
  const dispatch = useDispatch();
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const listings = useSelector((state) => state.listings);
  sessionStorage.setItem('redirectUrl', window.location.pathname);

  const handleClick = (e) => {
    const checkNew = document.getElementById('see-who-going');
      if (checkNew) {
        checkNew.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
  }  

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(fetchListings(today.toISOString().split("T")[0], tomorrow.toISOString().split("T")[0])).catch((error) => {
      console.error("Error fetching listing:", error);
    });
  }, [dispatch]);
  

  return (
    <>
    <Navigation/>
    <div className="home-container">
      
      <div className="background">
        <div className="background-images">
          <div className="background-text">
            <h1>Meet your people.</h1>
            <p>Choose where to stay and we'll show you who with!</p>
            <img className="arrow-photo" src={arrow} alt="arrow" />
          </div>
          <img className="group-photo" src={groupPhoto} alt="Group" />
        </div>

       <SearchBar/>
      </div>
    </div>

    <br/>
    <br/>
    <br/>
    
    <div className="cancellation">
      <p>
        <img src={CalenderSVG} id="calender"/>
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
            <span className="highlight new">NEW</span> 
            Hostelworld.
          </p>
          <h2>
            Helping you
            <span className="highlight connect">connect with travellers</span>
            . Even
            <span className="highlight before">before</span>
            you get to your hostel
          </h2>
          <button onClick={handleClick}>
            Check what's new
            <img className="arrow-down-this" src={MyArrowSVG} />
          </button>
        </div>
      </div>
      <div className="this-is-car">
        <img src={car}/>
      </div>
    </div>

    <SeeWhosGoing/>
    <WorldsBest listings={listings}/>

    <div className="commited-world">
      <div className="world-pic">
        <img src={beach} alt="Beach" />
        <p className="world-pic-title">Palmar Beach Lodge, Panama</p>
        <p className="world-pic-subtitle">Hoscars 2022 Winner</p>
      </div>
      <div>
        <div className="world-text">
          <img src={eco} alt="Eco Icon" />
          <h2>
            We are committed to a 
            <span className="highlight-green">better world</span>.
          </h2>
          <p>Join us in making the planet a priority. We are proud to be a Climate Neutral verified company, committed to reducing our environmental footprint.</p>
          <img src={cnc} alt="Climate Neutral Certified Logo" />
        </div>
      </div>
    </div>

    <InstaPage/>
    <Footer/>
    </>
  );
}
