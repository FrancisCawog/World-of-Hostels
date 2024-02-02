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
              <Link to="/" exact="true" style={{ textDecoration: 'underline', color: 'black', display: 'flex', alignItems: 'center', fontFamily: "Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Helvetica,Arial,sans-serif", fontWeight: "bolder" }}>
                <img src={MyArrowSVG} alt="Back" style={{ width: '14px', marginTop: "2px" }}/> Back
              </Link>
              <br/>
              <img src={logo} style={{ width: '50px' }}/>
              <h1>Welcome traveller!</h1>
              <p className="log-in-p">Log in to unlock extras and start connecting with travelers heading to your hostel</p>
              <form onSubmit={handleSubmit}>
                <ul>
                  {errors.map(error => <li key={error}>{error}</li>)}
                </ul>
                <div className={`input-wrapper-login ${email !== "" ? 'non-empty' : ''}`}>
                     <input
                      type="text"
                      name="password"
                      id="location"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <label className="input-label5">
                      Email
                    </label>
                </div>
                <div className={`input-wrapper-login ${password !== "" ? 'non-empty' : ''}`}>
                     <input
                      type="text"
                      name="password"
                      id="location"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <label className="input-label5">
                      Password
                    </label>
                </div>
                <button id="loginButton" type="submit" style={{pointerEvents: (email !== '' && password !== '') ? 'auto' : 'none', opacity: (email === '' || password === '') ? 0.5 : 1}}>Login</button>
              </form>

              <br/>
              <p id="bottom">Don't have an account?</p>
              <span id="bottom" className="link" onClick={handleDemoLogin}>
                Demo User
              </span>
              <Link id="bottom" className="link" to="/signup">
              <img src={PencilSVG} alt="Back" style={{ width: '14px' }}/>Sign Up
              </Link>
          </div>
        </div>

        <div className="car-container">
            <img src={car} style={{marginLeft: "10%", width: "85%"}}/>
        </div>
    </div>
    </>
  );
}

export default LoginFormPage;