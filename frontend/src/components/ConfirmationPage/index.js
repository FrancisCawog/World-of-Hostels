import Navigation from "../Navigation";
import "./confirmationPage.css"
import check from "../../assets/pictures/icons/515345.png"
import CalenderSVG from "../../assets/pictures/icons/calendar-confirmation.svg"
import users from "../../assets/pictures/icons/17115.png"
import { useLocation, useHistory } from 'react-router-dom';

function ConfirmationPage() {
    sessionStorage.setItem('redirectUrl', window.location.pathname);
    const history = useHistory();
    const location = useLocation();
    const { listingName, guests, reservationNumber, checkIn, checkOut, price, photoUrl } = location.state;

    const nights = () => {
        const millisecondsPerDay = 24 * 60 * 60 * 1000;
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
    
        const differenceInDays = Math.floor((checkOutDate - checkInDate) / millisecondsPerDay);
    
        return differenceInDays;
    };    

    const formattedCheckInDate = checkIn.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    const formattedCheckInDate2 = checkIn.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
    });

    const formattedCheckOutDate = checkOut.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    const handleAccountClick = (tabName) => {
        history.push('/users/1', { tabName });
      };

    return (
        <>
        <Navigation/>
        <div className="confirmation-back">
            <div className="confirmation-back2">
                <div className="confirmation-back3">
                    <div className="confirmation-message">
                        <img src={check} />
                        <p>Pack your bags! Your booking is confirmed.</p>
                    </div>

                    <div className="hostel-info-conf">
                        <div className="conf-picture">
                            <img src={photoUrl}/>
                        </div>
                        <div className="conf-details-info">
                            <p style={{fontWeight: "700"}}>{listingName}</p>
                            <div className="conf-details">
                                <img src={CalenderSVG}/>
                                {nights(checkIn, checkOut) === 1 ? (
                                    <p> {formattedCheckInDate2}, {nights(checkIn, checkOut)} night</p>
                                ) : (
                                    <p> {formattedCheckInDate2}, {nights(checkIn, checkOut)} nights</p>
                                )}
                            </div>
                            <div className="conf-details">
                                <img src={users} />
                                {guests === 1 ? (
                                    <p>{guests} guest</p>
                                ) : (
                                    <p>{guests} guests</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <p className="your-details">Your Booking Details</p>

                    <div className="booking-details-conf">
                        <div className="booking-details-conf-ele">
                            <p className="booking-details-conf-left">Reservation Number</p>
                            <p>{reservationNumber}</p>
                        </div>
                        <div className="booking-details-conf-ele">
                            <p className="booking-details-conf-left">Check In</p>
                            <p>{formattedCheckInDate}</p>
                        </div>
                        <div className="booking-details-conf-ele">
                            <p className="booking-details-conf-left">Check Out</p>
                            <p>{formattedCheckOutDate}</p>
                        </div>
                        <div className="booking-details-conf-ele">
                            <p className="booking-details-conf-left">Total Price</p>
                            <p>$ {price.toFixed(2)}</p>
                        </div>
                        <div className="booking-details-conf-ele">
                            <p className="booking-details-conf-left">Total Paid</p>
                            <p>$ {(price * .15).toFixed(2)}</p>
                        </div>
                        <div className="booking-details-conf-ele">
                            <p className="booking-details-conf-left">Payable on Arrival</p>
                            <p>$ {(price * .85).toFixed(2)}</p>
                        </div>
                    </div>

                    <div className="action-button" onClick={() => handleAccountClick("My Trips")}>
                        <button className="conf-button">Manage Booking</button>
                    </div>


                </div>
            </div>
        </div>
        <footer className="conf-footer" />
        </>
    )
}

export default ConfirmationPage