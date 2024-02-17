import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import "./bookingdetailsmodal.css"
import users from "../../assets/pictures/icons/17115.png"
import RightSVG from "../../assets/pictures/icons/right-arrow-svgrepo-com.svg"
import { format, parseISO } from 'date-fns';

const BookingDetailsModal = ({ onClose, bookingReference, startDate, endDate, reservationDate, listing }) => {
    const [showConditions, setShowCondition] = useState(false)
    const [showCancellation, setShowCancellation] = useState(false)
    const formattedStartDate = format(parseISO(startDate), 'd MMMM');
    const formattedEndDate = format(parseISO(endDate), 'd MMMM yyyy');
    const reservations = useSelector(state => state.reservations);
    const rooms = useSelector(state => state.rooms);
    const sessionUser = useSelector(state => state.session.user);

    const handleClick = () => {
        setShowCondition(prevState => !prevState);
      };

    const handleSecondClick = () => {
        setShowCancellation(prevState => !prevState);
    };

  const timeTolerance = 1500;

  const filteredReservations = Object.values(reservations).filter(reservation => {
    const reservationCreatedAt = new Date(reservation.created_at).getTime();
    const targetReservationDate = new Date(reservationDate).getTime();
    const timeDifference = Math.abs(reservationCreatedAt - targetReservationDate);

    return timeDifference <= timeTolerance && sessionUser.id === reservation.user_id;
  });

  const totalGuests = filteredReservations.reduce((sum, reservation) => sum + reservation.num_guests, 0);
  const totalPrice = filteredReservations.reduce((sum, reservation) => sum + reservation.total_price, 0);

  const getRoomTitle = (roomId) => {
    const room = rooms[roomId];
    return room ? room.room_title : 'N/A';
  };

  const startDateObject = new Date(startDate);
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const rulesArray = listing.house_rules.split('\n').filter(rule => rule.trim() !== '');

    const formattedHouseRules = rulesArray.map((rule, index) => (
    <p key={index}>{rule.trim()}</p>
    ));

    return (
        <div className="modal-overlay3">
            <div className="modal3">
                <div className="modal-content">
                    <span className="close" onClick={onClose}>&times;</span>
                    <h1 className='booking-details-h1'>Booking Details</h1>

                    <div className='details-modal'>
                        <div className='details-content'>
                            <div className='details-inner'>
                                <div className='details-reference-data'>
                                    <div className='details-reference'>
                                        <p>Booking Reference</p>
                                        <p>{bookingReference}</p>
                                    </div>
                                    <div className='details-left'/>
                                    <div  className='dotted-line'/>
                                    <div className='details-right'/>
                                    <div className='details-date'>
                                        <div className='stay-period'>
                                            <p>Dates</p>
                                            <p>{`${formattedStartDate} - ${formattedEndDate}`}</p>
                                        </div>
                                        <div className='details-guests'>
                                            <div className='details-icon-cont'>
                                                <img src={users}/>
                                            </div>
                                            <div className='details-guests-num'>
                                                <p>Guests</p>
                                                <p>{totalGuests}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {filteredReservations.map(reservation => (
                                    <div key={reservation.id} className='single-room'>
                                    <p>{getRoomTitle(reservation.room_id)}</p>
                                    <div className='details-price-room'>
                                        <p>US${(reservation.total_price / reservation.num_guests).toFixed(2)} x {reservation.num_guests}</p>
                                        <p>US${reservation.total_price.toFixed(2)}</p>
                                    </div>
                                    </div>
                                ))}

                                <div className='taxes' style={{marginTop: "-10px"}}> 
                                    <div className='taxes-row'>
                                        <p>Taxes</p>
                                        <p>0</p>
                                    </div>
                                    <div className='taxes-row2'>
                                        <p>Total Price</p>
                                        <p>${totalPrice.toFixed(2)}</p>
                                    </div>
                                </div>

                                <div className='taxes'> 
                                    <div className='taxes-row2'>
                                        <p style={{color: "#26a159"}}>Total Paid</p>
                                        { startDateObject < currentDate ? ( 
                                            <p style={{color: "#26a159"}}>${totalPrice.toFixed(2)}</p>
                                        ) : (
                                            <p style={{color: "#26a159"}}>${(totalPrice * .15).toFixed(2)}</p>
                                        )}
                                    </div>
                                </div>

                                <div className='taxes' style={{borderBottom: "none"}}> 
                                    <div className='taxes-row2'>
                                        <p>Payable on Arrival</p>
                                        { startDateObject < currentDate ? ( 
                                            <p>$0.00</p>
                                        ) : (
                                            <p>${(totalPrice * .85).toFixed(2)}</p>
                                        )}
                                    </div>
                                </div>
                            </div>


                            <hr className='seperator-details'/>
                            <div className='details-collapsables'>
                                <ul className='accordian-items'>
                                    <li className='accordian-item'>
                                        <button onClick={handleClick}>
                                            Hostel Conditions
                                            <span className='accordian-span'>
                                                <div className={`accordian-arrow${showConditions ? ' rotated' : ''}`}>
                                                    <img src={RightSVG}/>
                                                </div>
                                            </span>
                                        </button>
                                        {showConditions && 
                                        <div className='accordian-item-container'>
                                            <div className='accordian-text-condition'>
                                                {formattedHouseRules}
                                            </div>
                                        </div>
                                        }
                                    </li>
                                    <li className='accordian-item'>
                                        <button onClick={handleSecondClick}>
                                            Cancellation Policy
                                            <span className='accordian-span'>
                                                <div className={`accordian-arrow${showCancellation ? ' rotated' : ''}`}>
                                                    <img src={RightSVG}/>
                                                </div>
                                            </span>
                                        </button>
                                        {showCancellation && 
                                        <div className='accordian-item-container'>
                                            <div className='accordian-text-condition'>
                                            {filteredReservations[0].refundable ? (
                                                <div className='accordian-refund'>
                                                    <p>Free Cancellation rates</p>
                                                    <p>If you cancel your booking before 23:59 7 days before your check-in date your deposit will be refunded to your payment card. If you cancel after 23:59 7 days or in the event of a no-show, your deposit will not be refunded and the total of the first night's accommodation will be charged to your payment card, unless otherwise stated (see 'Things to Note' information). Please note that cancellations must be made directly within your booking in My Account.</p>
                                                </div>
                                            ) : (
                                                <div className='accordian-refund'>
                                                    <p>Non-refundable rates</p>
                                                    <p>Your booking is non-refundable. If you choose to cancel your booking, or in the case of a no-show, you will still be charged the full cost of your booking.</p>
                                                </div>
                                            )}
                                            </div>
                                        </div>
                                        }
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default BookingDetailsModal;