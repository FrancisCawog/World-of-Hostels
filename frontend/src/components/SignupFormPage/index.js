import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';
import car from "../../assets/pictures/Screenshot 2023-11-12 at 12.22.54 PM.png";
import logo from "../../assets/pictures/Screenshot 2023-11-12 at 3.36.15 PM.png";
import MyArrowSVG from "../../assets/pictures/icons/arrow-left.svg";
import UserSVG from "../../assets/pictures/icons/user-line.svg";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.signup({ email, firstName, lastName, password }))
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

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <>
      <div className="sign-container">
        <div className="signupContainer">
          <div className="signupBox">
            <Link to="/" exact="true" style={{ textDecoration: 'underline', color: 'black', display: 'flex', alignItems: 'center', fontFamily: "Inter" }}>
              <img src={MyArrowSVG} alt="Back" style={{ width: '14px', marginTop: "2px" }}/> Back
            </Link>
            <br />
            <img src={logo} style={{ width: '50px' }}/>
            <h1>Sign up to add more adventure!</h1>
            <p className="log-in-p" style={{fontSize: "12px"}}> Sign up to agree to the use of your information. To learn more, visit our social terms of service and privacy policy pages. </p>
            <form onSubmit={handleSubmit}>
              <ul>
                {errors.map((error) => <li key={error}>{error}</li>)}
              </ul>

              <div className={`input-wrapper-login ${firstName ? 'non-empty' : ''}`}>
                <input
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <label className="input-label5">First Name</label>
              </div>

              <div className={`input-wrapper-login ${lastName ? 'non-empty' : ''}`}>
                <input
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
                <label className="input-label5">Last Name</label>
              </div>

              <div className={`input-wrapper-login ${email ? 'non-empty' : ''}`}>
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label className="input-label5">Email</label>
              </div>

              <div className={`input-wrapper-login ${password ? 'non-empty' : ''}`}>
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                className="signup-button"
                style={{ 
                  pointerEvents: (email && password && firstName && lastName) ? 'auto' : 'none',
                  opacity: (email && password && firstName && lastName) ? 1 : 0.5
                }}
              >
                Sign Up
              </button>
            </form>

            <br />
            <p id="bottom">Already have an account?</p>
            <Link id="bottom" className="link" to="/login">
              <img src={UserSVG} alt="Back" style={{ width: '14px' }}/> Login
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

export default SignupFormPage;