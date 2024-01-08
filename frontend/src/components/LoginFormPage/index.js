import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './LoginForm.css';
import car from "../../assets/pictures/Screenshot 2023-11-12 at 12.22.54 PM.png"
import logo from "../../assets/pictures/Screenshot 2023-11-12 at 3.36.15 PM.png"
import MyArrowSVG from "../../assets/pictures/icons/arrow-left.svg"
import PencilSVG from "../../assets/pictures/icons/edit.svg"
import { useHistory } from "react-router-dom";

function LoginFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

const handleSubmit = async (e) => {
  e.preventDefault();
  setErrors([]);
  try {
    await dispatch(sessionActions.login({ email, password }));
  } catch (res) {
    let data;
    try {
      data = await res.clone().json();
    } catch {
      data = await res.text();
    }
    if (data?.errors) setErrors(data.errors);
    else if (data) setErrors([data]);
    else setErrors([res.statusText]);
  }
};

const redirectUrl = sessionStorage.getItem('redirectUrl');

if (sessionUser) {
  if (redirectUrl && redirectUrl !== '/') {
    history.push(redirectUrl);
  } else {
    history.push('/');
  }
}

const handleDemoLogin = async () => {
  const demoUser = {
    email: "demo_user@gmail.com",
    password: "Password123!",
  };

  try {
    await dispatch(sessionActions.login(demoUser));
  } catch (res) {
    let data;
    try {
      data = await res.clone().json();
    } catch {
      data = await res.text();
    }
    if (data?.errors) setErrors(data.errors);
    else if (data) setErrors([data]);
    else setErrors([res.statusText]);
  }
};

  return (
    <>
      <div className="log-container">
        <div className="loginContainer">
          <div className="loginBox">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
          <span id="bottom" className="link" onClick={handleDemoLogin}>
            Demo User
          </span>
          <Link id="bottom" className="link" to="/signup">
          <img src={PencilSVG} alt="Back" style={{ width: '14px' }}/> Sign Up
          </Link>
        </div>
      </div>

      <div className="car-container">
          <img src={car} ></img>
      </div>
    </div>
    </>
  );
}

export default LoginFormPage;