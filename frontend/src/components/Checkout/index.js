import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./CheckoutForm.css";
import cardinfo from "../../assets/pictures/Screenshot 2023-11-20 at 5.03.09 PM.png"
import { updateGuests, setCheckIn, setCheckOut, clearCart } from "../../store/cart";
import { createReservation } from "../../store/reservations";

function CheckoutForm( { listingId}) {
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
    
                    reservationsToCreate.push(reservation);
                }
            });
    
            for (const reservation of reservationsToCreate) {
                await dispatch(createReservation(reservation));
            }
    
            dispatch(clearCart());
        }
    };    

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
                    <div className="choose-middle">
                    <input
                        type="date"
                        name="checkInDate"
                        id="checkInDate"
                        placeholder={checkInDate}
                        value={checkInDate}
                        onChange={handleCheckInDateChange}
                    />
                    <input
                        type="date"
                        name="checkOutDate"
                        id="checkOutDate"
                        placeholder={checkOutDate}
                        value={checkOutDate}
                        onChange={handleCheckOutDateChange}
                    />
                    <input
                        type="number"
                        name="guests"
                        id="guests"
                        placeholder={numGuests}
                        value={guests}
                        onChange={handleGuestsChange}
                    />
                    </div>
                    <img src={cardinfo} alt="Card Information"></img>
                </div>
            </div>
        ) : (
            <div className="checkout-check">
                <div className="checkout-info">
                <div className="choose-top">
                    <div className="choose-middle">
                    <input
                        type="date"
                        name="checkInDate"
                        id="checkInDate"
                        placeholder={checkInDate}
                        value={checkInDate}
                        onChange={handleCheckInDateChange}
                    />
                    <input
                        type="date"
                        name="checkOutDate"
                        id="checkOutDate"
                        placeholder={checkOutDate}
                        value={checkOutDate}
                        onChange={handleCheckOutDateChange}
                    />
                    <input
                        type="number"
                        name="guests"
                        id="guests"
                        placeholder={numGuests}
                        value={guests}
                        onChange={handleGuestsChange}
                    />
                    </div>
                </div>
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
            )}
        </>
    );
}

export default CheckoutForm