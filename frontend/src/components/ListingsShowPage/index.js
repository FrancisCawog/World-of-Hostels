import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchListing, fetchListings } from "../../store/listings";
import ChooseRoom from "./ChooseRoom";
import "./ListingShow.css";
import WifiSVG from "../../assets/pictures/icons/wifi.svg"
import CoffeeSVG from "../../assets/pictures/icons/coffee.svg"
import MapSVG from "../../assets/pictures/icons/map-icon.svg"
import MyArrowSVG from "../../assets/pictures/icons/right-arrow-svgrepo-com.svg"
import checkInPic from "../../assets/pictures/icons/Screenshot 2023-11-17 at 1.50.07 PM.png"
import checkOutPic from "../../assets/pictures/icons/Screenshot 2023-11-17 at 1.49.46 PM.png"
import StarSVG from "../../assets/pictures/icons/Yellow_Star_with_rounded_edges.svg.png"
import ListingsModal from "../ListingsModal";
import ListingsShowReviewModal from "../ListingsShowReviewModal";
import Navigation from "../Navigation";
import Footer from "../Footer"
import CheckoutForm from "../Checkout"
import { setCheckIn, setCheckOut, updateGuests, setLocation } from "../../store/cart";
import { fetchUsers } from "../../store/users";
import FacilityIcon from "../../components/FacilityIcon/index.js";
const restCountriesData = await fetch("https://restcountries.com/v3.1/all?fields=name,independent,cca3").then(res => res.json());

function ListingsShowPage() {
  const dispatch = useDispatch();
  const { listingId } = useParams();
  const listing = useSelector((state) => state?.listings[listingId]);
  const photos = listing?.photoUrls;
  const reviews = useSelector((state) => state?.reviews);
  const users = useSelector((state) => state?.users);
  const reservations = useSelector((state) => state?.reservations);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [tabName, settabName] = useState();
  const cart = useSelector((state) => state?.cart);
  const start_date = cart.checkIn;
  const end_date = cart.checkOut;
  const cartItems = useSelector((state) => state?.cart.cart);
  const defaultPic = "https://world-of-hostels-seeds.s3.amazonaws.com/profile_pics/user8.jpeg"
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

  useEffect(() => {
    dispatch(fetchUsers()).catch((error) => {
      console.error("Error fetching users:", error);
    });
  }, [dispatch]);

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

  useEffect(() => {
    if (showReviewModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto'; 
    };
  }, [showReviewModal]);

  const closeReviewModal = () => {
    setShowReviewModal(false);
  };

  const averageTotalScore = (listingId) => {
    const listingReviews = Object.values(reviews).filter(review => review.listing_id === listingId);
    
    if (!listingReviews.length) {
      return 0.0;
    }
  
    const totalScoreSum = listingReviews.reduce(
      (accumulator, review) => accumulator + review.total_score,
      0
    );
    return totalScoreSum / listingReviews.length;
  };  

  const numberOfReviews = (listingId) => {
    const listingReviews = Object.values(reviews).filter(review => review.listing_id === listingId);
    return listingReviews.length
  }

  const reviewWordRating = (listingId) => {
    const listingReviews = Object.values(reviews).filter(review => review.listing_id === listingId);
    const totalScoreSum = listingReviews.reduce(
      (accumulator, review) => accumulator + review.total_score,
      0
    );
    const average = totalScoreSum / listingReviews.length;
    if (average >= 9){
      return "Superb"
    } else if (average >= 8.0) {
      return "Fabulous"
    } else if (average >= 7.0) {
      return "Very Good"
    } else if (average >= 6.0) {
      return "Good"
    } else {
      return ""
    }
  }

  const catRating = (listingId, category) => {
    const listingReviews = Object.values(reviews).filter(review => review.listing_id === listingId);
    const totalCategorySum = listingReviews.reduce(
      (accumulator, review) => accumulator + review[category], 
      0
    );
    return totalCategorySum / listingReviews.length;
  }

  const conditionalHeight = () => {
    if (numberOfReviews(listing?.id) <= 2) {
      return {height: "520px"}
    } else if (numberOfReviews(listing?.id) > 2){
      return {height: "900px"}
    }
  }

  const extractDate = (listingId, num) => {
    const listingReviews = Object.values(reviews).filter(review => review.listing_id === listingId);
    const numberedElement = listingReviews[num]
    const reservationId = numberedElement.reservation_id;
    const reservation = Object.values(reservations).find(reservation => reservation?.id === reservationId);
    const date = new Date(reservation?.start_date);
    const options = { year: 'numeric', month: 'short' };
    return date.toLocaleDateString('en-US', options);
  }

  const extractRating = (listingId, num) => {
    const listingReviews = Object.values(reviews).filter(review => review.listing_id === listingId);
    const numberedElement = listingReviews[num]
    return numberedElement.total_score
  }

  const extractName = (listingId, num) => {
    const listingReviews = Object.values(reviews).filter(review => review.listing_id === listingId);
    const numberedElement = listingReviews[num]
    const userId = numberedElement.user_id;
    const user = Object.values(users).find(user => user.id === userId);
    const abbreviatedLastName = user?.last_name.charAt(0);
    const firstName = user?.first_name
    return `${firstName} ${abbreviatedLastName}.`;
  }

  const extractDemographic = (listingId, num) => {
    const listingReviews = Object.values(reviews).filter(review => review.listing_id === listingId);
    const numberedElement = listingReviews[num];
    const userId = numberedElement.user_id;
    const user = Object.values(users).find(user => user.id === userId);
    const nationality = user?.nationality;
    const matchingCountry = restCountriesData.find(country => country.name.common === nationality);
    const ageGroup = numberedElement.age_group;
    let gender = numberedElement.about_you;
    gender = gender.charAt(0).toUpperCase() + gender.slice(1);
  
    return `${gender}, ${ageGroup}, ${matchingCountry ? matchingCountry.cca3 : nationality}`;
  };
  
  const extractPicture = (listingId, num) => {
    const listingReviews = Object.values(reviews).filter(review => review.listing_id === listingId);
    const numberedElement = listingReviews[num]
    const userId = numberedElement.user_id;
    const user = Object.values(users).find(user => user.id === userId);
    if (user) {
      return user.photoUrl
    }
  }

  const extractFeedback = (listingId, num) => {
    const listingReviews = Object.values(reviews).filter(review => review.listing_id === listingId);
    const numberedElement = listingReviews[num]
    return numberedElement.feedback
  }
  
  return (
    <>
    {showAboutModal && <ListingsModal tabName={tabName} onClose={closeModal} />}
    {showReviewModal && <ListingsShowReviewModal tabName={tabName} onClose={closeReviewModal} reviews={reviews}/>}
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

          {numberOfReviews(listing?.id) !== 0 &&
          <div id="show-reviews" className="show-reviews">
            <div className="purple-container">
                <div className="angled-box" style={conditionalHeight()}>
                    <div className="skewed-wrapper">
                        <div>
                          {numberOfReviews(listing?.id) > 1 &&
                            <span id="reviews">Reviews</span>
                          }
                          {numberOfReviews(listing?.id) === 1 &&
                            <span id="reviews">Review</span>
                          }
                            <div id="review-box">
                              <div className="review-rating-box"> 
                                <div className="listing-review-star-and-rating" style={{marginTop: "10px"}}>
                                  <img style={{width: "24px", height: "24px"}} src={StarSVG}/>
                                  <p>
                                    <span className="total-score" style={{marginRight: "10px", fontFamily: "Poppins-bold"}}>
                                      {averageTotalScore(listing?.id).toFixed(1)}
                                    </span>
                                    <span style={{ fontSize: '16px' }}>
                                      {reviewWordRating(listing?.id)}
                                    </span>
                                  </p>
                                </div>
                                <p style={{ fontSize: '20px', marginTop: "5px" }}>({numberOfReviews(listing?.id)} Reviews)</p>
                              </div>
                              <ul className="rating-cats">

                                <div className="rating-cats-tab">
                                  <div className="category-label">
                                    <p>Security</p>
                                  </div>
                                  <div className="rating-bar-and-score">
                                    <div className="rating-bars">
                                      <div className="gray-bar"></div>
                                      <div className="yellow-bar" style={{ width: `${catRating(listing?.id, 'security') * 0.475}rem` }}></div>
                                    </div>
                                    <p>{catRating(listing?.id, 'security').toFixed(1)}</p>
                                  </div>
                                </div>

                                <div className="rating-cats-tab">
                                  <div className="category-label">
                                    <p>Location</p>
                                  </div>
                                  <div className="rating-bar-and-score">
                                    <div className="rating-bars">
                                      <div className="gray-bar"></div>
                                      <div className="yellow-bar" style={{ width: `${catRating(listing?.id, 'location') * 0.475}rem` }}></div>
                                    </div>
                                    <p>{catRating(listing?.id, 'location').toFixed(1)}</p>
                                  </div>
                                </div>

                                <div className="rating-cats-tab">
                                  <div className="category-label">
                                    <p>Staff</p>
                                  </div>
                                  <div className="rating-bar-and-score">
                                    <div className="rating-bars">
                                      <div className="gray-bar"></div>
                                      <div className="yellow-bar" style={{ width: `${catRating(listing?.id, 'staff') * 0.475}rem` }}></div>
                                    </div>
                                    <p>{catRating(listing?.id, 'staff').toFixed(1)}</p>
                                  </div>
                                </div>

                                <div className="rating-cats-tab">
                                  <div className="category-label">
                                    <p>Atmosphere</p>
                                  </div>
                                  <div className="rating-bar-and-score">
                                    <div className="rating-bars">
                                      <div className="gray-bar"></div>
                                      <div className="yellow-bar" style={{ width: `${catRating(listing?.id, 'atmosphere') * 0.475}rem` }}></div>
                                    </div>
                                    <p>{catRating(listing?.id, 'atmosphere').toFixed(1)}</p>
                                  </div>
                                </div>

                                <div className="rating-cats-tab">
                                  <div className="category-label">
                                    <p>Cleanliness</p>
                                  </div>
                                  <div className="rating-bar-and-score">
                                    <div className="rating-bars">
                                      <div className="gray-bar"></div>
                                      <div className="yellow-bar" style={{ width: `${catRating(listing?.id, 'cleanliness') * 0.475}rem` }}></div>
                                    </div>
                                    <p>{catRating(listing?.id, 'cleanliness').toFixed(1)}</p>
                                  </div>
                                </div>

                                <div className="rating-cats-tab">
                                  <div className="category-label">
                                    <p>Facilities</p>
                                  </div>
                                  <div className="rating-bar-and-score">
                                    <div className="rating-bars">
                                      <div className="gray-bar"></div>
                                      <div className="yellow-bar" style={{ width: `${catRating(listing?.id, 'facilities') * 0.475}rem` }}></div>
                                    </div>
                                    <p>{catRating(listing?.id, 'facilities').toFixed(1)}</p>
                                  </div>
                                </div>

                                <div className="rating-cats-tab">
                                  <div className="category-label">
                                    <p>Value for Money</p>
                                  </div>
                                  <div className="rating-bar-and-score">
                                    <div className="rating-bars">
                                      <div className="gray-bar"></div>
                                      <div className="yellow-bar" style={{ width: `${catRating(listing?.id, 'value_for_money') * 0.475}rem` }}></div>
                                    </div>
                                    <p>{catRating(listing?.id, 'value_for_money').toFixed(1)}</p>
                                  </div>
                                </div>

                              </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="side-divs">
                {numberOfReviews(listing?.id) >= 1 &&
                <div className="side-div">
                  <div className="date-and-rating">
                    <p style={{marginTop: "25px"}}>Stayed in {extractDate(listing?.id, (numberOfReviews(listing?.id) - 1))}</p>
                    <div className="star-and-rating">
                      <img src={StarSVG} style={{width: "20px", height: "20px"}}/>
                      <p>{extractRating(listing?.id, (numberOfReviews(listing?.id) - 1))}</p>
                    </div>
                  </div>

                  <div className="pic-name-and-info">
                    <div className="review-profile-pic">
                      <img src={extractPicture(listing?.id, (numberOfReviews(listing?.id) - 1)) || defaultPic} style={{width: "2.25rem", height: "2.25rem", borderRadius: "50%"}}/>
                    </div>
                    <div className="review-name-info">
                      <p>{extractName(listing?.id, (numberOfReviews(listing?.id) - 1))}</p>
                      <p>{extractDemographic(listing?.id, (numberOfReviews(listing?.id) - 1))}</p>
                    </div>
                  </div>

                  <div className="review-feedback">
                    <p>{extractFeedback(listing?.id, (numberOfReviews(listing?.id) - 1))}</p>
                  </div>
                </div>
                }
                {numberOfReviews(listing?.id) >= 2 &&
                <div className="side-div">
                <div className="date-and-rating">
                  <p style={{marginTop: "25px"}}>Stayed in {extractDate(listing?.id, (numberOfReviews(listing?.id) - 2))}</p>
                  <div className="star-and-rating">
                    <img src={StarSVG} style={{width: "20px", height: "20px"}}/>
                    <p>{extractRating(listing?.id, (numberOfReviews(listing?.id) - 2))}</p>
                  </div>
                </div>

                <div className="pic-name-and-info">
                  <div className="review-profile-pic">
                    <img src={extractPicture(listing?.id, (numberOfReviews(listing?.id) - 2)) || defaultPic} style={{width: "2.25rem", height: "2.25rem", borderRadius: "50%"}}/>
                  </div>
                  <div className="review-name-info">
                    <p>{extractName(listing?.id, (numberOfReviews(listing?.id) - 2))}</p>
                    <p>{extractDemographic(listing?.id, (numberOfReviews(listing?.id) - 2))}</p>
                  </div>
                </div>

                <div className="review-feedback">
                  <p>{extractFeedback(listing?.id, (numberOfReviews(listing?.id) - 2))}</p>
                </div>
              </div>
                }
                {numberOfReviews(listing?.id) >= 3 &&
                <div className="side-div">
                <div className="date-and-rating">
                  <p style={{marginTop: "25px"}}>Stayed in {extractDate(listing?.id, (numberOfReviews(listing?.id) - 3))}</p>
                  <div className="star-and-rating">
                    <img src={StarSVG} style={{width: "20px", height: "20px"}}/>
                    <p>{extractRating(listing?.id, (numberOfReviews(listing?.id) - 3))}</p>
                  </div>
                </div>

                <div className="pic-name-and-info">
                  <div className="review-profile-pic">
                    <img src={extractPicture(listing?.id, (numberOfReviews(listing?.id) - 3)) || defaultPic} style={{width: "2.25rem", height: "2.25rem", borderRadius: "50%"}}/>
                  </div>
                  <div className="review-name-info">
                    <p>{extractName(listing?.id, (numberOfReviews(listing?.id) - 3))}</p>
                    <p>{extractDemographic(listing?.id, (numberOfReviews(listing?.id) - 3))}</p>
                  </div>
                </div>

                <div className="review-feedback">
                  <p>{extractFeedback(listing?.id, (numberOfReviews(listing?.id) - 3))}</p>
                </div>
              </div>
                }
                {numberOfReviews(listing?.id) >= 4 &&
                <div className="view-reviews" onClick={() => setShowReviewModal(true)}>
                  <p className="read-more" >View all reviews</p>
                  <img src={MyArrowSVG} style={{ width: '14px' }}/>
                </div>
                }
            </div>
          </div>

        }

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