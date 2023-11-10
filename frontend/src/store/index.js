import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import usersReducer from './usersReducer';

const rootReducer = combineReducers({
    users: usersReducer
  });
  
  const configureStore = (preloadedState = {}) => (
    createStore(rootReducer, preloadedState, applyMiddleware(thunk, logger))
  );
  
  export default configureStore;