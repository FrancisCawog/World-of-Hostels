import locationPic from "../../assets/pictures/icons/Screenshot 2023-11-13 at 4.48.41 PM.png";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { setCheckIn, setCheckOut, updateGuests } from "../../store/cart";
import { useDispatch } from "react-redux";

function SearchBar() {
  const dispatch = useDispatch();

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

  const handleSearch = () => {
    dispatch(setCheckIn(checkInDate));
    dispatch(setCheckOut(checkOutDate));
    dispatch(updateGuests(guests));
    history.push("/listings");
  };

  return (
    <div className="search-bar">
      <img src={locationPic} style={{ width: "50px" }} />
      <input
        type="text"
        name="location"
        id="location"
        placeholder="Where do you want to go?"
        value={location}
        onChange={handleLocationChange}
      />
      <input
        type="date"
        name="checkInDate"
        id="checkInDate"
        placeholder="Check in"
        value={checkInDate}
        onChange={handleCheckInDateChange}
      />
      <input
        type="date"
        name="checkOutDate"
        id="checkOutDate"
        placeholder="Check out"
        value={checkOutDate}
        onChange={handleCheckOutDateChange}
      />
      <input
        type="number"
        name="guests"
        id="guests"
        placeholder="Guests"
        value={guests}
        onChange={handleGuestsChange}
      />
      <button className="let-go-button" type="button" onClick={handleSearch}>
        Let's Go!
      </button>
    </div>
  );
}

export default SearchBar;