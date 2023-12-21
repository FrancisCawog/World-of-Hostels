import React from "react";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import HomePage from "./components/HomePage"
import ListingsShowPage from "./components/ListingsShowPage";
import ListingsIndexPage from "./components/ListingsIndexPage";
import UserShow from "./components/UserShow";

function App() {
  return (
    <>
        <Switch>
          <Route exact path="/">
            <HomePage/>
          </Route>
          <Route path="/listings/:listingId" exact>
            <ListingsShowPage />
          </Route>
          <Route path="/listings/" exact>
            <ListingsIndexPage />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/users/:listingId">
            <UserShow />
          </Route>
        </Switch>
    </>
  );
}

export default App;