import React, {useEffect, useState} from "react";
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
import beach from "../../assets/pictures/palmar.beach.lodge.jpg"
import eco from "../../assets/pictures/icons/eco.svg"
import cnc from "../../assets/pictures/icons/cnc.svg"
import insta from "../../assets/pictures/icons/new-instagram-logo-glyph.png"
import london from "../../assets/Insta Pics/FRA01122.jpg"
import hanoi from "../../assets/Insta Pics/FRA00675.jpg"
import kamodo from "../../assets/Insta Pics/FRA01447.jpg"
import fuji from "../../assets/Insta Pics/FRA01616-HDR.jpg"
import luxor from "../../assets/Insta Pics/FRA06852.jpg"
import takayama from "../../assets/Insta Pics/FRA06905.jpg"
import phiphi from "../../assets/Insta Pics/FRA07450.jpg"
import singapore from "../../assets/Insta Pics/FRA09993.jpg"
import { useDispatch, useSelector } from "react-redux";
import { fetchListings } from "../../store/listings";
import { Link } from 'react-router-dom';


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

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

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

    <div className="world-best">
      <div className="world-cards">
        <div style={{display: "flex"}}>
        <Link to={`/listings/${listings[1]?.id}`} className="world-cards1">
            <div className="world-photo">
              <img  src={listings[1]?.photoUrls[0]}/>
            </div>
            <p className="world-car-p1">{listings[1]?.property_name}</p>
            <p className="world-car-p2">{listings[1]?.city}, {listings[1]?.country}</p>
        </Link>
        <Link to={`/listings/${listings[2]?.id}`} className="world-cards2">
            <div className="world-photo">
              <img  src={listings[2]?.photoUrls[0]}/>
            </div>
            <p className="world-car-p1">{listings[2]?.property_name}</p>
            <p className="world-car-p2">{listings[2]?.city}, {listings[2]?.country}</p>
        </Link>
        </div>

        <div style={{display: "flex"}}>
          <div className="world-text" style={{width: "30%"}}>
            <h3>
              The world's best hostels, with over
              <span style={{color: "#30cf72", marginLeft: "10px"}}>13 million reviews</span>
              .
            </h3>
            <p>With over 16,500 hostels in 180 countries, there’s always room for a new adventure!</p>
          </div>
          <Link to={`/listings/${listings[3]?.id}`} className="world-cards3">
            <div className="world-photo">
              <img  src={listings[3]?.photoUrls[0]}/>
            </div>
            <p className="world-car-p1">{listings[3]?.property_name}</p>
            <p className="world-car-p2">{listings[3]?.city}, {listings[3]?.country}</p>
        </Link>
        </div>

        <div style={{display: "flex"}}>
        <Link to={`/listings/${listings[4]?.id}`} className="world-cards4">
            <div className="world-photo">
              <img  src={listings[4]?.photoUrls[0]}/>
            </div>
            <p className="world-car-p1">{listings[4]?.property_name}</p>
            <p className="world-car-p2">{listings[4]?.city}, {listings[4]?.country}</p>
        </Link>
        <Link to={`/listings/${listings[5]?.id}`} className="world-cards5">
            <div className="world-photo">
              <img  src={listings[5]?.photoUrls[0]}/>
            </div>
            <p className="world-car-p1">{listings[5]?.property_name}</p>
            <p className="world-car-p2">{listings[5]?.city}, {listings[5]?.country}</p>
        </Link>
        </div>
      </div>

      <div className="commited-world">
        <div className="world-pic">
          <img src={beach}/>
          <p style={{marginTop: "2rem"}}>Palmar Beach Lodge, Panama</p>
          <p style={{fontWeight: "400"}}>Hoscars 2022 Winner</p>
        </div>
        <div>
          <div className="world-text">
            <img src={eco}/>
            <h2>
            We are commited to a 
            <span style={{color: "#30cf72", marginLeft: "10px"}}>better world</span>
            .
            </h2>
            <p>Join us in making the planet a priority. We are proud to be a Climate Neutral verified company, committed to reducing our environmental footprint.</p>
            <img src={cnc}/>
          </div>
        </div>
      </div>
    </div>

    <div className="insta-pics">
        <h2>Get inspired!</h2>
        <h3>Discover popular places for unforgettable adventures.</h3>
        <div className="insta-pics-content">
          <div className="insta-column1">
            <a href="https://www.instagram.com/p/CqUt3ALyLmE/?img_index=2" target="_blank">
              <div>
                <div>
                  <img className="insta-pic" src={london}/>
                  <span className="insta-pic-span">
                    <span className="inner-span">
                      London
                    </span>
                  </span>
                </div>
                <div className="insta-social">
                  <img src={insta}/>
                  <span>montzandswog</span>
                </div>
              </div>
            </a>

            <a href="https://www.instagram.com/p/CevdMe3vLDb/?img_index=1" target="_blank">
              <div>
                <div>
                  <img className="insta-pic" src={hanoi}/>
                  <span className="insta-pic-span">
                    <span className="inner-span">
                      Hanoi
                    </span>
                  </span>
                </div>
                <div className="insta-social">
                  <img src={insta}/>
                  <span>montzandswog</span>
                </div>
              </div>
            </a>
          </div>
          <div className="insta-column2" style={{marginTop: "5.5625rem"}}>
          <a href="https://www.instagram.com/p/Cr8wo6eSamf/?img_index=1" target="_blank">
              <div>
                <div>
                  <img className="insta-pic" src={takayama}/>
                  <span className="insta-pic-span">
                    <span className="inner-span">
                      Takayama
                    </span>
                  </span>
                </div>
                <div className="insta-social">
                  <img src={insta}/>
                  <span>montzandswog</span>
                </div>
              </div>
            </a>

            <a href="https://www.instagram.com/p/CksQM1GuY9L/?img_index=3" target="_blank">
              <div>
                <div>
                  <img className="insta-pic" src={kamodo}/>
                  <span className="insta-pic-span">
                    <span className="inner-span">
                      Kamodo Island
                    </span>
                  </span>
                </div>
                <div className="insta-social">
                  <img src={insta}/>
                  <span>montzandswog</span>
                </div>
              </div>
            </a>
          </div>
          <div className="insta-column3">
          <a href="https://www.instagram.com/p/CjpQNqWrzOj/?img_index=5" target="_blank">
              <div>
                <div>
                  <img className="insta-pic" src={singapore}/>
                  <span className="insta-pic-span">
                    <span className="inner-span">
                      Singapore
                    </span>
                  </span>
                </div>
                <div className="insta-social">
                  <img src={insta}/>
                  <span>montzandswog</span>
                </div>
              </div>
            </a>

            <a href="https://www.instagram.com/p/CiCk_yPL7jD/?img_index=6" target="_blank">
              <div>
                <div>
                  <img className="insta-pic" src={phiphi}/>
                  <span className="insta-pic-span">
                    <span className="inner-span">
                      Phi Phi Island
                    </span>
                  </span>
                </div>
                <div className="insta-social">
                  <img src={insta}/>
                  <span>montzandswog</span>
                </div>
              </div>
            </a>
          </div>
          <div className="insta-column4" style={{marginTop: "5.5625rem"}}>
          <a href="https://www.instagram.com/p/CtZeB_tOhMB/?img_index=1" target="_blank">
              <div>
                <div>
                  <img className="insta-pic" src={fuji}/>
                  <span className="insta-pic-span">
                    <span className="inner-span">
                      Mt. Fuji
                    </span>
                  </span>
                </div>
                <div className="insta-social">
                  <img src={insta}/>
                  <span>montzandswog</span>
                </div>
              </div>
            </a>

            <a href="https://www.instagram.com/p/Cn98VGyuOjQ/?img_index=2" target="_blank">
              <div>
                <div>
                  <img className="insta-pic" src={luxor}/>
                  <span className="insta-pic-span">
                    <span className="inner-span">
                      Luxor
                    </span>
                  </span>
                </div>
                <div className="insta-social">
                  <img src={insta}/>
                  <span>montzandswog</span>
                </div>
              </div>
            </a>
          </div>
        </div>
    </div>
    <Footer/>
    </>
  );
}
