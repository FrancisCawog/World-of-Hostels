import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';
import { Link } from "react-router-dom"
import car from "../../assets/pictures/Screenshot 2023-11-12 at 12.22.54 PM.png"
import logo from "../../assets/pictures/Screenshot 2023-11-12 at 3.36.15 PM.png"
import MyArrowSVG from "../../assets/pictures/icons/arrow-left.svg"
import UserSVG from "../../assets/pictures/icons/user-line.svg"

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
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

  return (
    <>
    <div className="sign-container">
        <div className="signupContainer">
          <div className="signupBox">
            <Link to="/" exact="true" style={{ textDecoration: 'underline', color: 'black', display: 'flex', alignItems: 'center', fontFamily: "Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Helvetica,Arial,sans-serif", fontWeight: "bolder" }}>
                <img src={MyArrowSVG} alt="Back" style={{ width: '14px', marginTop: "2px" }}/> Back
              </Link>
            <br/>
            <img src={logo} style={{ width: '50px' }}/>
              <h1>Sign up to add more adventure!</h1> 
              <p className="log-in-p" style={{fontSize: "12px"}}> Sign up to agree to the use of your information. To learn more, visit our social terms of service and privacy policy pages. </p>
              <form onSubmit={handleSubmit}>
            <ul>
              {errors.map((error) => <li key={error}>{error}</li>)}
                </ul>

                <div className={`input-wrapper-login ${firstName !== "" ? 'non-empty' : ''}`}>
                     <input
                      type="text"
                      name="firstName"
                      id="location"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                    <label className="input-label5">
                      First Name
                    </label>
                </div>
                <div className={`input-wrapper-login ${lastName !== "" ? 'non-empty' : ''}`}>
                     <input
                      type="text"
                      name="lastName"
                      id="location"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                    <label className="input-label5">
                      Last Name
                    </label>
                </div>
                <div className={`input-wrapper-login ${email !== "" ? 'non-empty' : ''}`}>
                     <input
                      type="text"
                      name="email"
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

                <button id="loginButton" type="submit" style={{pointerEvents: (email !== '' && password !== '' && firstName !== '' && lastName !== '') ? 'auto' : 'none', opacity: (email === '' || password === '' && firstName !== '' && lastName !== '') ? 0.5 : 1}}>Sign Up</button>
              </form>

              <br/>
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