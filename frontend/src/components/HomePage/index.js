import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";

export default function HomePage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const handleLogout = () => {
    dispatch(sessionActions.logout());
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {sessionUser && (
        <button onClick={handleLogout}>Logout</button>
      )}
    </div>
  );
}
