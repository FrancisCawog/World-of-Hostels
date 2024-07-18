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
import { DateRange } from 'react-date-range';
import CalendarSVG from "../../assets/pictures/icons/calendar-alt-svgrepo-com.svg"

function SearchBar() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const listings = useSelector((state) => state.listings)
  const history = useHistory();
  const guestsSelectionRef = useRef(null);
  
  const estOffset = -5 * 60; 
  const today = new Date(new Date().getTime() + estOffset * 60 * 1000).toISOString().split("T")[0];
  const unformattedTomorrow = new Date(new Date().getTime() + estOffset * 60 * 1000);
  unformattedTomorrow.setDate(unformattedTomorrow.getDate() + 1);
  const tomorrow = unformattedTomorrow.toISOString().split("T")[0];
  
  const [location, setLocations] = useState("");
  const [checkInDate, setCheckInDate] = useState(cart.checkIn || today);
  const [checkOutDate, setCheckOutDate] = useState(cart.checkOut || tomorrow);
  const [guests, setGuests] = useState(1);

  const [uniqueCities, setUniqueCities] = useState([]);
  const [isInputFocused, setInputFocused] = useState(false);
  const [isInputGuestFocused, setInputGuestFocused] = useState(false);

  const [open, setOpen] = useState(false)
  const refOne = useRef(null)

  const handleLocationChange = (e) => {
    setLocations(e.target.value);
  };

  const [range, setRange] = useState([
    {
        startDate: checkInDate,
        endDate: checkOutDate,
        key: 'selection'
      }
  ])

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
      setRange([
        {
            startDate: unformatDate(cart.checkIn),
            endDate: unformatDate(cart.checkOut),
            key: 'selection'
        }
      ])
    }
  }, [cart.checkIn, cart.checkOut]);

  const unformatDate = (dateString) => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
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
    dispatch(setLocation(city))
  };

  const handleGuestsSelectionClick = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isCalendarClicked = refOne.current && refOne.current.contains(event.target);
      const isGuestsClicked = guestsSelectionRef.current && guestsSelectionRef.current.contains(event.target);
      const isSearchButtonClicked = event.target.closest('.let-go-button');
  
      if (!isCalendarClicked && !isSearchButtonClicked) {
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
  
    if (today <= checkInDate){
      dispatch(setCheckIn(checkInDate));
      localStorage.setItem('checkInDate', checkInDate);
      if (tomorrow <= checkOutDate){
        dispatch(setCheckOut(checkOutDate));
        localStorage.setItem('checkOutDate', checkOutDate);
        dispatch(updateGuests(guests));
        localStorage.setItem('guests', guests);
        history.push("/listings");
      } else {
        setOpen(true);
      }
    } else {
      setOpen(true);
    }
  };

  return (
    <div className="search-bar-container">
      <div className="searchbar-wrapper">
        <div className="inline-wrapper">
          <div className="inline-form">

            <div className="destination-container" style={{width: "80%"}}>
              <div className="input-strip" >
                <div className="input-inner">
                  <div className="input-prefix">
                    <img  style={{marginTop: "-5px", width:"20px", height:"20px"}} src={locationPic}/>
                  </div>
                  <div className={`input-wrapper ${(location !== "" && location !== null) ? 'non-empty' : ''}`}>
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

            <div className="dates" style={{width: "25%"}}>
              <div className="checkin-checkout" >
                <div className="checkin-input">
                  <div className="input-with-label">
                    <div className="input-prefix">
                      <img src={CalendarSVG} style={{width: "20px", height: "20px", marginBottom: "12.5px"}}/>
                    </div>
                    <div className="input-wrapper" style={{display: "flex", alignItems: "center"}}>
                    <input
                        value={`${formatDates(checkInDate)}`}
                        readOnly
                        className="inputBox"
                        onClick={(e) => {
                          e.stopPropagation();
                          setInputGuestFocused(false)
                          setOpen(open => !open);
                      }}
                        style={{ marginBottom: "12px"}}
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

            <div className="dates" style={{width: "25%"}}>
              <div className="checkin-checkout">
                <div className="checkin-input">
                  <div className="input-with-label">
                    <div className="input-prefix">
                      <img src={CalendarSVG} style={{width: "20px", height: "20px", marginBottom: "12.5px"}}/>
                    </div>
                    <div className="input-wrapper" style={{display: "flex", alignItems: "center"}}>
                    <input
                        value={`${formatDates(checkOutDate)}`}
                        readOnly
                        className="inputBox"
                        onClick={(e) => {
                          e.stopPropagation();
                          setInputGuestFocused(false)
                          setOpen(open => !open);
                      }}
                        style={{marginBottom: "12px"}}
                    />
                      <label className="input-label3">
                        Check Out
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="searchBar2-cal" ref={refOne} style={{marginTop: "75px", marginLeft: "10%"}}>
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

            <div className="divider"></div>

            <div className="guests" style={{width: "20%"}}>
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