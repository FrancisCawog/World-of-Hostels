import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import './LoginForm.css';
import car from "../../assests/pictures/Screenshot 2023-11-12 at 12.22.54 PM.png"
import logo from "../../assests/pictures/Screenshot 2023-11-12 at 3.36.15 PM.png"
import MyArrowSVG from "../../assests/pictures/icons/arrow-left.svg"
import PencilSVG from "../../assests/pictures/icons/edit.svg"

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
  };

  return (
    <>
    <div className="page-container" id="ele">
      <div className="element" id="loginContainer" style={{transform: 'translateY(-65%)'}}>
      <Link to="/" exact="true">
        <img src={MyArrowSVG} alt="Back" style={{ width: '10px' }}/> Back
      </Link>
      <br/>
      <br/>
      <img src={logo} style={{ width: '50px' }}/>
      <h1>Welcome traveller!</h1>
      <p>Log in to unlock extras and start connecting with travelers heading to your hostel</p>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map(error => <li key={error}>{error}</li>)}
        </ul>
        <label>
          <input
            type="text"
            placeholder="Email"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button id="loginButton" type="submit" >Login</button>
      </form>

      <br/>
      <p id="bottom">Don't have an account?</p>
      <Link id="bottom" className="link" to="/signup">
      <img src={PencilSVG} alt="Back" style={{ width: '14px' }}/> Sign Up
      </Link>
    </div>
  </div>
    <div className="element" id="ele">
        <img src={car} ></img>
    </div>
    </>
  );
}

export default LoginFormPage;