import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./CheckoutForm.css";
import cardinfo from "../../assets/pictures/Screenshot 2023-11-20 at 5.03.09 PM.png"
import { updateGuests, setCheckIn, setCheckOut, clearCart } from "../../store/cart";
import { createReservation } from "../../store/reservations";
import users from "../../assets/pictures/icons/17115.png"
import { DateRange } from 'react-date-range'
import format from 'date-fns/format'
import * as fecha from "fecha";
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import add from "../../assets/pictures/icons/plus-bold-svgrepo-com.svg"
import grayadd from "../../assets/pictures/icons/plus-gray-svgrepo-com copy.svg"
import minus from "../../assets/pictures/icons/minus-sign-of-a-line-in-horizontal-position-svgrepo-com regular.svg"
import grayminus from "../../assets/pictures/icons/minus-sign-of-a-line-in-horizontal-position-svgrepo-com.svg"

function CheckoutForm( { checkIn, checkOut, listingId, listingName, photoUrl}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const guestsSelectionRef = useRef(null);
    const sessionUser = useSelector((state) => state?.session.user);
    const cartItems = useSelector((state) => Object.values(state?.cart.cart));
    const cart = useSelector((state) => state?.cart.cart);
    const rooms = useSelector((state) => Object.values(state?.rooms));
    const availableRooms = rooms.filter(room => room.available_beds > 0);
    const cheapestPrice = Math.min(...availableRooms.map(room => room.price));
    const shouldRenderCheckoutChoose = cartItems.length === 0 || cartItems.every(item => item === 0);
    const [totalPrice, setTotalPrice] = useState(0);
    const cartEffect = useSelector((state) => state?.cart);
    const refundable = useSelector((state) => state?.cart.refundable)
    const [guests, setGuests] = useState(1);
    const [checkInDate, setCheckInDate] = useState(checkIn);
    const [checkOutDate, setCheckOutDate] = useState(checkOut);
    const listing = useSelector((state) => state?.listings[listingId])
    let checkInDates = fecha.parse(checkInDate, "YYYY-MM-DD");
    let checkOutDates = fecha.parse(checkOutDate, "YYYY-MM-DD");
    const timeDifference = checkOutDates.getTime() - checkInDates.getTime();
    const numNights = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    const [showNotEnough, setShowNotEnough] = useState(false);
    const [isInputGuestFocused, setInputGuestFocused] = useState(false);

    useEffect(()=> {
        checkInDates = fecha.parse(checkInDate, "YYYY-MM-DD");
        checkOutDates = fecha.parse(checkOutDate, "YYYY-MM-DD");
    }, [checkInDate,checkOutDate])

    const totalGuests = Object.entries(cart).reduce((acc, [roomId, val]) => {
        const room = rooms.find(room => room.id === Number(roomId));
      
        if (room) {
          const bedsToAdd = room.room_type === 'private' ? room.num_beds : val;
          return acc + bedsToAdd;
        }
      
        return acc;
      }, 0);

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
        if (totalGuests < guests){
            setShowNotEnough(true);
        } else {
            const reservationsToCreate = [];
            let numGuest = 0;
            let checkInDate = ""
            let checkOutDate = ""
            let firstReservationId = 0;
            
            Object.entries(cart).forEach(([roomId, roomGuests]) => {
                const room = rooms.find(room => room.id === Number(roomId));
                
                if (room && room.room_type === "private") {
                    const numberGuests = room.num_beds - (totalGuests - guests) >= 1 ? room.num_beds - (totalGuests - guests) : 1;

                    const reservation = {
                        listing_id: listing.id,
                        room_id: room.id,
                        num_guests: numberGuests,
                        start_date: checkInDates,
                        end_date: checkOutDates,
                        refundable: refundable
                    };
                    checkInDate = checkInDates;
                    checkOutDate = checkOutDates;
                    numGuest += roomGuests;
                    reservationsToCreate.push(reservation);
                } else {
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
                    checkIn: checkInDates,
                    checkOut: checkOutDates,
                    price: totalPrice,
                    photoUrl: photoUrl
                },
            });
            
            dispatch(clearCart());
        }
    }};    

    useEffect(() => {
        if (showNotEnough) {
          const timer = setTimeout(() => {
            setShowNotEnough(false);
          }, 3000);
          return () => clearTimeout(timer);
        }
      }, [showNotEnough]);

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

        const [range, setRange] = useState([
            {
            startDate: checkInDates,
            endDate: checkOutDates,
            key: 'selection'
            }
        ])

            useEffect(() => {
      setRange([
        {
          startDate: checkInDates,
          endDate: checkOutDates,
          key: 'selection'
        }
      ]);
    }, [cartEffect]);

        const handleDateRangeChange = (item) => {
            const startDate = item.selection.startDate.toISOString().split("T")[0];
            const endDate = item.selection.endDate.toISOString().split("T")[0];
          
            setRange([item.selection]);
            setCheckInDate(startDate);
            setCheckOutDate(endDate);
          };

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
            if( e.key === "Escape" ) {
            setOpen(false)
            }
        }

        // Hide on outside click
        const hideOnClickOutside = (e) => {
            if( refOne.current && !refOne.current.contains(e.target) ) {
            setOpen(false)
            }
        }

    const handleGuestsChange = (action) => {
        if (action === 'add') {
            setGuests(prevGuests => (prevGuests < 10) ? prevGuests + 1 : prevGuests);
        } else if (action === 'subtract') {
            setGuests(prevGuests => (prevGuests > 1) ? prevGuests - 1 : prevGuests);
        }
    };  

    const handleGuestInputFocus = () => {
        setInputGuestFocused(true);
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

      useEffect(() => {
        dispatch(updateGuests(guests));
      }, [guests])

      useEffect(() => {
        dispatch(setCheckIn(checkInDate));
      }, [checkInDate])

      useEffect(() => {
        dispatch(setCheckOut(checkOutDate));
      }, [checkOutDate])

      useEffect(() => {
        setCheckInDate(cartEffect.checkIn);
        setCheckOutDate(cartEffect.checkOut);
        setGuests(parseInt(cartEffect.guests, 10) || 1)
      }, [cartEffect]);

    return (
        <>
        {showNotEnough && (
            <div className="confirmation-box">Not enough beds selected for all the guests</div>
        )}

        {shouldRenderCheckoutChoose ? (
            <div className="checkout-choose">
                <div className="checkout-info">
                    <div className="choose-top">
                        <div style={{marginTop: "-10px"}}>
                            <p>Rooms from</p>
                            <p style={{marginTop: "-12px", fontFamily: "Poppins-bold", fontSize: "18px", marginLeft: "7px"}}>US ${(cheapestPrice * 0.95).toFixed(2)}</p>
                        </div>
                        <button className="check-button" onClick={handleScroll}>
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
                                        onChange={handleDateRangeChange}
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
                                    Check In - Check Out
                                </label>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>

                    <div className="divider"></div>

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

                    {isInputGuestFocused && (
                        <div className="guests-selection2" ref={guestsSelectionRef} onClick={handleGuestsSelectionClick} style={{marginLeft: "2%"}}>
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
                                    <img src={minus} alt="Minus" style={{width: "90%"}}/>
                                </button> 
                                ):( 
                                    <button className="guests-minus" style={{pointerEvents: 'none', boxShadow: "rgb(211, 211, 211) 0px 0px 0px 0.125rem inset "}}>
                                    <img src={grayminus} alt="Minus" style={{width: "90%"}}/>
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
                                        <img src={add} alt="add" style={{width: "90%"}}/>
                                    </button> 
                                ):( 
                                    <button className="guests-plus" style={{pointerEvents: 'none', boxShadow: "rgb(211, 211, 211) 0px 0px 0px 0.125rem inset "}}>
                                        <img src={grayadd} alt="add" style={{width: "90%"}}/>
                                    </button>
                                )}
                            </div>
                        </div>
                                    </div>
                                )}
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
                                            onChange={handleDateRangeChange}
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

                            {isInputGuestFocused && (
                                <div className="guests-selection2" ref={guestsSelectionRef} onClick={handleGuestsSelectionClick} style={{marginLeft: "2%"}}>
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
                                    <img src={minus} alt="Minus" style={{width: "90%"}}/>
                                    </button> 
                                    ):( 
                                        <button className="guests-minus" style={{pointerEvents: 'none', boxShadow: "rgb(211, 211, 211) 0px 0px 0px 0.125rem inset "}}>
                                        <img src={grayminus} alt="Minus" style={{width: "90%"}}/>
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
                                            <img src={add} alt="add" style={{width: "90%"}}/>
                                            </button> 
                                            ):( 
                                                <button className="guests-plus" style={{pointerEvents: 'none', boxShadow: "rgb(211, 211, 211) 0px 0px 0px 0.125rem inset "}}>
                                                <img src={grayadd} alt="add" style={{width: "90%"}}/>
                                                </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                </div>
                
                <div style={{marginTop: "1rem"}}>
                    <div style={{fontFamily: "Poppins-bold"}}>
                        <div style={{display: "flex", }}>
                            <p style={{marginRight: "5px"}}>Total</p>
                            <p>US${totalPrice.toFixed(2)}</p>
                        </div>
                        <div style={{display: "flex", }}>
                            <p style={{color: "green", marginRight: "5px"}}> Payable Now</p>
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