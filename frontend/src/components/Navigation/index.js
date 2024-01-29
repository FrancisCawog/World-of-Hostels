import React, { useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import logo from "../../assets/pictures/Screenshot 2023-11-12 at 3.36.15 PM.png";
import './Navigation.css';
import userIcon from "../../assets/pictures/icons/user-128.svg"
import houseIcon from "../../assets/pictures/icons/house-svgrepo-com.svg"
import mapIcon from "../../assets/pictures/icons/clipart2731071.png"
import logoutIcon from "../../assets/pictures/icons/logout-svgrepo-com.svg"
import github from "../../assets/pictures/icons/github-icon-logo-png-transparent.png"
import linkedin from "../../assets/pictures/icons/LinkedIn_icon.svg.png"
import portfolio from "../../assets/pictures/icons/portfolio-svgrepo-com.svg"
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import navIcon from "../../assets/pictures/icons/Screenshot 2023-11-19 at 9.22.41 PM.png";
import MyArrowSVG from "../../assets/pictures/icons/arrow-left.svg"

function Navigation() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isCredentialDropdownVisible, seCredentialtIsDropdownVisible] = useState(false);
  const defaultPic = "https://world-of-hostels-seeds.s3.amazonaws.com/profile_pics/user8.jpeg"

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
    seCredentialtIsDropdownVisible(false);
  };

  const toggleCredentialDropdown = () => {
    seCredentialtIsDropdownVisible(!isCredentialDropdownVisible);
    setIsDropdownVisible(false);
  };

  const handleAccountClick = (tabName) => {
    history.push('/users/1', { tabName });
  };

  const handleLogout = () => {
    dispatch(sessionActions.logout());
    history.push('/');
  };

  const goBack = () => {
    history.goBack(); 
  };

  const handleRedirect = (link) => {
    let targetUrl = '';
    switch (link) {
      case 'github':
        targetUrl = 'https://github.com/FrancisCawog';
        break;
      case 'portfolio':
        targetUrl = 'https://franciscawog.com';
        break;
      case 'linkedin':
        targetUrl = 'https://www.linkedin.com/in/francis-cawog-958178187';
        break;
      default:
        break;
    }
  
    if (targetUrl !== '') {
      window.open(targetUrl, '_blank');
    }
  };
  

  let contentToRender = null;

  if (location.pathname === '/') {
    contentToRender = (
      <div className="container">
      <header>
        <div className="left-content">
          <img src={logo} alt="Logo" className='left-content-img'/>
          <p className="WOF">World of Hostels</p>
        </div>
        
        <div className="circles">
          {!sessionUser ? (
            <Link to="/login">
              <div className="circle">
                <img src={userIcon} alt="User" className='circle-21'/>
              </div>
            </Link>
          ) : (
            <div>
              <div className="circle" onClick={toggleDropdown}>
                <img src={sessionUser.photoUrl || defaultPic} alt="User" className='circle-28'/>
              </div>

              {isDropdownVisible && (
                <div className="popover">
                  <div className='popover-menu-body'>
                    <div className='avatar-and-name'>
                      <div className="circle" onClick={(e) => e.stopPropagation()}>
                      <img src={sessionUser.photoUrl || defaultPic} alt="User" className='circle-28'/>
                      </div>
                      <p>{sessionUser.first_name} {sessionUser.last_name}</p>
                    </div>
                    <div className='select-list'>
                      <ul className='select-list-menu'>
                        <li className='list-item'>
                          <button className='item-button' onClick={() => handleAccountClick("Home")}>
                            <div className='item-button-icon'>
                              <img src={houseIcon} alt="User" />
                            </div>
                            <div className='item-button-text'>
                              <p>Account</p>
                            </div>
                          </button>
                        </li>
                        <li className='list-item'>
                          <button className='item-button' onClick={() => handleAccountClick("Edit Details")}>
                            <div className='item-button-icon'>
                              <img src={userIcon} alt="User" />
                            </div>
                            <div className='item-button-text'>
                              <p>Edit Details</p>
                            </div>
                          </button>
                        </li>
                        <li className='list-item'>
                          <button className='item-button' onClick={() => handleAccountClick("My Trips")}>
                            <div className='item-button-icon'>
                              <img src={mapIcon} alt="User" />
                            </div>
                            <div className='item-button-text'>
                              <p>My Trips</p>
                            </div>
                          </button>
                        </li>
                        <li className='list-item'>
                          <button className='item-button' onClick={handleLogout}>
                            <div className='item-button-icon'>
                              <img src={logoutIcon} alt="User" />
                            </div>
                            <div className='item-button-text'>
                              <p>Logout</p>
                            </div>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          <div className="circle" onClick={toggleCredentialDropdown}>
            <img src={navIcon} className='circle-12' alt="Nav" />
          </div>

          {isCredentialDropdownVisible && (
            <div className="popover" onClick={(e) => e.stopPropagation()}>
              <div className='popover-menu-body'>
                <div className='select-list'>
                  <ul className='select-list-menu'>
                    <li className='list-item'>
                      <button className='item-button' onClick={() => handleRedirect("linkedin")}>
                        <div className='item-button-icon'>
                          <img src={linkedin} alt="User" />
                        </div>
                        <div className='item-button-text'>
                          <p>Linkedin</p>
                        </div>
                      </button>
                    </li>
                    <li className='list-item'>
                      <button className='item-button' onClick={() => handleRedirect("github")}>
                        <div className='item-button-icon'>
                          <img src={github} alt="User" />
                        </div>
                        <div className='item-button-text'>
                          <p>Github</p>
                        </div>
                      </button>
                    </li>
                    <li className='list-item'>
                      <button className='item-button' onClick={() => handleRedirect("portfolio")}>
                        <div className='item-button-icon'>
                          <img src={portfolio} alt="User" />
                        </div>
                        <div className='item-button-text'>
                          <p>Portfolio</p>
                        </div>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
    );
  } else if (location.pathname === '/ConfirmationPage') {
    contentToRender = (
      <div className="container-conf">
      <header className='conf-header'>
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="left-content">
          <img src={logo} style={{ width: '68px', borderRadius: "15px" }} alt="Logo" />
          <p className="WOF-conf">World of Hostels</p>
        </div>
      </Link>
        
        <div className="circles">
          {!sessionUser ? (
            <Link to="/login">
              <div className="circle">
                <img src={userIcon} alt="User" className='circle-21'/>
              </div>
            </Link>
          ) : (
            <div>
              <div className="circle" onClick={toggleDropdown}>
                <img src={sessionUser.photoUrl || defaultPic} alt="User" className='circle-28'/>
              </div>

              {isDropdownVisible && (
                <div className="popover">
                  <div className='popover-menu-body'>
                    <div className='avatar-and-name'>
                      <div className="circle" onClick={(e) => e.stopPropagation()}>
                        <img src={sessionUser.photoUrl || defaultPic} alt="User" className='circle-28'/>
                      </div>
                      <p>{sessionUser.first_name} {sessionUser.last_name}</p>
                    </div>
                    <div className='select-list'>
                      <ul className='select-list-menu'>
                        <li className='list-item'>
                          <button className='item-button' onClick={() => handleAccountClick("Home")}>
                            <div className='item-button-icon'>
                              <img src={houseIcon} alt="User" />
                            </div>
                            <div className='item-button-text'>
                              <p>Account</p>
                            </div>
                          </button>
                        </li>
                        <li className='list-item'>
                          <button className='item-button' onClick={() => handleAccountClick("Edit Details")}>
                            <div className='item-button-icon'>
                              <img src={userIcon} alt="User" />
                            </div>
                            <div className='item-button-text'>
                              <p>Edit Details</p>
                            </div>
                          </button>
                        </li>
                        <li className='list-item'>
                          <button className='item-button' onClick={() => handleAccountClick("My Trips")}>
                            <div className='item-button-icon'>
                              <img src={mapIcon} alt="User" />
                            </div>
                            <div className='item-button-text'>
                              <p>My Trips</p>
                            </div>
                          </button>
                        </li>
                        <li className='list-item'>
                          <button className='item-button' onClick={handleLogout}>
                            <div className='item-button-icon'>
                              <img src={logoutIcon} alt="User" />
                            </div>
                            <div className='item-button-text'>
                              <p>Logout</p>
                            </div>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          <div className="circle" onClick={toggleCredentialDropdown}>
            <img src={navIcon} style={{ width: "12px", marginLeft: "30%" }} alt="Nav" />
          </div>

          {isCredentialDropdownVisible && (
            <div className="popover" onClick={(e) => e.stopPropagation()}>
              <div className='popover-menu-body'>
                <div className='select-list'>
                  <ul className='select-list-menu'>
                    <li className='list-item'>
                      <button className='item-button' onClick={() => handleRedirect("linkedin")}>
                        <div className='item-button-icon'>
                          <img src={linkedin} alt="User" />
                        </div>
                        <div className='item-button-text'>
                          <p>Linkedin</p>
                        </div>
                      </button>
                    </li>
                    <li className='list-item'>
                      <button className='item-button' onClick={() => handleRedirect("github")}>
                        <div className='item-button-icon'>
                          <img src={github} alt="User" />
                        </div>
                        <div className='item-button-text'>
                          <p>Github</p>
                        </div>
                      </button>
                    </li>
                    <li className='list-item'>
                      <button className='item-button' onClick={() => handleRedirect("portfolio")}>
                        <div className='item-button-icon'>
                          <img src={portfolio} alt="User" />
                        </div>
                        <div className='item-button-text'>
                          <p>Portfolio</p>
                        </div>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
    )
  } else if (location.pathname.startsWith('/listings')) {
    contentToRender = (
      <div className="listings-header">
        <header>
          <div className="left-content">
            <img src={MyArrowSVG} alt="Back" style={{ width: '16px' }} onClick={goBack}/>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={logo} style={{ width: '25px'}} alt="Logo" />
                    <p className="LWOF" style={{ display: 'inline-block'}}>World of Hostels</p>
                </div>
            </Link>
          </div>
          
          <div className="circles">
          {!sessionUser ? (
            <Link to="/login">
              <div className="circle">
                <img src={userIcon} alt="User" className='circle-21'/>
              </div>
            </Link>
          ) : (
            <div>
              <div className="circle" onClick={toggleDropdown}>
              <img src={sessionUser.photoUrl || defaultPic} alt="User" className='circle-28'/>
              </div>

              {isDropdownVisible && (
                <div className="popover" style={{marginRight: "0"}}>
                  <div className='popover-menu-body'>
                    <div className='avatar-and-name'>
                      <div className="circle" onClick={(e) => e.stopPropagation()}>
                      <img src={sessionUser.photoUrl || defaultPic} alt="User" className='circle-28'/>
                      </div>
                      <p>{sessionUser.first_name} {sessionUser.last_name}</p>
                    </div>
                    <div className='select-list'>
                      <ul className='select-list-menu'>
                        <li className='list-item'>
                          <button className='item-button' onClick={() => handleAccountClick("Home")}>
                            <div className='item-button-icon'>
                              <img src={houseIcon} alt="User" />
                            </div>
                            <div className='item-button-text'>
                              <p>Account</p>
                            </div>
                          </button>
                        </li>
                        <li className='list-item'>
                          <button className='item-button' onClick={() => handleAccountClick("Edit Details")}>
                            <div className='item-button-icon'>
                              <img src={userIcon} alt="User" />
                            </div>
                            <div className='item-button-text'>
                              <p>Edit Details</p>
                            </div>
                          </button>
                        </li>
                        <li className='list-item'>
                          <button className='item-button' onClick={() => handleAccountClick("My Trips")}>
                            <div className='item-button-icon'>
                              <img src={mapIcon} alt="User" />
                            </div>
                            <div className='item-button-text'>
                              <p>My Trips</p>
                            </div>
                          </button>
                        </li>
                        <li className='list-item'>
                          <button className='item-button' onClick={handleLogout}>
                            <div className='item-button-icon'>
                              <img src={logoutIcon} alt="User" />
                            </div>
                            <div className='item-button-text'>
                              <p>Logout</p>
                            </div>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          <div className="circle" onClick={toggleCredentialDropdown}>
            <img src={navIcon} style={{ width: "12px", marginLeft: "30%" }} alt="Nav" />
          </div>

          {isCredentialDropdownVisible && (
            <div className="popover" style={{marginRight: "0"}} onClick={(e) => e.stopPropagation()}>
              <div className='popover-menu-body'>
                <div className='select-list'>
                  <ul className='select-list-menu'>
                    <li className='list-item'>
                      <button className='item-button' onClick={() => handleRedirect("linkedin")}>
                        <div className='item-button-icon'>
                          <img src={linkedin} alt="User" />
                        </div>
                        <div className='item-button-text'>
                          <p>Linkedin</p>
                        </div>
                      </button>
                    </li>
                    <li className='list-item'>
                      <button className='item-button' onClick={() => handleRedirect("github")}>
                        <div className='item-button-icon'>
                          <img src={github} alt="User" />
                        </div>
                        <div className='item-button-text'>
                          <p>Github</p>
                        </div>
                      </button>
                    </li>
                    <li className='list-item'>
                      <button className='item-button' onClick={() => handleRedirect("portfolio")}>
                        <div className='item-button-icon'>
                          <img src={portfolio} alt="User" />
                        </div>
                        <div className='item-button-text'>
                          <p>Portfolio</p>
                        </div>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
    )
  } else if (location.pathname.startsWith('/users')) {
    contentToRender = (
      <div className="listings-header2">
        <header>
          <div className="left-content">
            <img src={MyArrowSVG} alt="Back" style={{ width: '16px' }} onClick={goBack}/>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={logo} style={{ width: '25px'}} alt="Logo" />
                    <p className="LWOF" style={{ display: 'inline-block'}}>World of Hostels</p>
                </div>
            </Link>
          </div>
          
          <div className="circles">
          {!sessionUser ? (
            <Link to="/login">
              <div className="circle">
                <img src={userIcon} alt="User" />
              </div>
            </Link>
          ) : (
            <div>
              <div className="circle" onClick={toggleDropdown}>
                <img src={sessionUser.photoUrl || defaultPic} alt="User" className='circle-28'/>
              </div>

              {isDropdownVisible && (
                <div className="popover" style={{marginRight: "7.5%"}}>
                  <div className='popover-menu-body'>
                    <div className='avatar-and-name'>
                      <div className="circle" onClick={(e) => e.stopPropagation()}>
                        <img src={sessionUser.photoUrl || defaultPic} alt="User" className='circle-28'/>
                      </div>
                      <p>{sessionUser.first_name} {sessionUser.last_name}</p>
                    </div>
                    <div className='select-list'>
                      <ul className='select-list-menu'>
                        <li className='list-item'>
                          <button className='item-button' onClick={() => handleAccountClick("Home")}>
                            <div className='item-button-icon'>
                              <img src={houseIcon} alt="User" />
                            </div>
                            <div className='item-button-text'>
                              <p>Account</p>
                            </div>
                          </button>
                        </li>
                        <li className='list-item'>
                          <button className='item-button' onClick={() => handleAccountClick("Edit Details")}>
                            <div className='item-button-icon'>
                              <img src={userIcon} alt="User" />
                            </div>
                            <div className='item-button-text'>
                              <p>Edit Details</p>
                            </div>
                          </button>
                        </li>
                        <li className='list-item'>
                          <button className='item-button' onClick={() => handleAccountClick("My Trips")}>
                            <div className='item-button-icon'>
                              <img src={mapIcon} alt="User" />
                            </div>
                            <div className='item-button-text'>
                              <p>My Trips</p>
                            </div>
                          </button>
                        </li>
                        <li className='list-item'>
                          <button className='item-button' onClick={handleLogout}>
                            <div className='item-button-icon'>
                              <img src={logoutIcon} alt="User" />
                            </div>
                            <div className='item-button-text'>
                              <p>Logout</p>
                            </div>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          <div className="circle" onClick={toggleCredentialDropdown}>
            <img src={navIcon} style={{ width: "12px", marginLeft: "30%" }} alt="Nav" />
          </div>

          {isCredentialDropdownVisible && (
            <div className="popover" style={{marginRight: "7.5%"}} onClick={(e) => e.stopPropagation()}>
              <div className='popover-menu-body'>
                <div className='select-list'>
                  <ul className='select-list-menu'>
                    <li className='list-item'>
                      <button className='item-button' onClick={() => handleRedirect("linkedin")}>
                        <div className='item-button-icon'>
                          <img src={linkedin} alt="User" />
                        </div>
                        <div className='item-button-text'>
                          <p>Linkedin</p>
                        </div>
                      </button>
                    </li>
                    <li className='list-item'>
                      <button className='item-button' onClick={() => handleRedirect("github")}>
                        <div className='item-button-icon'>
                          <img src={github} alt="User" />
                        </div>
                        <div className='item-button-text'>
                          <p>Github</p>
                        </div>
                      </button>
                    </li>
                    <li className='list-item'>
                      <button className='item-button' onClick={() => handleRedirect("portfolio")}>
                        <div className='item-button-icon'>
                          <img src={portfolio} alt="User" />
                        </div>
                        <div className='item-button-text'>
                          <p>Portfolio</p>
                        </div>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
    );
  } 
  return (
    <div>
      {contentToRender}
    </div>
  );
}

export default Navigation;
