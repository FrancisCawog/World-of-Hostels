import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./CheckoutForm.css";
import cardinfo from "../../assets/pictures/Screenshot 2023-11-20 at 5.03.09 PM.png"
import { updateGuests, setCheckIn, setCheckOut, clearCart } from "../../store/cart";
import { createReservation } from "../../store/reservations";
import users from "../../assets/pictures/icons/17115.png"
import { useRef } from 'react'
import { DateRange } from 'react-date-range'
import format from 'date-fns/format'
import { addDays } from 'date-fns'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

function CheckoutForm( { listingId, listingName, photoUrl}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const cartItems = useSelector((state) => Object.values(state.cart.cart));
    const rooms = useSelector((state) => Object.values(state.rooms));
    const availableRooms = rooms.filter(room => room.available_beds > 0);
    const cheapestPrice = Math.min(...availableRooms.map(room => room.price));
    const shouldRenderCheckoutChoose = cartItems.length === 0 || cartItems.every(item => item === 0);
    const [totalPrice, setTotalPrice] = useState(0);
    const cart = useSelector((state) => state.cart.cart);
    const cartEffect = useSelector((state) => state.cart);
    const refundable = useSelector((state) => state.cart.refundable)
    const checkIn = cartEffect.checkIn
    const checkOut = cartEffect.checkOut
    const numGuests = cartEffect.guests
    const [guests, setGuests] = useState(numGuests);
    const [checkInDate, setCheckInDate] = useState(checkIn);
    const [checkOutDate, setCheckOutDate] = useState(checkOut);
    const listing = useSelector((state) => state.listings[listingId])

    const checkInDates = new Date(checkInDate);
    const checkOutDates = new Date(checkOutDate);

    const timeDifference = checkOutDates.getTime() - checkInDates.getTime();
    const numNights = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    const handleScroll = () => {
        const chooseRoomDiv = document.getElementById('choose-room');
        if (chooseRoomDiv) {
          chooseRoomDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      };

    const checkoutUser = async () => {
    if (!sessionUser) {
        const currentUrl = window.location.pathname;
        sessionStorage.setItem('redirectUrl', currentUrl);
        history.push('/login');
    } else {
        const reservationsToCreate = [];
        let numGuest = 0;
        let checkInDate = ""
        let checkOutDate = ""
        let firstReservationId = 0;

        Object.entries(cart).forEach(([roomId, roomGuests]) => {
            const room = rooms.find(room => room.id === Number(roomId));

            if (room) {
                const reservation = {
                    listing_id: listing.id,
                    room_id: room.id,
                    num_guests: roomGuests,
                    start_date: checkInDates,
                    end_date: checkOutDates,
                    refundable: refundable
                };

                checkInDate = checkInDates;
                checkOutDate = checkOutDates;
                numGuest += roomGuests;
                reservationsToCreate.push(reservation);
            }
        });

        for (let i = 0; i < reservationsToCreate.length; i++) {
            const reservation = reservationsToCreate[i];
            const createdReservation = await dispatch(createReservation(reservation));

            if (i === 0) {
                firstReservationId = createdReservation.id;
            }
        }

        history.push({
            pathname: '/ConfirmationPage',
            state: {
                listingName: listingName,
                guests: numGuest,
                reservationNumber: firstReservationId,
                checkIn: checkInDate,
                checkOut: checkOutDate,
                price: totalPrice,
                photoUrl: photoUrl
            },
        });

        dispatch(clearCart());
    }};    

    useEffect(() => {
        let totalPriceCalculation = 0;
    
        for (const roomId in cart) {
            if (cart.hasOwnProperty(roomId)) {
                const quantity = cart[roomId];
                const room = rooms.find(room => room.id === parseInt(roomId));
    
                if (room) {
                    if (!refundable){
                        const itemTotal = quantity * room.price;
                        totalPriceCalculation += (itemTotal * .95 * numNights);
                    } else {
                        const itemTotal = quantity * room.price;
                        totalPriceCalculation += (itemTotal * numNights);
                    }
                }
            }
        }
    
        setTotalPrice(totalPriceCalculation);
    },[cartEffect, checkInDate, checkOutDate]);

    useEffect(() => {
        const storedCheckInDate = localStorage.getItem('checkInDate');
        const storedCheckOutDate = localStorage.getItem('checkOutDate');
        const storedGuests = localStorage.getItem('guests');
      
        if (storedCheckInDate) {
          setCheckInDate(storedCheckInDate);
        }
      
        if (storedCheckOutDate) {
          setCheckOutDate(storedCheckOutDate);
        }
      
        if (storedGuests) {
          setGuests(storedGuests);
        }
      }, []);
    
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
        dispatch(updateGuests(guests));
        dispatch(setCheckIn(checkInDate));
        dispatch(setCheckOut(checkOutDate));
      }, [guests, checkInDate, checkOutDate]);


      // date state
        const [range, setRange] = useState([
            {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection'
            }
        ])

        // open close
        const [open, setOpen] = useState(false)

        // get the target element to toggle 
        const refOne = useRef(null)

        useEffect(() => {
            // event listeners
            document.addEventListener("keydown", hideOnEscape, true)
            document.addEventListener("click", hideOnClickOutside, true)
        }, [])

        // hide dropdown on ESC press
        const hideOnEscape = (e) => {
            // console.log(e.key)
            if( e.key === "Escape" ) {
            setOpen(false)
            }
        }

        // Hide on outside click
        const hideOnClickOutside = (e) => {
            // console.log(refOne.current)
            // console.log(e.target)
            if( refOne.current && !refOne.current.contains(e.target) ) {
            setOpen(false)
            }
        }

    return (
        <>
        {shouldRenderCheckoutChoose ? (
            <div className="checkout-choose">
                <div className="checkout-info">
                    <div className="choose-top">
                        <div style={{marginTop: "-10px"}}>
                            <p>Rooms from</p>
                            <p style={{marginTop: "-12px", fontFamily: "Poppins-bold", fontSize: "18px", marginLeft: "7px"}}>US ${(cheapestPrice * 0.95).toFixed(2)}</p>
                        </div>
                        <button onClick={handleScroll}>
                            Choose a room
                        </button>
                    </div>

                <div className="inline-form" style={{border: "1px solid black"}}>

                <div className="dates">
                    <div className="checkin-checkout">
                        <div className="checkin-input">
                        <div className="input-with-label">
                            <div className="input-prefix">
                            <img/>
                            </div>
                            <div className="input-wrapper" style={{width: "10rem"}}>
                            <input
                                value={`${format(range[0].startDate, "dd MMM")} to ${format(range[0].endDate, "dd MMM")}`}
                                readOnly
                                className="inputBox"
                                onClick={ () => setOpen(open => !open) }
                                style={{paddingLeft: "1rem", marginBottom: "12px"}}
                            />

                            <div ref={refOne}>
                                {open && 
                                <DateRange
                                    onChange={item => setRange([item.selection])}
                                    editableDateInputs={true}
                                    moveRangeOnFirstSelection={false}
                                    ranges={range}
                                    months={1}
                                    direction="horizontal"
                                    className="calendarElement"
                                />
                                }
                            </div>
                            <label className="input-label2">
                                Check In
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
                                style={{marginBottom: "8px"}}
                            />
                            <label className="input-label4">
                                Guests
                            </label>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                </div>
                
                <img src={cardinfo} alt="Card Information"></img>
                </div>
            </div>
        ) : (
            <div className="checkout-check">
                <div className="checkout-info">
                <div className="inline-form" style={{border: "1px solid black"}}>
                    <div className="dates">
                        <div className="checkin-checkout">
                            <div className="checkin-input">
                            <div className="input-with-label">
                                <div className="input-prefix">
                                <img/>
                                </div>
                                <div className="input-wrapper" style={{width: "10rem"}}>
                                <input
                                    value={`${format(range[0].startDate, "dd MMM")} to ${format(range[0].endDate, "dd MMM")}`}
                                    readOnly
                                    className="inputBox"
                                    onClick={ () => setOpen(open => !open) }
                                    style={{paddingLeft: "1rem", marginBottom: "12px"}}
                                />

                                <div ref={refOne}>
                                    {open && 
                                    <DateRange
                                        onChange={item => setRange([item.selection])}
                                        editableDateInputs={true}
                                        moveRangeOnFirstSelection={false}
                                        ranges={range}
                                        months={1}
                                        direction="horizontal"
                                        className="calendarElement"
                                    />
                                    }
                                </div>
                                <label className="input-label2">
                                    Check In
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
                                    style={{marginBottom: "8px"}}
                                />
                                <label className="input-label4">
                                    Guests
                                </label>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div style={{marginTop: "1rem"}}>
                    <div style={{fontFamily: "Poppins-bold"}}>
                        <div style={{display: "flex", }}>
                            <p>Total</p>
                            <p>US${totalPrice.toFixed(2)}</p>
                        </div>
                        <div style={{display: "flex", }}>
                            <p style={{color: "green"}}> Payable Now</p>
                            <p>US${(totalPrice * .15).toFixed(2)}</p>
                        </div>
                    </div>
                    <button onClick={checkoutUser} className="check-out-button">
                        Checkout
                    </button>
                    <img src={cardinfo} alt="Card Information"></img>
                </div>
            </div>
            </div>
            )}
        </>
    );
}

export default CheckoutForm