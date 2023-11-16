import React from "react";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import HomePage from "./components/HomePage"
import ListingsShowPage from "./components/ListingsShowPage";
// import Navigation from "./components/Navigation";

function App() {
  return (
    <>
      {/* <Navigation /> */}
        <Switch>
          <Route exact path="/">
            <HomePage/>
          </Route>
          <Route path="/listings/:listingId" exact>
            <ListingsShowPage />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
    </>
  );
}

export default App;