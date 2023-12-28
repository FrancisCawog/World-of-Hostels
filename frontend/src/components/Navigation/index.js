import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from "../../assets/pictures/Screenshot 2023-11-12 at 3.36.15 PM.png";
import './Navigation.css';
import userIcon from "../../assets/pictures/icons/user-128.svg"
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import navIcon from "../../assets/pictures/icons/Screenshot 2023-11-19 at 9.22.41 PM.png";
import MyArrowSVG from "../../assets/pictures/icons/arrow-left.svg"
import { useHistory } from 'react-router-dom';

function Navigation() {
  const dispatch = useDispatch();
  const location = useLocation();
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();

  const handleLogout = () => {
    dispatch(sessionActions.logout());
    history.push('/');
  };

  let contentToRender = null;

  if (location.pathname === '/') {
    contentToRender = (
      <div className="container">
        <header>
          <div className="left-content">
            <img src={logo} style={{ width: '50px' }} alt="Logo" />
            <p className="WOF">World of Hostels</p>
          </div>
          
          <div className="circles">
            <Link to="/login">
              <div className="circle">
                <img src={userIcon} alt="User" />
              </div>
            </Link>
            <div className="circle">
                <img src={navIcon} style={{width: "12px", marginLeft: "30%"}} alt="Nav" />
            </div>
          </div>
        </header>
      </div>
    );
  } else if (location.pathname.startsWith('/listings')) {
    contentToRender = (
      <div className="listings-header">
        <header>
          <div className="left-content">
            <img src={MyArrowSVG} alt="Back" style={{ width: '16px' }}/>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={logo} style={{ width: '25px'}} alt="Logo" />
                    <p className="LWOF" style={{ display: 'inline-block'}}>World of Hostels</p>
                </div>
            </Link>
          </div>
          
          <div className="circles">
            <Link to="/login">
              <div className="lcircle">
                <img src={userIcon} alt="User" />
              </div>
            </Link>
            <div className="lcircle">
            <img src={navIcon} style={{width: "15px", marginLeft: "25%"}} alt="Nav" />
            </div>
          </div>
        </header>
      </div>
    )
  } else if (location.pathname.startsWith('/users')) {
    contentToRender = (
      <div className="listings-header2">
        <header>
          <div className="left-content">
            <img src={MyArrowSVG} alt="Back" style={{ width: '16px' }}/>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={logo} style={{ width: '25px'}} alt="Logo" />
                    <p className="LWOF" style={{ display: 'inline-block'}}>World of Hostels</p>
                </div>
            </Link>
          </div>
          
          <div className="circles">
            <Link to="/login">
              <div className="lcircle">
                <img src={userIcon} alt="User" />
              </div>
            </Link>
            <div className="lcircle">
            <img src={navIcon} style={{width: "15px", marginLeft: "25%"}} alt="Nav" />
            </div>
          </div>
        </header>
      </div>
    );
  }
  return (
    <div>
      {contentToRender}
      {sessionUser && (
        <button onClick={handleLogout}>Logout</button>
      )}
    </div>
  );
}

export default Navigation;