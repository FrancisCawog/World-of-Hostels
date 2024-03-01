import locationPic from "../../assets/pictures/icons/location-pin-svgrepo-com.svg";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { setCheckIn, setCheckOut, updateGuests, setLocation } from "../../store/cart";
import { useDispatch, useSelector } from "react-redux";
import users from "../../assets/pictures/icons/17115.png"
import arrow from "../../assets/pictures/icons/icons8-arrow-30.png"

function SearchBar() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const listings = useSelector((state) => state.listings)
  const history = useHistory();
  
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [location, setLocations] = useState("");
  const [checkInDate, setCheckInDate] = useState(today.toISOString().split("T")[0]);
  const [checkOutDate, setCheckOutDate] = useState(tomorrow.toISOString().split("T")[0]);
  const [guests, setGuests] = useState("1");

  const [uniqueCities, setUniqueCities] = useState([]);
  const [isInputFocused, setInputFocused] = useState(false);

  const handleLocationChange = (e) => {
    setLocations(e.target.value);
  };

  const handleCheckInDateChange = (e) => {
    setCheckInDate(e.target.value);
  };

  const handleCheckOutDateChange = (e) => {
    setCheckOutDate(e.target.value);
  };

  const handleGuestsChange = (e) => {
    setGuests(e.target.value);
  };

  useEffect(() => {
    if (cart.checkIn !== "") {
      setLocations(cart.location)
      setCheckInDate(cart.checkIn);
      setCheckOutDate(cart.checkOut);
      setGuests(cart.guests)
    }
  }, [cart]);

  const handleSearch = () => {
    if (!uniqueCities.includes(location)) {
      document.getElementById("location").focus();
      setInputFocused(true);
      return;
    }
  
    const cartData = {
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests: guests,
      location: location,
      refundable: true,
    };
  
    localStorage.setItem('cart', JSON.stringify(cartData));
  
    dispatch(setLocation(location));
    dispatch(setCheckIn(checkInDate));
    dispatch(setCheckOut(checkOutDate));
    dispatch(updateGuests(guests));
  
    localStorage.setItem('checkInDate', checkInDate);
    localStorage.setItem('checkOutDate', checkOutDate);
    localStorage.setItem('guests', guests);
    history.push("/listings");
  };

  useEffect(() => {
      const listingsArray = Object.values(listings);
      setUniqueCities([...new Set(listingsArray.map((listing) => `${listing.city}, ${listing.country}`))]);
  }, [listings]);

  const handleInputFocus = () => {
    setInputFocused(true);
  };

  const [blurTimeout, setBlurTimeout] = useState(null);
  const handleInputBlur = () => {
    const timeoutId = setTimeout(() => {
      setInputFocused(false);
    }, 200);

    setBlurTimeout(timeoutId);
  };

  const handleDestinationButtonClick = (city) => {
    clearTimeout(blurTimeout);
    setInputFocused(false);
    setLocations(city);
  };

  return (
    <div className="search-bar-container">
      <div className="searchbar-wrapper">
        <div className="inline-wrapper">
          <div className="inline-form">

            <div className="destination-container">
              <div className="input-strip">
                <div className="input-inner">
                  <div className="input-prefix">
                    <img  style={{marginTop: "-5px", width:"20px", height:"20px"}} src={locationPic}/>
                  </div>
                  <div className={`input-wrapper ${location !== "" ? 'non-empty' : ''}`}>
                  <input
                      type="text"
                      name="location"
                      id="location"
                      value={location}
                      onChange={handleLocationChange}
                      autoComplete="off"
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                    />
                    
                    <label className="input-label">
                      Where do you want to go?
                    </label>
                  </div>
                </div>
              </div> 

              {isInputFocused && (
                <div className="destination-selection">
                  <div className="destination-selection-ul">
                    {uniqueCities.map((city, index) => (
                      <div key={index} className="destination-selection-li">
                        <button className="destination-selection-button" onClick={() => handleDestinationButtonClick(city)}>
                          {city}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
     
            </div>

            <div className="divider"></div>

            <div className="dates">
              <div className="checkin-checkout">
                <div className="checkin-input">
                  <div className="input-with-label">
                    <div className="input-prefix">
                      <img/>
                    </div>
                    <div className="input-wrapper">
                      <input
                      style={{paddingLeft: "1rem"}}
                        type="date"
                        name="checkInDate"
                        id="checkInDate"
                        value={checkInDate}
                        onChange={handleCheckInDateChange}
                      />
                      <label className="input-label2">
                        Check In
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        
            <div className="divider"></div>

            <div className="dates">
              <div className="checkin-checkout">
                <div className="checkin-input">
                  <div className="input-with-label">
                    <div className="input-prefix">
                      <img/>
                    </div>
                    <div className="input-wrapper">
                      <input
                        style={{paddingLeft: "1rem"}}
                        type="date"
                        name="checkOutDate"
                        id="checkOutDate"
                        value={checkOutDate}
                        onChange={handleCheckOutDateChange}
                      />
                      <label className="input-label3">
                        Check Out
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="divider"></div>

            <div className="guests">
              <div className="guests-strip">
                <div className="guests-input">
                  <div className="input-with-label">
                    <div className="input-prefix">
                      <img src= {users} style={{width: "20px", height: "20px", marginTop: "4px"}}/>
                    </div>
                    <div className="input-wrapper">
                      <input
                        type="number"
                        name="guests"
                        id="guests"
                        placeholder="Guests"
                        value={guests}
                        onChange={handleGuestsChange}
                      />
                      <label className="input-label4">
                        Guests
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          
          <button className="let-go-button" onClick={handleSearch} style={{height: "50px", display: "flex", alignItems: "center"}}>
            Let's Go!
            <img src={arrow} style={{width: "24px", height: "24px", marginLeft: "10px"}}/>
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;