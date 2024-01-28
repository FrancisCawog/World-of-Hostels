import locationPic from "../../assets/pictures/icons/location-pin-svgrepo-com.svg";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { setCheckIn, setCheckOut, updateGuests } from "../../store/cart";
import { useDispatch, useSelector } from "react-redux";
import users from "../../assets/pictures/icons/17115.png"
import arrow from "../../assets/pictures/icons/icons8-arrow-30.png"

function SearchBar() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [location, setLocation] = useState("");
  const [checkInDate, setCheckInDate] = useState(today.toISOString().split("T")[0]);
  const [checkOutDate, setCheckOutDate] = useState(tomorrow.toISOString().split("T")[0]);
  const [guests, setGuests] = useState("1");

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
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

  const history = useHistory();

  // useEffect(() => {
  //   const storedCheckInDate = localStorage.getItem('checkInDate');
  //   const storedCheckOutDate = localStorage.getItem('checkOutDate');
  //   const storedGuests = localStorage.getItem('guests');
  
    // if (storedCheckInDate) {
    //   setCheckInDate(storedCheckInDate);
    // }
  
    // if (storedCheckOutDate) {
    //   setCheckOutDate(storedCheckOutDate);
    // }
  
    // if (storedGuests) {
    //   setGuests(storedGuests);
    // }
  // }, []);

  useEffect(() => {
    if (cart.checkIn !== "") {
      setCheckInDate(cart.checkIn);
      setCheckOutDate(cart.checkOut);
      setGuests(cart.guests)
    }
  }, [cart]);

  const handleSearch = () => {
    dispatch(setCheckIn(checkInDate));
    dispatch(setCheckOut(checkOutDate));
    dispatch(updateGuests(guests));
    
    localStorage.setItem('checkInDate', checkInDate);
    localStorage.setItem('checkOutDate', checkOutDate);
    localStorage.setItem('guests', guests);
    history.push("/listings");
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
                      placeholder="Bangkok, Thailand"
                      value={location}
                      onChange={handleLocationChange}
                      disabled={true}
                    />
                    <label className="input-label">
                      Where do you want to go?
                    </label>
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