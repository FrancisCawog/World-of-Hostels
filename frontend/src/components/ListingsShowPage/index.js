import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchListing } from "../../store/listings";
import "./ListingShow.css";
import WifiSVG from "../../assets/pictures/icons/wifi.svg"
import CoffeeSVG from "../../assets/pictures/icons/coffee.svg"
import MapSVG from "../../assets/pictures/icons/map-icon.svg"
import MyArrowSVG from "../../assets/pictures/icons/right-arrow-svgrepo-com.svg"
import checkIn from "../../assets/pictures/icons/Screenshot 2023-11-17 at 1.50.07 PM.png"
import checkOut from "../../assets/pictures/icons/Screenshot 2023-11-17 at 1.49.46 PM.png"
import person from "../../assets/pictures/icons/user-128.svg"
import add from "../../assets/pictures/icons/plus-bold-svgrepo-com.svg"
import ListingsModal from "../ListingsModal";

function ListingsShowPage() {
  const dispatch = useDispatch();
  const { listingId } = useParams();
  const listing = useSelector((state) => state.listings[listingId]);
  const rooms = useSelector((state) => Object.values(state.rooms))
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [tabName, settabName] = useState();

  useEffect(() => {
    dispatch(fetchListing(listingId))
      .catch((error) => {
        console.error("Error fetching listing:", error);
      });
  }, [listingId, dispatch]);

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
    }
  }

  const closeModal = () => {
    setShowAboutModal(false);
  };
  
  return (
    <>
      <div className="top-picture"></div>
      <h1 className="title">{listing?.property_name}</h1>
      <p className="listings-p">
        {listing?.property_type &&
          listing?.property_type.charAt(0).toUpperCase() + listing?.property_type.slice(1)}
        <span style={{ margin: '0 5px', color: 'black' }}>•</span>
        {listing?.city}, {listing?.country}
        <span style={{ margin: '0 5px' }}>•</span>
        <a href="#" style={{ textDecoration: 'underline', color: "black" }}>View Map</a>
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

        <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>View all facilities</span>
      </div>

      <br/>
      <br/>

      <div className="tabs">
        <div className="tabs" style={{ display: 'flex', alignItems: 'center', marginLeft: "10%"}}>
          <span className="tabs-name" onClick={() => handleTabClick('Rooms')} style={{ cursor: 'pointer' }}>Rooms</span>
          <span className="tabs-name" onClick={() => handleTabClick('About')} style={{ cursor: 'pointer' }}>About</span>
          <span className="tabs-name" onClick={() => handleTabClick('House Rules')} style={{ cursor: 'pointer' }}>House Rules</span>
          <span className="tabs-name" onClick={() => handleTabClick('Location')} style={{ cursor: 'pointer' }}>Location</span>
          <span className="tabs-name" onClick={() => handleTabClick('Reviews')} style={{ cursor: 'pointer' }}>Reviews</span>
        </div>
      </div>
      {showAboutModal && <ListingsModal tabName={tabName} onClose={closeModal} />}
      <div>
  <div id="choose-room" className="choose-room">Choose your room</div>
    {rooms && (
      <>
        {rooms.some(room => room.room_type === "private") && (
          <>
            <p className="room-type">Private Rooms</p>
            {rooms
              .filter(room => room.room_type === "private")
              .map((privateRoom, index) => (
                <div key={index}>
                  <div className="private-room-div">
                    <div className="private-picture-box"></div>
                    <div className="room-description-box">
                      <p className="room-title">{privateRoom.room_title}</p>
                      <p className="room-description">{privateRoom.description}</p>
                      <div className="sleeps-info">
                        <img src={person} style={{ width: "24px" }} alt="Person icon" />
                        <p>Sleeps {privateRoom.num_beds}</p>
                      </div>
                      <hr className="line" />
                      <p className="room-info">Prices are per room</p>
                      <br/>
                      <p className="room-info">Taxes Not Included</p>
                    </div>
                    <div className="price-box">
                      <div>
                        <div>
                          <p style={{marginTop: "0px"}}>Free Cancellation</p>
                          <p style={{fontFamily: "Poppins-bold"}}>US${privateRoom.price.toFixed(2)} </p>
                        </div>

                        <div className="add-cart"><img src={add} style={{ width: "20px", marginLeft: "-10px", marginRight: "2px", marginBottom: "-3px" }} alt="add icon" /> Add</div>
                      </div>
                      <hr className="price-line" />
                      <div>
                        <div style={{marginTop: "-10px"}}>
                          <p>Non-refundable</p>
                          <p style={{fontFamily: "Poppins-bold"}}>US${(privateRoom.price * 0.95).toFixed(2)} </p>
                        </div>

                        <div className="add-cart"><img src={add} style={{ width: "20px", marginLeft: "-10px", marginRight: "2px", marginBottom: "-3px" }} alt="add icon" /> Add</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </>
        )}

        {rooms.some(room => room.room_type === "shared") && (
          <>
            <p className="room-type">Dorm Beds</p>
            {rooms
              .filter(room => room.room_type === "shared")
              .map((sharedRoom, index) => (
                <div key={index}>
                  <div className="dorm-bed-div">
                    <div className="shared-picture-box"></div>
                    <div className="room-description-box">
                      <p className="room-title">{sharedRoom.room_title}</p>
                      <p className="room-description">{sharedRoom.description}</p>
                      <div className="sleeps-info">
                        <img src={person} style={{ width: "24px" }} alt="Person icon" />
                        <p>Sleeps {sharedRoom.num_beds}</p>
                      </div>
                      <hr className="line" />
                      <p className="room-info">Prices are per bed</p>
                      <br/>
                      <p className="room-info">Taxes Not Included</p>
                    </div>
                    <div className="price-box">
                      <div>
                        <div>
                          <p style={{marginTop: "0px"}}>Free Cancellation</p>
                          <p style={{fontFamily: "Poppins-bold"}}>US${sharedRoom.price.toFixed(2)} </p>
                        </div>

                        <div className="add-cart"><img src={add} style={{ width: "20px", marginLeft: "-10px", marginRight: "2px", marginBottom: "-3px" }} alt="add icon" /> Add</div>
                      </div>
                      <hr className="price-line" />
                      <div>
                        <div style={{marginTop: "-10px"}}>
                          <p>Non-refundable</p>
                          <p style={{fontFamily: "Poppins-bold"}}>US${(sharedRoom.price * 0.95).toFixed(2)} </p>
                        </div>

                        <div className="add-cart"><img src={add} style={{ width: "20px", marginLeft: "-10px", marginRight: "2px", marginBottom: "-3px" }} alt="add icon" /> Add</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </>
        )}
      </>
    )}
  </div>



      <div className="about"> About
          <p className="about-description"> {listing?.description} </p>
      </div>
          <div className="read-more-hov"  onClick={() => handleTabClick('About')}>
            <p className="read-more">Read more</p>
            <img src={MyArrowSVG} style={{ width: '14px' }}/>
          </div>

      <div className="house-rules"> House Rules

      </div>

      <div className="checkInandOut">
        <div className="checkInContainer">
          <img className="checkIn" src={checkIn} style={{ width: '18px' }}/>
          <div className="checkInText">
            Check In
            <div className="check_in"> {listing?.check_in}
            </div>
          </div>
        </div>
        <div className="separator"></div>
        <div className="checkOutContainer">
          <img className="checkOut" src={checkOut} style={{ width: '18px' }}/>
          <div className="checkOutText">
            Check Out
            <div className="check_out"> until {listing?.check_out}
            </div>
          </div>
        </div>
      </div>
      <br/>
      <br/>
      <br/>
      <br/>
      <div className="view-house-rules"  onClick={() => handleTabClick('House Rules')}>
            <p className="read-more">View all the house rules</p>
            <img src={MyArrowSVG} style={{ width: '14px' }}/>
          </div>

      <div className="facilities"> Facilities

      </div>

      <div className="show-reviews">
        <div className="purple-container">
            <div className="angled-box">
                <div className="skewed-wrapper">
                    <div>
                        <span id="reviews">Reviews</span>
                        <div id="review-box">
                          <div className="review-rating-box"> 

                          </div>
                          <ul className="rating-cats">
                            <li>Security</li>
                            <li>Location</li>
                            <li>Staff</li>
                            <li>Atmosphere</li>
                            <li>Cleanliness</li>
                            <li>Facilities</li>
                            <li>Value for Money</li>
                          </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="side-divs">
            <div className="side-div"></div>
            <div className="side-div"></div>
            <div className="side-div"></div>
        </div>
      </div>

      <div className="fakemap">
        <p className="location-text">Location</p>
        <img className="mapsvg" src={MapSVG} alt="Map Icon" />
        <div className="address-info">
            <p>{listing?.address}</p>
            <p>{listing?.city}, {listing?.country}</p>
        </div>

        <div className="viewMap">
          View Map
          <img src={MyArrowSVG} style={{ width: '14px', marginLeft: "10px", marginRight: "0px" }}/>
        </div>
      </div>

      <div className="footer">
      </div>


    </>
  );
  
}

export default ListingsShowPage;