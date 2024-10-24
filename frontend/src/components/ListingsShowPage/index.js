import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchListing, fetchListings } from "../../store/listings";
import ChooseRoom from "./ChooseRoom";
import ListingReviewSection from "./ListingReviewSection"
import "./ListingShow.css";
import WifiSVG from "../../assets/pictures/icons/wifi.svg"
import CoffeeSVG from "../../assets/pictures/icons/coffee.svg"
import MapSVG from "../../assets/pictures/icons/map-icon.svg"
import MyArrowSVG from "../../assets/pictures/icons/right-arrow-svgrepo-com.svg"
import checkInPic from "../../assets/pictures/icons/Screenshot 2023-11-17 at 1.50.07 PM.png"
import checkOutPic from "../../assets/pictures/icons/Screenshot 2023-11-17 at 1.49.46 PM.png"
import ListingsModal from "../ListingsModal";
import Navigation from "../Navigation";
import Footer from "../Footer"
import CheckoutForm from "../Checkout"
import { setCheckIn, setCheckOut, updateGuests, setLocation } from "../../store/cart";
import FacilityIcon from "../../components/FacilityIcon/index.js";

function ListingsShowPage() {
  const dispatch = useDispatch();
  const { listingId } = useParams();
  const listing = useSelector((state) => state?.listings[listingId]);
  const photos = listing?.photoUrls;
  const reviews = useSelector((state) => state?.reviews);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [tabName, settabName] = useState();
  const cart = useSelector((state) => state?.cart);
  const start_date = cart.checkIn;
  const end_date = cart.checkOut;
  const cartItems = useSelector((state) => state?.cart.cart);
  sessionStorage.setItem('redirectUrl', window.location.pathname);
  const facilitiesObjectString = listing?.facilities.replace(/=>/g, ':');
  const topPictureRef = useRef(null);

  const handleScroll = () => {
    if (topPictureRef.current) {
      topPictureRef.current.scrollBy({ left: 500, behavior: 'smooth' });
    }
  };

  let allValues;
  if (facilitiesObjectString) {
    const facilitiesObject = JSON.parse(facilitiesObjectString);
    allValues = Object.values(facilitiesObject).flat();
  }  

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(fetchListings(today.toISOString().split("T")[0], tomorrow.toISOString().split("T")[0])).catch((error) => {
      console.error("Error fetching listing:", error);
    });
  }, []);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const checkInDate = cart.checkIn || localStorage.getItem('checkInDate') || today.toISOString().split("T")[0];
  const checkOutDate = cart.checkOut || localStorage.getItem('checkOutDate') || tomorrow.toISOString().split("T")[0];
  const guests = cart.guests || localStorage.getItem('guests') || "1";
  const location = cart.location || localStorage.getItem('location') || "";

  useEffect(() => {
    localStorage.setItem('location', location);
    localStorage.setItem('checkInDate', checkInDate);
    localStorage.setItem('checkOutDate', checkOutDate);
    localStorage.setItem('guests', guests);

    dispatch(setLocation(location));
    dispatch(setCheckIn(checkInDate));
    dispatch(setCheckOut(checkOutDate));
    dispatch(updateGuests(guests));
  }, [location, checkInDate, checkOutDate, guests]);

  useEffect(() => {
    if (start_date){
    dispatch(fetchListing(listingId, start_date, end_date)).catch((error) => {
      console.error("Error fetching listing:", error);
    });
  } else {
    dispatch(fetchListing(listingId, today.toISOString().split("T")[0], tomorrow.toISOString().split("T")[0])).catch((error) => {
      console.error("Error fetching listing:", error)
    });
  }
  }, [cart]);

  function handleTabClick(tabName) {
    if (tabName === 'Rooms') {
      const chooseRoomDiv = document.getElementById('choose-room');
      if (chooseRoomDiv) {
        chooseRoomDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else if (tabName === 'About'){
      settabName('About');
      setShowAboutModal(true);
    } else if (tabName === 'House Rules'){
      settabName('HouseRules');
      setShowAboutModal(true);
    } else if(tabName === 'Facilities'){
      settabName('Facilities');
      setShowAboutModal(true);
    } else if(tabName === 'Map'){
      settabName('Map');
      setShowAboutModal(true);
    } else if (tabName === 'Reviews') {
      const chooseRoomDiv = document.getElementById('show-reviews');
      if (chooseRoomDiv) {
        chooseRoomDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  useEffect(() => {
    if (showAboutModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto'; 
    };
  }, [showAboutModal]);

  const closeModal = () => {
    setShowAboutModal(false);
  };

  const numberOfReviews = (listingId) => {
    const listingReviews = Object.values(reviews).filter(review => review.listing_id === listingId);
    return listingReviews.length
  }

  
  return (
    <>
    {showAboutModal && <ListingsModal tabName={tabName} onClose={closeModal} />}
      <Navigation/>
      <div className="top-picture" ref={topPictureRef}>
      {photos?.map((photo, index) => (
        <img
          key={index}
          src={photo}
          alt={`Photo ${index + 1}`}
          style={{ marginRight: index !== photos.length - 1 ? '10px' : '0' }}
        />
      ))}
      <div className="top-picture-next">
        <button className="top-picture-button" onClick={handleScroll}>
          <img src={MyArrowSVG} style={{ width: '14px', marginLeft: "0px", marginRight: "0px"}}/>
        </button>
      </div>
    </div>
      <h1 className="title" style={{marginBottom: "20px"}}>{listing?.property_name}</h1>
      <p className="listings-p">
        {listing?.property_type &&
          listing?.property_type.charAt(0).toUpperCase() + listing?.property_type.slice(1)}
        <span style={{ margin: '0 5px', color: 'black' }}>•</span>
        {listing?.city}, {listing?.country}
        <span style={{ margin: '0 5px' }}>•</span>
        <a href="#" style={{ textDecoration: 'underline', color: "black" }} onClick={() => handleTabClick('Map')}>View Map</a>
      </p>

      <div className="wifi-text" style={{ display: 'flex', alignItems: 'center' }}>
        {listing && listing['has_wifi?'] && (
          <>
            <div className="wifi" style={{ display: 'inline-block', borderRadius: '50%', padding: '5px', marginRight: '5px' }}>
              <img src={WifiSVG} style={{ marginLeft: '1px', marginTop: '1px' }} alt="WiFi Icon" />
            </div>
            <span style={{ marginRight: '10px' }}>Free Wifi</span>
          </>
        )}

        {listing && listing['has_breakfast?'] && (
          <>
            <div className="coffee" style={{ display: 'inline-block', borderRadius: '50%', padding: '5px', marginRight: '5px' }}>
              <img src={CoffeeSVG} alt="Coffee Icon" />
            </div>
            <span style={{ marginRight: '10px' }}>Breakfast</span>
          </>
        )}

        <span onClick={() => handleTabClick('Facilities')} style={{ textDecoration: 'underline', cursor: 'pointer' }}>View all facilities</span>
      </div>

      <br/>
      <br/>

      <div className="tabs">
        <div className="tabs" style={{ display: 'flex', alignItems: 'center', marginLeft: "10%"}}>
          <span className="tabs-name" onClick={() => handleTabClick('Rooms')} style={{ cursor: 'pointer' }}>Rooms</span>
          <span className="tabs-name" onClick={() => handleTabClick('About')} style={{ cursor: 'pointer' }}>About</span>
          <span className="tabs-name" onClick={() => handleTabClick('House Rules')} style={{ cursor: 'pointer' }}>House Rules</span>
          <span className="tabs-name" onClick={() => handleTabClick('Map')} style={{ cursor: 'pointer' }}>Location</span>
          {numberOfReviews(listing?.id) !== 0 &&
            <span className="tabs-name" onClick={() => handleTabClick('Reviews')} style={{ cursor: 'pointer' }}>Reviews</span>
          }
        </div>
      </div>
  <div style={{display: "flex", marginRight: "10%"}}>
    <div style={{marginRight: "1.5%", marginLeft: "10%"}}>
        <div className="about"> About
            <p className="about-description"> {listing?.description} </p>
        </div>
            <div className="read-more-hov"  onClick={() => handleTabClick('About')}>
              <p className="read-more">Read more</p>
              <img src={MyArrowSVG} style={{ width: '14px' }}/>
          </div>

          <ChooseRoom listingId={listingId} cartItems={cartItems} cart={cart} />

          <div className="house-rules"> House Rules</div>

          <div className="checkInandOut">
            <div className="checkInContainer">
              <img className="checkIn" src={checkInPic} style={{ width: '18px' }}/>
              <div className="checkInText">
                Check In
                <div className="check_in"> {listing?.check_in}
                </div>
              </div>
            </div>
            <div className="separator"></div>
            <div className="checkOutContainer">
              <img className="checkOut" src={checkOutPic} style={{ width: '18px' }}/>
              <div className="checkOutText">
                Check Out
                <div className="check_out"> until {listing?.check_out}
                </div>
              </div>
            </div>
          </div>
          <div className="view-house-rules"  onClick={() => handleTabClick('House Rules')}>
                <p className="read-more">View all the house rules</p>
                <img src={MyArrowSVG} style={{ width: '14px' }}/>
          </div>

          <div style={{borderBottom: "1px solid #ccc", paddingBottom: "10px"}}>
          <div className="facilities">Facilities
            <div className="facilities-snippet" style={{marginTop: ".5rem"}}>
                <div className="facilities-category" style={{marginLeft: ".5rem"}}>
                    {allValues?.slice(0, 8).map((value, index) => (
                      <div key={index} className={`facility-item ${index < 4 ? 'first-four' : 'last-four'}`}>
                          <div className="facilities-icon2">
                            <FacilityIcon item={value} />
                            </div>
                          {value}
                        </div>
                    ))}
                </div>
            </div>
        </div>

          {allValues?.length > 8 &&
          <div className="view-house-rules"  onClick={() => handleTabClick('Facilities')}>
                <p className="read-more">View all facilities</p>
                <img src={MyArrowSVG} style={{ width: '14px' }}/>
          </div>
          }
          </div>

          <ListingReviewSection numberOfReviews={numberOfReviews} listing={listing} reviews={reviews} MyArrowSVG={MyArrowSVG} tabName={tabName}/>

          <div className="fakemap">
            <p className="location-text">Location</p>
            <img className="mapsvg" src={MapSVG} alt="Map Icon" />
            <div className="address-info">
                <p>{listing?.address}</p>
                <p>{listing?.city}, {listing?.country}</p>
            </div>

            <div className="viewMap" onClick={() => handleTabClick('Map')}>
              View Map
              <img src={MyArrowSVG} style={{ width: '14px', marginLeft: "10px", marginRight: "0px" }}/>
            </div>
          </div>
        </div>

        {start_date &&
        <CheckoutForm checkIn={start_date} checkOut={end_date} listingId={listingId} listingName={listing?.property_name} photoUrl={listing?.photoUrls[0]}/>
        }
        
    </div>
    <Footer/>
    </>
  );
}

export default ListingsShowPage;