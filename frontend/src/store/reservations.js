import csrfFetch from "./csrf";
import { SET_LISTING } from "./listings";
import { RECEIVE_USER } from "./session";

const SET_RESERVATION = "listings/setReservation";
const REMOVE_RESERVATION = 'listings/removeReservation';

const setReservation = (reservation) => ({
  type: SET_RESERVATION,
  payload: { reservation }
});

const removeReservation = (reservationId) => ({
  type: REMOVE_RESERVATION,
  payload: reservationId,
});

export const createReservation = (reservation) => async (dispatch) => {
  try {
    const response = await csrfFetch("/api/reservations", {
      method: 'POST',
      body: JSON.stringify(reservation)
    });

    if (response.ok) {
      const data = await response.json();
      const createdReservation = data.reservation;
      dispatch(setReservation(createdReservation));

      return createdReservation;
    } else {
      throw new Error('Response not OK');
    }
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
};

export const deleteReservation = (ReservationId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/reservations/${ReservationId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      dispatch(removeReservation(ReservationId));
    } else {
      const responseData = await response.json();
      console.error('Error deleting reservation:', responseData.error);
      throw new Error('Response not OK');
    }

    return response;
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
};

const reservationReducer = (state = {}, action) => {
    Object.freeze(state);
    const newState = { ...state };

    switch (action.type) {
        case SET_RESERVATION:
            const newReservation = action.payload?.reservation;
            if (newReservation) {
                return { ...state, [newReservation.id]: newReservation };
            }
            return state;    
        case RECEIVE_USER:
            return {...newState, ...action.reservations}
        case SET_LISTING:
            return {...newState, ...action.payload.reservations}
        case REMOVE_RESERVATION:
            const reservationIdToRemove = action.payload;
            const { [reservationIdToRemove]: _, ...updatedState } = { ...state };
            return updatedState;
        default:
            return state;
    }
};

export default reservationReducer;