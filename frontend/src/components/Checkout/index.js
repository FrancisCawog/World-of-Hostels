import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CheckoutForm.css";
import cardinfo from "../../assets/pictures/Screenshot 2023-11-20 at 5.03.09 PM.png"
import { clearCart } from "../../store/cart";
// import LoginFormPage from "../../components/LoginFormPage";

function CheckoutForm() {
    const dispatch = useDispatch();
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


    const handleScroll = () => {
        const chooseRoomDiv = document.getElementById('choose-room');
        if (chooseRoomDiv) {
          chooseRoomDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      };

    const checkoutUser = () => {
        dispatch(clearCart());
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
                        totalPriceCalculation += (itemTotal * .95);
                    } else {
                    const itemTotal = quantity * room.price;
                    totalPriceCalculation += itemTotal;
                    }
                }
            }
        }
    
        setTotalPrice(totalPriceCalculation);
    },[cartEffect]);
    

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
                        <p> 
                            Dates
                        </p>
                        <p>
                            Guests
                        </p>
                    </div>
                    <img src={cardinfo} alt="Card Information"></img>
                </div>
            </div>
        ) : (
            <div className="checkout-check">
                <div className="checkout-info">
                <div className="choose-top">
                    <div className="choose-middle">
                        <p> 
                            Dates
                        </p>
                        <p>
                            Guests
                        </p>
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