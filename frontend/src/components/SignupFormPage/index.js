import React, { useEffect, useState } from "react";
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
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errors, setErrors] = useState([]);
  
  const [passwordConditions, setPasswordConditions] = useState({
    hasLowercase: false,
    hasUppercase: false,
    hasNumber: false,
    hasSpecialChar: false
  });
  const [validPassword, setValidPassword] = useState(true);

  useEffect(() => {
    const updatedConditions = {
      hasLowercase: /[a-z]/.test(password),
      hasUppercase: /[A-Z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    setPasswordConditions(updatedConditions);

    const hasEightCharacters = password.length >= 8;
    const trueConditionsCount = Object.values(updatedConditions).filter(Boolean).length;

    setValidPassword((trueConditionsCount >= 3 && hasEightCharacters) || password.length === 0);
  }, [password]);

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.signup({ email, firstName, lastName, password, dateOfBirth }))
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

  const formatInputDate = (inputDate) => {
    const cleanedInput = inputDate.replace(/\D/g, '');
    if (cleanedInput.length === 8) {
      const year = cleanedInput.slice(0, 4);
      const month = cleanedInput.slice(4, 6);
      const day = cleanedInput.slice(-2);
      return `${year}-${month}-${day}`;
    }
    return inputDate;
  };

  const isValidAge = (dateOfBirth) => {
    if (dateOfBirth) {
      const cleanedInput = dateOfBirth.replace(/\D/g, '');
      if (cleanedInput.length !== 8) {
        return false;
      }
      const [year, month, day] = dateOfBirth.split('-');
      const dayNum = parseInt(day, 10);
      const monthNum = parseInt(month, 10);
      const yearNum = parseInt(year, 10);

      if (yearNum < 1900 || yearNum > new Date().getFullYear()) {
        return false;
      }

      const dob = new Date(yearNum, monthNum - 1, dayNum);
      if (dob.getMonth() !== monthNum - 1 || dob.getDate() !== dayNum) {
        return false;
      }

      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
      }

      return age >= 18 && age <= 100;
    } 
    return false; 
  };

  const isValidLength = (password) => {
    return password.length >= 8;
  };

  const isValidEmail = (email) => {
    const atIndex = email.indexOf('@');
    const dotIndex = email.indexOf('.');
    const atSym = email.split('@').length === 2 && atIndex !== 0;
    const dotSym = email.split('.').length === 2 && dotIndex > atIndex + 1;

    return atSym && dotSym && dotIndex <= email.length - 3;
  };

  if (sessionUser) return <Redirect to="/" />;

  return (
    <>
      <div className="sign-container">
        <div className="signupContainer">
          <div className="signupBox">
            <Link to="/" exact="true" style={{ textDecoration: 'underline', color: 'black', display: 'flex', alignItems: 'center', fontFamily: "Inter" }}>
              <img src={MyArrowSVG} alt="Back" style={{ width: '14px', marginTop: "2px" }} /> Back
            </Link>
            <br />
            <img src={logo} style={{ width: '50px' }} />
            <h1>Sign up to add more adventure!</h1>
            <p className="log-in-p" style={{ fontSize: "12px" }}>
              Sign up to agree to the use of your information. To learn more, visit our social terms of service and privacy policy pages.
            </p>
            <form onSubmit={handleSubmit}>
              <ul>
                {errors.map((error) =>
                  error === "Email has already been taken" ? (
                    <div key="email-error" className="email-error">
                      <img src="https://a.hwstatic.com/image/upload/hw/auth0/warning.svg" alt="Warning" />
                      <div className="error-message">
                        <span>You already have an account, try login instead!</span>
                      </div>
                      <div className="error-login">
                        <Link id="bottom" className="link" to="/login" style={{ fontFamily: "Inter-bold" }}>Login</Link>
                      </div>
                    </div>
                  ) : (
                    <li key={error}>{error}</li>
                  )
                )}
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

              <div className={`input-wrapper-login ${dateOfBirth ? 'non-empty' : ''}`}>
                <input
                  type="text"
                  name="dateOfBirth"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(formatInputDate(e.target.value))}
                  required
                />
                <label className="input-label5">Date of Birth</label>
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

                {!validPassword && (
                  <div className="password-check">
                    <span style={{ color: password.length >= 8 ? 'green' : 'red' }}>
                      At least 8 characters
                    </span>
                    <span>Contain at least 3 of the following 4 types of characters:</span>
                    <span style={{ color: passwordConditions.hasLowercase ? 'green' : 'white' }}>
                      {passwordConditions.hasLowercase ? '✓' : '✗'} Lowercase Letters
                    </span>
                    <span style={{ color: passwordConditions.hasUppercase ? 'green' : 'white' }}>
                      {passwordConditions.hasUppercase ? '✓' : '✗'} Uppercase Letters
                    </span>
                    <span style={{ color: passwordConditions.hasNumber ? 'green' : 'white' }}>
                      {passwordConditions.hasNumber ? '✓' : '✗'} Numbers
                    </span>
                    <span style={{ color: passwordConditions.hasSpecialChar ? 'green' : 'white' }}>
                      {passwordConditions.hasSpecialChar ? '✓' : '✗'} Special Characters
                    </span>
                  </div>
                )}
              </div>

              <button
                id="loginButton"
                className="signup-button"
                type="submit"
                style={{ 
                  pointerEvents: (isValidEmail(email) && isValidLength(password) && firstName && lastName && isValidAge(dateOfBirth) && validPassword) ? 'auto' : 'none',
                  opacity: (isValidEmail(email) && isValidLength(password) && firstName && lastName && isValidAge(dateOfBirth) && validPassword) ? 1 : 0.5
                }}
              >
                Sign Up
              </button>
            </form>

            <br />
            <p id="bottom">Already have an account?</p>

            <Link id="bottom" className="link" to="/login" style= {{fontFamily: "Inter-bold"}}> <img src={UserSVG} alt="Back" style={{ width: '14px' }}/>Login </Link>
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