//Memoized

import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import './LoginForm.css';
import car from "../../assets/pictures/Screenshot 2023-11-12 at 12.22.54 PM.png";
import logo from "../../assets/pictures/Screenshot 2023-11-12 at 3.36.15 PM.png";
import MyArrowSVG from "../../assets/pictures/icons/arrow-left.svg";
import PencilSVG from "../../assets/pictures/icons/edit.svg";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function LoginFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const demoPassword = useSelector((state) => state.demoUser.password);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [hasError, setHasError] = useState(false); 

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
    setHasError(false);
  };

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
      if (data?.errors) {
        setErrors(data.errors);
        setHasError(true);
      } else if (data) {
        setErrors([data]);
        setHasError(true);
      } else {
        setErrors([res.statusText]);
        setHasError(true); 
      }
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
      password: demoPassword,
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
      if (data?.errors) {
        setErrors(data.errors);
        setHasError(true); 
      } else if (data) {
        setErrors([data]);
        setHasError(true); 
      } else {
        setErrors([res.statusText]);
        setHasError(true); 
      }
    }
  };

  return (
    <>
      <div className="log-container">
        <div className="loginContainer">
          <div className="loginBox">
            <Link 
              to="/" 
              exact="true" 
              style={{ 
                textDecoration: 'underline', 
                color: 'black', 
                display: 'flex', 
                alignItems: 'center', 
                fontFamily: "Inter-bold"
              }}
            >
              <img src={MyArrowSVG} alt="Back" style={{ width: '14px', marginTop: "2px" }} /> Back
            </Link>
            <br />
            <img src={logo} style={{ width: '50px' }} />
            <h1>Welcome traveller!</h1>
            <p className="log-in-p">
              Log in to unlock extras and start connecting with travelers heading to your hostel
            </p>
            <form onSubmit={handleSubmit}>
              <ul className="error-list-login">
                {errors.map((error, index) => {
                  const [part1, part2] = error.split(". ");
                  return (
                    <li key={index} className="error-item-login">
                      <p>
                        <span className="error-part1">{part1}.</span>
                        <br />
                        <span>{part2}</span>
                      </p>
                    </li>
                  );
                })}
              </ul>
              <div className={`input-wrapper-login ${email !== "" ? 'non-empty' : ''}`}
              id="input-wrapper-login-email"
              >
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={email}
                  onChange={handleChange}
                  required
                />
                <label className="input-label5">
                  Email <span className="demo-email">(demo_user@gmail.com)</span>
                </label>
              </div>
              <div className={`input-wrapper-login ${password !== "" ? 'non-empty' : ''}`}>
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  id="password"
                  value={password}
                  onChange={handleChange}
                  required
                />
                <label className="input-label5">Password</label>
                <button
                  type="button"
                  className="toggle-password"
                  onClick={handleTogglePasswordVisibility}
                >
                  {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <button
                id="loginButton"
                type="submit"
                style={{
                  pointerEvents: (hasError || email === '' || password.length <= 7 ) ? 'none' : 'auto',
                  opacity: (hasError || email === '' ||  password.length <= 7) ? 0.5 : 1
                }}
              >
                Login
              </button>
            </form>
            <br />
            <p id="bottom">Don't have an account?</p>
            <span 
              id="bottom" 
              className="link" 
              onClick={handleDemoLogin}
            >
              Demo User
            </span>
            <Link 
              id="bottom" 
              className="link" 
              to="/signup"
            >
              <img src={PencilSVG} alt="Sign Up" style={{ width: '14px' }} />Sign Up
            </Link>
          </div>
        </div>
        <div className="car-container">
          <img src={car} style={{ marginLeft: "10%", width: "85%" }} />
        </div>
      </div>
    </>
  );
}

export default LoginFormPage;
