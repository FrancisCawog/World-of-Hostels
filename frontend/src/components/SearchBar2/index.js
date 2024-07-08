import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { setCheckIn, setCheckOut, updateGuests, setLocation } from "../../store/cart";
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { DateRange } from 'react-date-range';
import locationPic from "../../assets/pictures/icons/location-pin-svgrepo-com.svg";
import xImage from "../../assets/pictures/icons/close-x.svg";
import users from "../../assets/pictures/icons/17115.png";
import glass from "../../assets/pictures/icons/icons8-search (1).svg";
import add from "../../assets/pictures/icons/plus-bold-svgrepo-com.svg";
import grayadd from "../../assets/pictures/icons/plus-gray-svgrepo-com copy.svg";
import minus from "../../assets/pictures/icons/minus-sign-of-a-line-in-horizontal-position-svgrepo-com regular.svg";
import grayminus from "../../assets/pictures/icons/minus-sign-of-a-line-in-horizontal-position-svgrepo-com.svg";
import "./SearchBar2.css";

function SearchBar2() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const listings = useSelector((state) => state.listings);
  const history = useHistory();
  const guestsSelectionRef = useRef(null);
  const destinationContainerRef = useRef(null);
  const today = new Date(new Date().toLocaleString("en-US", {timeZone: "America/New_York"}));
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);  
  
  const [location, setLocations] = useState("");
  const [checkInDate, setCheckInDate] = useState(today.toISOString().split("T")[0]);
  const [checkOutDate, setCheckOutDate] = useState(tomorrow.toISOString().split("T")[0]);
  const [guests, setGuests] = useState(1);

  const [uniqueCities, setUniqueCities] = useState([]);
  const [isInputFocused, setInputFocused] = useState(false);
  const [isInputGuestFocused, setInputGuestFocused] = useState(false);
  const [isLocationComplete, setIsLocationComplete] = useState(true);
  const locationPath = useLocation();
  const isListingsPage = locationPath.pathname.startsWith("/listings");

  const handleLocationChange = (e) => {
    setLocations(e.target.value);
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
  }, []);
  
  const handleSearch = () => {
    if (!uniqueCities.includes(location)) {
      document.getElementById("location").focus();
      setIsLocationComplete(false);
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

    localStorage.setItem('checkInDate', cartData.checkIn);
    localStorage.setItem('checkOutDate', cartData.checkOut);
    localStorage.setItem('guests', guests);
    history.push("/listings");
  };

  useEffect(() => {
    dispatch(updateGuests(guests));
  }, [guests]);

  useEffect(()=>{
    setLocations(cart.location)
  },[cart.location])

  useEffect(()=>{
    setCheckInDate(cart.checkIn);
    setCheckOutDate(cart.checkOut);
  },[cart.checkIn, cart.checkOut])

  useEffect(()=>{
    setGuests(parseInt(cart.guests))
  },[cart.guests])

  useEffect(() => {
    if (checkInDate !== null){
      dispatch(setCheckIn(checkInDate));
    }
  }, [checkInDate])

  useEffect(() => {
    if (checkOutDate !== null){
      dispatch(setCheckOut(checkOutDate));
    }
  }, [checkOutDate])

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (destinationContainerRef.current && !destinationContainerRef.current.contains(event.target)) {
        setIsLocationComplete(true);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);  

  const handleDestinationButtonClick = (city) => {
    clearTimeout(blurTimeout);
    setIsLocationComplete(true);
    setInputFocused(false);
    setLocations(city);
  };

  const [range, setRange] = useState([
      {
          startDate: checkInDate,
          endDate: checkOutDate,
          key: 'selection'
        }
    ])
        
    const [dateSelectionCount, setDateSelectionCount] = useState(0);

    const handleDateRangeChange = (item) => {
      const startDate = formatDate(item.selection.startDate);
      const endDate = formatDate(item.selection.endDate);
      
      setCheckInDate(startDate);
      setCheckOutDate(endDate);
      setRange([item.selection]);
      setDateSelectionCount(dateSelectionCount + 1);

      if (dateSelectionCount === 1 && open) {
        setOpen(false);
      }
    };
    
    useEffect(() => {
      if (dateSelectionCount === 2) {
        setDateSelectionCount(0);
      }
    }, [dateSelectionCount]);
    
    const formatDate = (date) => {
      if (!(date instanceof Date) || isNaN(date.getTime())) {
        return "";
      }
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    
  const [open, setOpen] = useState(false)
  const refOne = useRef(null)

  const handleGuestsSelectionClick = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isCalendarClicked = refOne.current && refOne.current.contains(event.target);
      const isGuestsClicked = guestsSelectionRef.current && guestsSelectionRef.current.contains(event.target);
  
      if (!isCalendarClicked) {
        setOpen(false);
      }
  
      if (!isGuestsClicked) {
        setInputGuestFocused(false);
      }
    };
  
    document.addEventListener("click", handleClickOutside);
  
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);  

  const formatDates = (dateString) => {
    const date = new Date(dateString + 'T00:00:00');
    if (isNaN(date.getTime())) {
      return "";
    }
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthIndex = date.getUTCMonth();
    const month = monthNames[monthIndex];
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${day} ${month}`;
  };

  const [blurTimeout, setBlurTimeout] = useState(null);
  const handleInputBlur = () => {
    const timeoutId = setTimeout(() => {
      if (isLocationComplete){
        setInputFocused(false);
      }
    }, 200);

    setBlurTimeout(timeoutId);
  };
  
    return (
        <div className="search-form-container">
            <div className="search-form-wrapper">
                <div className="search-form-inline">
                    <div className={`inline-form-small ${isListingsPage ? 'listings' : ''}`}>
                        <div className="destination-container">
                            <div className="destination-container-input" ref={destinationContainerRef}>
                                <div className="input-inner-prefix">
                                    <div className="search-input-prefix">
                                        <div className="search-input-prefix-icon-cont">
                                            <img style={{marginTop: "-5px", width:"20px", height:"20px"}} src={locationPic}/>
                                        </div>
                                    </div>
                                    <div className={`input-wrapper ${(location !== "" && location !== null) ? 'non-empty' : ''}`} >
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
                                
                                {(location !== "" && location !== null) &&
                                    <div className="input-x">
                                        <div className="input-button-x">
                                            <div className="input-reset" onClick={() => setLocations("")}>
                                                <img src={xImage}/>
                                            </div>
                                        </div>
                                    </div>
                                }

                                </div>
                            {isInputFocused && (
                                <div className="destination-selection" style={{width: "80%"}}>
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
                        </div>

                        <div className="divider"/>

                        <div className="dates" style={{width: "40%"}}>
                            <div className="checkin-checkout" >
                                <div className="checkin-input">
                                <div className="input-with-label" >
                                    <div className="input-prefix">
                                    <img/>
                                    </div>
                                    <div className="input-wrapper">
                                    <input
                                        value={`${formatDates(checkInDate)} - ${formatDates(checkOutDate)}`}
                                        readOnly
                                        className="inputBox"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setInputGuestFocused(false)
                                          setOpen(open => !open);
                                      }}
                                        style={{paddingLeft: "1rem", marginBottom: "12px"}}
                                    />

                                    <div className="searchBar2-cal" ref={refOne}>
                                        {open && 
                                        <DateRange
                                            onChange={handleDateRangeChange}
                                            editableDateInputs={true}
                                            moveRangeOnFirstSelection={false}
                                            ranges={range}
                                            months={2}
                                            direction="horizontal"
                                            className="calendarElement"
                                        />
                                        }
                                    </div>
                                    <label className="input-label2" style={{marginLeft: "0"}}>
                                        Dates
                                    </label>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>

                        <div className="divider"/>

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
                                        onClick={(e) => {
                                          handleGuestsSelectionClick(e);
                                          setOpen(false);
                                      }}                                      
                                    />
                                    <label className="input-label4">
                                        Guests
                                    </label>
                                </div>
                            </div>
                            </div>
                        </div>

                            {isInputGuestFocused && (
                                <div className={`guests-selection2 ${isListingsPage ? 'listings' : 'users'}`} ref={guestsSelectionRef} onClick={handleGuestsSelectionClick} >
                                <div className="guests-inner-selection">
                                <div className="guests-label-selection"> 
                                <div>
                                <img src={users} style={{width: "20px", height: "20px", marginTop: "5px"}}/>
                                </div>
                                <span>
                                Guests
                                </span>
                                </div>
                                
                                <div className="guests-counter" style={{marginLeft: "5px"}}> 
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
                    
                        <button className="let-go-button" onClick={handleSearch} style={{height: "50px", display: "flex", alignItems: "center", padding: "0px", width: "50px"}} ref={destinationContainerRef}>
                            <img src={glass} style={{width: "24px", height: "24px", marginLeft: "10px"}}/>
                        </button>
                    </div>
                    </div>
                </div>
            </div>
    )
}

export default SearchBar2;