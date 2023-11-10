import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import configureStore from './store';
import { Provider } from 'react-redux';
import { restoreSession } from './store/csrf';
import { loginUser, logoutUser, createUser } from './store/usersReducer';
import { csrfFetch } from "./store/csrf"

const initializeApp = () => {
  // let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  let initialState = {};

  // if (currentUser) {
  //   initialState = {
  //     users: {
  //       [currentUser.id]: currentUser
  //     }
  //   };
  // }

  const store = configureStore(initialState);

  window.store = store;
  window.createUser = createUser;
  window.loginUser = loginUser;
  window.logoutUser = logoutUser;
  window.csrfFetch = csrfFetch;

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

restoreSession().then(initializeApp);