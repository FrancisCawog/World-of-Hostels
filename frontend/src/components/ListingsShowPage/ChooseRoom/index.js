import React, {useState, useCallback, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCart } from "../../../store/cart";
import { removeCart } from "../../../store/cart";

import person from "../../../assets/pictures/icons/user-128.svg"
import add from "../../../assets/pictures/icons/plus-bold-svgrepo-com.svg"
import grayadd from "../../../assets/pictures/icons/plus-gray-svgrepo-com copy.svg"
import minus from "../../../assets/pictures/icons/minus-sign-of-a-line-in-horizontal-position-svgrepo-com regular.svg"
import ArrowRight from "../../../assets/pictures/icons/right-arrow-svgrepo-com.svg"

export default function ChooseRoom({listingId, cartItems, cart}){
    const dispatch = useDispatch();
    const rooms = useSelector((state) => Object.values(state.rooms));

    const isRefundable = useSelector((state) => state?.cart.refundable)
    const [refundable, setRefundable] = useState(isRefundable || false);
    const [imageIndexes, setImageIndexes] = useState({});
    const [hoveredListings, setHoveredListings] = useState({});

    const handleListingHover = (roomId, isHovered) => {
      setHoveredListings((prevHovered) => ({ ...prevHovered, [roomId]: isHovered }));
    };

    const updateImageIndex = (roomId, direction) => {
        const imageCount = rooms.find(room => room.id === roomId)?.photoUrls.length || 0;
    
        setImageIndexes((prevIndexes) => {
          const currentIndex = prevIndexes[roomId] || 0;
          const newIndex =
            direction === 'prev'
              ? (currentIndex - 1 + imageCount) % Math.max(1, imageCount)
              : (currentIndex + 1) % Math.max(1, imageCount);
    
          const updatedIndexes = { ...prevIndexes, [roomId]: newIndex };
          return updatedIndexes;
        });
      };

    const checkAvailability = (id) => {
        const [specificRoom] = Object.values(rooms).filter(room => room.id === id);
        if (cartItems[id] >= specificRoom.available_beds) {
            return false
        }
            return true
    }

    const handleRemoveFromCart = useCallback((index) => {
        dispatch(removeCart(index));
    }, [dispatch]);

    const handleAddToCart = useCallback((index, value) => {
        dispatch(setCart(index, value));
        setRefundable(value);
    }, [dispatch]);

    useEffect(() => {
        const initialImageIndexes = Object.fromEntries(
          rooms.map((room) => [room.listing_id, 0])
        );
        setImageIndexes(initialImageIndexes);
      }, []);

      useEffect(() => {
        if (cartItems && Object.keys(cartItems).length === 0) {
          setRefundable(null); 
        }}, [cart]);

        
    return(
    <div>
        <div id="choose-room" className="choose-room">Choose your room</div>
          {rooms && (
            <>
              {rooms.some(room => room.room_type === "private" && room.available_beds > 0 && room.available_beds === room.num_beds && room.listing_id == listingId) && (
                <>
                  <p className="room-type">Private Rooms</p>
                  {rooms
                    .filter(room => room.room_type === "private" && room.available_beds > 0 && room.available_beds === room.num_beds && room.listing_id == listingId)
                    .map((privateRoom, index) => {
                      const currentImageIndex = imageIndexes[privateRoom.id] || 0; 
                      const isCurrentlyHovered = hoveredListings[privateRoom.id] || false;
                    return (
                      <div key={index} onMouseEnter={() => handleListingHover(privateRoom.id, true)} onMouseLeave={() => handleListingHover(privateRoom.id, false)}>
                        <div className="private-room-div">
                          <div className="private-picture-box">
                          <div className="index-picture-picture2">
                            <img src={privateRoom.photoUrls[currentImageIndex]} alt={`Room ${privateRoom.id}`}/>
                          </div>
                          {privateRoom.photoUrls.length > 1 && (
                            <>
                            {isCurrentlyHovered && (
                              <>
                             <span className="index-picture-left2" onClick={(e) => { e.stopPropagation(); updateImageIndex(privateRoom.id, 'prev'); }}>
                                <img src={ArrowRight} alt="Left Arrow" />
                              </span>
                              <span className="index-picture-right2" onClick={(e) => { e.stopPropagation(); updateImageIndex(privateRoom.id, 'next'); }}>
                                <img src={ArrowRight} alt="Right Arrow" />
                              </span>
                              </>
                              )}
                            </>
                          )}
                          </div>
                          <div className="room-description-box">
                            <p className="room-title">{privateRoom.room_title}</p>
                            <p className="room-description">{privateRoom.description}</p>
                            <div className="sleeps-info">
                              <img src={person} style={{ width: "24px" }} alt="Person icon" />
                              <p>Sleeps {privateRoom.num_beds}</p>
                            </div>
                            <hr className="line" />
                            <p className="room-info">Prices are per room</p>
                            <br/>
                            <p className="room-info">Taxes Not Included</p>
                          </div>
                          <div className="price-box">
                            <div>
                              <div>
                                <p style={{marginTop: "0px"}}>Free Cancellation</p>
                                <p style={{fontFamily: "Poppins-bold"}}>US${privateRoom.price.toFixed(2)} </p>
                              </div>
                              {
                                cartItems.hasOwnProperty(privateRoom.id) && refundable ? (
                                  <div className="add-remove-cart" style={{ marginRight: "2%" }}>
                                  <div className={`minus-div ${refundable ? '' : 'disabled'}`} onClick={() => refundable && handleRemoveFromCart(privateRoom.id, true)}>
                                    <img className="minus-image" src={minus} alt="minus icon" />
                                  </div>
                                  <div style={{marginRight: ".5rem"}}>
                                    <p style={{ fontFamily: "Poppins-bold"}}>{cartItems[privateRoom.id]}</p>
                                  </div>
                                  <div className={`add-div ${refundable ? '' : 'disabled'}`}style={{ pointerEvents: 'none', border: '2px solid lightgray' }} onClick={() => refundable && handleAddToCart(privateRoom.id, true)}>
                                    <img src={grayadd} className="add-image" alt="add icon" />
                                  </div>
                                </div>                                
                                ) : (
                                  <div className={`add-cart ${refundable !== false ? '' : 'disabled'}`} onClick={() => handleAddToCart(privateRoom.id, true)}>
                                  <img src={add} style={{ width: "20px", marginLeft: "-10px", marginRight: "2px", marginBottom: "-3px" }} alt="add icon" />
                                  Add
                                </div>
                                )
                              }
                            </div>
                            <hr className="price-line" />
                            <div>
                              <div style={{marginTop: "-10px"}}>
                                <p>Non-refundable</p>
                                <p style={{fontFamily: "Poppins-bold"}}>US${(privateRoom.price * 0.95).toFixed(2)} </p>
                              </div>
                              {
                                cartItems.hasOwnProperty(privateRoom.id) && !refundable ? (
                                  <div className="add-remove-cart" style={{ marginRight: "2%" }}>
                                  <div className={`minus-div ${!refundable ? '' : 'disabled'}`} onClick={() => !refundable && handleRemoveFromCart(privateRoom.id, false)}>
                                    <img className="minus-image" src={minus} alt="minus icon" />
                                  </div>
                                  <div style={{marginRight: ".5rem"}}>
                                    <p style={{ fontFamily: "Poppins-bold"}}>{cartItems[privateRoom.id]}</p>
                                  </div>
                                  <div className={`add-div ${!refundable ? '' : 'disabled'}`} style={{pointerEvents: 'none', border: '2px solid lightgray' }} onClick={() => !refundable && handleAddToCart(privateRoom.id, false)}>
                                    <img src={grayadd} className="add-image" alt="add icon" />
                                  </div>
                                </div>                                
                                ) : (
                                  <div className={`add-cart ${refundable !== true ? '' : 'disabled'}`} onClick={() => handleAddToCart(privateRoom.id, false)}>
                                  <img src={add} style={{ width: "20px", marginLeft: "-10px", marginRight: "2px", marginBottom: "-3px" }} alt="add icon" />
                                  Add
                                </div>
                                )
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    )})}
                  </>
              )}
              {rooms.some(room => room.room_type === "shared" && room.available_beds > 0 && room.listing_id == listingId) && (
                <>
                  <p className="room-type">Dorm Beds</p>
                  {rooms
                  .filter(room => room.room_type === "shared" && room.available_beds > 0 && room.listing_id == listingId)
                  .map((sharedRoom, index) => {
                    const currentImageIndex = imageIndexes[sharedRoom.id] || 0; 
                    const isCurrentlyHovered = hoveredListings[sharedRoom.id] || false;
                    return (
                      <div key={index} onMouseEnter={() => handleListingHover(sharedRoom.id, true)} onMouseLeave={() => handleListingHover(sharedRoom.id, false)}>
                        <div className="dorm-bed-div">
                          <div className="shared-picture-box">
                          <div className="index-picture-picture2">
                            <img src={sharedRoom.photoUrls[currentImageIndex]} alt={`Room ${sharedRoom.id}`}/>
                          </div>
                          {sharedRoom.photoUrls.length > 1 && (
                            <>
                            {isCurrentlyHovered && (
                              <>
                            <span className="index-picture-left2" onClick={(e) => { e.stopPropagation(); updateImageIndex(sharedRoom.id, 'prev'); }}>
                              <img src={ArrowRight} alt="Left Arrow" />
                            </span>
                            <span className="index-picture-right2" onClick={(e) => { e.stopPropagation(); updateImageIndex(sharedRoom.id, 'next'); }}>
                              <img src={ArrowRight} alt="Right Arrow" />
                            </span>
                              </>
                            )}
                            </>
                          )}
                          </div>
                          <div className="room-description-box">
                            <p className="room-title">{sharedRoom.room_title}</p>
                            <p className="room-description">{sharedRoom.description}</p>
                            <div className="sleeps-info">
                              <img src={person} style={{ width: "24px" }} alt="Person icon" />
                              <p>Sleeps {sharedRoom.num_beds}</p>
                            </div>
                            <hr className="line" />
                            <p className="room-info">Prices are per bed</p>
                            <br/>
                            <p className="room-info">Taxes Not Included</p>
                          </div>
                          <div className="price-box">
                            <div>
                              <div>
                                <p style={{marginTop: "0px"}}>Free Cancellation</p>
                                <p style={{fontFamily: "Poppins-bold"}}>US${sharedRoom.price.toFixed(2)} </p>
                              </div>
                              {
                                cartItems.hasOwnProperty(sharedRoom.id) && refundable ? (
                                  <div className="add-remove-cart" style={{ marginRight: "2%" }}>
                                  <div className={`minus-div ${refundable ? '' : 'disabled'}`} onClick={() => refundable && handleRemoveFromCart(sharedRoom.id, true)}>
                                    <img className="minus-image" src={minus} alt="minus icon" />
                                  </div>
                                  <div style={{marginRight: ".5rem"}}>
                                    <p style={{ fontFamily: "Poppins-bold"}}>{cartItems[sharedRoom.id]}</p>
                                  </div>
                                  <div className={`add-div ${refundable ? '' : 'disabled'}`}style={checkAvailability(sharedRoom.id) ? {} : { pointerEvents: 'none', border: '2px solid lightgray' }} onClick={() => refundable && checkAvailability(sharedRoom.id) && handleAddToCart(sharedRoom.id, true)}>
                                  {checkAvailability(sharedRoom.id) ? (
                                      <img src={add} className="add-image" alt="add icon" />
                                     ) : ( <img src={grayadd} className="add-image" alt="add icon" />
                                    )}
                                  </div>
                                </div>                                
                                ) : (
                                  <div className={`add-cart ${refundable !== false ? '' : 'disabled'}`} onClick={() => handleAddToCart(sharedRoom.id, true)}>
                                  <img src={add} style={{ width: "20px", marginLeft: "-10px", marginRight: "2px", marginBottom: "-3px" }} alt="add icon" />
                                  Add
                                </div>
                                )
                              }
                            </div>
                            <hr className="price-line" />
                            <div>
                              <div style={{marginTop: "-10px"}}>
                                <p>Non-refundable</p>
                                <p style={{fontFamily: "Poppins-bold"}}>US${(sharedRoom.price * 0.95).toFixed(2)} </p>
                              </div>
                              {
                                cartItems.hasOwnProperty(sharedRoom.id) && !refundable ? (
                                  <div className="add-remove-cart" style={{ marginRight: "2%" }}>
                                  <div className={`minus-div ${!refundable ? '' : 'disabled'}`} onClick={() => !refundable && handleRemoveFromCart(sharedRoom.id, false)}>
                                    <img className="minus-image" src={minus} alt="minus icon" />
                                  </div>
                                  <div style={{marginRight: ".5rem"}}>
                                    <p style={{ fontFamily: "Poppins-bold"}}>{cartItems[sharedRoom.id]}</p>
                                  </div>
                                  <div className={`add-div ${!refundable ? '' : 'disabled'}`} style={checkAvailability(sharedRoom.id) ? {} : { pointerEvents: 'none', border: '2px solid lightgray' }} onClick={() => !refundable && checkAvailability(sharedRoom.id) && handleAddToCart(sharedRoom.id, false)}>
                                  {checkAvailability(sharedRoom.id) ? (
                                      <img src={add} className="add-image" alt="add icon" />
                                     ) : ( <img src={grayadd} className="add-image" alt="add icon" />
                                    )}
                                  </div>
                                </div>                                
                                ) : (
                                  <div className={`add-cart ${refundable !== true ? '' : 'disabled'}`} onClick={() => handleAddToCart(sharedRoom.id, false)}>
                                  <img src={add} style={{ width: "20px", marginLeft: "-10px", marginRight: "2px", marginBottom: "-3px" }} alt="add icon" />
                                  Add
                                </div>
                                )
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    )})}
                  </>
                )}
            </>
          )}
        </div>
    )
}