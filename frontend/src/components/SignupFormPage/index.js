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
            <Link to="/" exact="true">
              <img src={MyArrowSVG} alt="Back" style={{ width: '10px' }}/> Back
            </Link>
            <br/>
            <br/>
            <img src={logo} style={{ width: '50px' }}/>
              <h1>Sign up to add more adventure!</h1> 
              <p> See who else is staying in your hostel and let others know you are staying too. Get to know the names and ages of your fellow travellers and message to say hello before you go. Meet other travellers by joining or organising events to explore together.</p>
              <p> Sign up to agree to the use of your information. To learn more, visit our social terms of service and privacy policy pages. </p>
              <form onSubmit={handleSubmit}>
            <ul>
              {errors.map((error) => <li key={error}>{error}</li>)}
                </ul>

                <label>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </label>

                <label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </label>

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

                <button className="sign-up-button" type="submit" >Sign Up</button>
              </form>

              <br/>
              <p id="bottom">Already have an account?</p>
              <Link id="bottom" className="link" to="/login">
                <img src={UserSVG} alt="Back" style={{ width: '14px' }}/> Login
              </Link>
              <p>If you do not want to participate in social features continue as a guest and do not sign in above. You can always turn off social features in your settings.</p>
            </div>
          </div>

            <div className="car-container">
            <img src={car} ></img>
          </div>
        </div>
      </>
  );
}

export default SignupFormPage;