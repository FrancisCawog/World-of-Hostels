import locationPic from "../../assets/pictures/icons/location-pin-svgrepo-com.svg";
import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { setCheckIn, setCheckOut, updateGuests, setLocation } from "../../store/cart";
import { useDispatch, useSelector } from "react-redux";
import users from "../../assets/pictures/icons/17115.png"
import arrow from "../../assets/pictures/icons/icons8-arrow-30.png"
import add from "../../assets/pictures/icons/plus-bold-svgrepo-com.svg"
import grayadd from "../../assets/pictures/icons/plus-gray-svgrepo-com copy.svg"
import minus from "../../assets/pictures/icons/minus-sign-of-a-line-in-horizontal-position-svgrepo-com regular.svg"
import grayminus from "../../assets/pictures/icons/minus-sign-of-a-line-in-horizontal-position-svgrepo-com.svg"

function SearchBar() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const listings = useSelector((state) => state.listings)
  const history = useHistory();
  const guestsSelectionRef = useRef(null);
  
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [location, setLocations] = useState("");
  const [checkInDate, setCheckInDate] = useState(today.toISOString().split("T")[0]);
  const [checkOutDate, setCheckOutDate] = useState(tomorrow.toISOString().split("T")[0]);
  const [guests, setGuests] = useState(1);

  const [uniqueCities, setUniqueCities] = useState([]);
  const [isInputFocused, setInputFocused] = useState(false);
  const [isInputGuestFocused, setInputGuestFocused] = useState(false);

  const handleLocationChange = (e) => {
    setLocations(e.target.value);
  };

  const handleCheckInDateChange = (e) => {
    setCheckInDate(e.target.value);
  };

  const handleCheckOutDateChange = (e) => {
    setCheckOutDate(e.target.value);
  };

  const handleGuestsChange = (action) => {
    if (action === 'add') {
      setGuests(prevGuests => (prevGuests < 10) ? prevGuests + 1 : prevGuests);
    } else if (action === 'subtract') {
      setGuests(prevGuests => (prevGuests > 1) ? prevGuests - 1 : prevGuests);
    }
  };  

  useEffect(() => {
    if (cart.checkIn !== "") {
      setLocations(cart.location)
      setCheckInDate(cart.checkIn);
      setCheckOutDate(cart.checkOut);
      setGuests(parseInt(cart.guests, 10) || 1)
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

  const handleGuestInputFocus = () => {
    setInputGuestFocused(true);
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

  const handleGuestsSelectionClick = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (guestsSelectionRef.current && !guestsSelectionRef.current.contains(event.target)) {
        setInputGuestFocused(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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
                        type="text"
                        name="guests"
                        id="guests"
                        onChange={handleGuestsChange}
                        value={guests}
                        autoComplete="off"
                        onFocus={handleGuestInputFocus}
                        readOnly
                        ref={guestsSelectionRef} 
                        onClick={handleGuestsSelectionClick}
                      />
                      <label className="input-label4">
                        Guests
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {isInputGuestFocused && (
                <div className="guests-selection" ref={guestsSelectionRef} onClick={handleGuestsSelectionClick}>
                  <div className="guests-inner-selection">
                    <div className="guests-label-selection"> 
                      <div>
                        <img src={users} style={{width: "20px", height: "20px", marginTop: "5px"}}/>
                      </div>
                      <span>
                        Guests
                      </span>
                    </div>

                    <div className="guests-counter"> 
                      {guests > 1 ? (
                      <button className="guests-minus" onClick={() => handleGuestsChange('subtract')}>
                        <img src={minus} alt="Minus" />
                      </button> 
                      ):( 
                        <button className="guests-minus" style={{pointerEvents: 'none', boxShadow: "rgb(211, 211, 211) 0px 0px 0px 0.125rem inset "}}>
                          <img src={grayminus} alt="Minus" />
                        </button>
                      )}

                      <input className="guests-counter-number"
                        type="text"
                        name="guests"
                        id="guests"
                        value={guests}
                        autoComplete="off"
                        onChange={handleGuestsChange}
                        readOnly
                      />
                      {guests !== 10 ? (
                      <button className="guests-plus" onClick={() => handleGuestsChange('add')}>
                        <img src={add} alt="add" />
                      </button> 
                      ):( 
                        <button className="guests-plus" style={{pointerEvents: 'none', boxShadow: "rgb(211, 211, 211) 0px 0px 0px 0.125rem inset "}}>
                          <img src={grayadd} alt="add" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
          
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