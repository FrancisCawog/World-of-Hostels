import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import listingReducer from './listings';
import roomReducer from './rooms';
import cartReducer from './cart'
import reservationReducer from './reservations';
import reviewReducer from './review';

const rootReducer = combineReducers({
    session: sessionReducer,
    listings: listingReducer,
    rooms: roomReducer,
    cart: cartReducer,
    reservations: reservationReducer,
    reviews: reviewReducer
})

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
      enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState = {}) => {
    return createStore(rootReducer, preloadedState, enhancer)
}

export default configureStore