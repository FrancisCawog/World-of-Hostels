import { useState,useEffect } from 'react';
import { updatePassword } from "../../store/demoUserSlice";
import errorSvg from "../../assets/pictures/icons/error.svg";
import redError from "../../assets/pictures/icons/exclamation-mark-inside-a-circle-svgrepo-com.webp"
import "./PasswordChangeModal.css"
import { passwordChange } from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';

const PasswordChangeModal = ({ onClose, setShowPasswordChange }) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const demoPassword = useSelector((state) => state.demoUser.password);
    const userId = useSelector(state => state.session.user.id);

    const [oldPassword, setOldPassword] = useState("");
    const [samePasswords, setSamePassword] = useState(true);
    const [newPassword, setNewPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [isEFocused, setIsEFocused] = useState(false);
    const [isPFocused, setIsPFocused] = useState(false);
    const [isVFocused, setIsVFocused] = useState(false);
    let unmatchedPassword;

    useEffect(() => {
        const updatedConditions = {
            hasLowercase: /[a-z]/.test(newPassword),
            hasNumber: /\d/.test(newPassword),
        };

        const hasEightCharacters = newPassword.length >= 8;
        const trueConditionsCount = Object.values(updatedConditions).filter(Boolean).length;

        setValidPassword((trueConditionsCount === 2 && hasEightCharacters) || newPassword.length === 0);
    }, [newPassword]);

    function isValidLength(newPassword){
        if (newPassword.length < 8){
          return false
        } else {
          return true
        }
      }

    function samePassword(newPassword, verifyPassword) {
        return newPassword === verifyPassword
    }

    const handleChangePassword = () => {
        if (newPassword === verifyPassword && validPassword) {
            if (userId) {
                dispatch(passwordChange(userId, oldPassword, newPassword))
                    .then(() => {
                        onClose();
                        setShowPasswordChange(true);

                        if (currentUser.email === "demo_user@gmail.com") {
                            dispatch(updatePassword(newPassword));
                        }
                    })
                    .catch(err => {
                        unmatchedPassword = oldPassword;
                        setSamePassword(false);
                    });
            } else {
                alert("User ID is not available. Please refresh page. If issue persists, log in again.");  
            }
        } else {
            alert("New passwords do not match or invalid.");
        }
    };

    useEffect(() => {
        if (!samePasswords) {
            if (oldPassword !== unmatchedPassword){
                setSamePassword(true);
            }
        }
    },[oldPassword])

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="password-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-content">
                    <p className="update-password-title">Update Password</p>
                    <span className="close" onClick={onClose}>&times;</span>

                    <div className="horizontal-line"/>

                    <div className='three-passwords'>
                        <div className={`input-wrapper-login ${oldPassword ? 'non-empty' : ''} ${!samePasswords ? 'notValid' : ''}`} 
                        id="oldPassword"
                        >
                            <input
                            type="password"
                            name="verifyPassword"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            onFocus={() => setIsEFocused(true)}
                            onBlur={() => setIsEFocused(false)}
                            required
                            />

                            <label className="input-label5">
                            Existing Password 
                            {currentUser.email === "demo_user@gmail.com" && (
                                <span style={{ color: "#0079faa9" }}> ({demoPassword})</span>
                            )}
                            </label>

                            {!isEFocused && !samePasswords &&
                                <span className='password-change-condition'>
                                    <img src={redError}/>
                                    This password does not match your current password
                                </span>
                            }
                        </div>

                        <div 
                            className={`input-wrapper-login ${newPassword ? 'non-empty' : ''} ${newPassword !== "" && !validPassword ? 'notValid' : ''}`} 
                            id="newPassword"
                        >
                            <input
                            type= "password"
                            name="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            onFocus={() => setIsPFocused(true)}
                            onBlur={() => setIsPFocused(false)}
                            required
                            />
                            <label className="input-label5">New Password</label>

                            {isPFocused || newPassword === "" || validPassword ? 
                                <span className='password-change-condition'>
                                    <img src={errorSvg}/>
                                    Must be 8 or more characters, with at least 1 lowercase letter and one number.
                                </span>
                            : 
                            <span className='password-change-condition'>
                                <img src={redError}/>
                                Must be 8 or more characters, with at least 1 lowercase letter and one number.
                            </span>
                            }
                        </div>

                        <div 
                            className={`input-wrapper-login ${verifyPassword ? 'non-empty' : ''} ${verifyPassword !== "" && verifyPassword !== newPassword ? 'notValid' : ''}`} 
                            id="verifyPassword"
                            >
                            <input
                            type="password"
                            name="verifyPassword"
                            value={verifyPassword}
                            onChange={(e) => setVerifyPassword(e.target.value)}
                            onFocus={() => setIsVFocused(true)}
                            onBlur={() => setIsVFocused(false)}
                            required
                            />
                            <label className="input-label5">Verify Password</label>

                            {!isVFocused && verifyPassword !== "" && verifyPassword !== newPassword &&
                                <span className='password-change-condition'>
                                    <img src={redError}/>
                                    Passwords do not match
                                </span>
                            }
                        </div>
                    </div>

                    <div className="horizontal-line2" style={{marginTop: "-15px"}}/>

                    <button
                        id="ChangePasswordButton"
                        type="submit"
                        className="signup-button"
                        onClick={handleChangePassword}
                        style={{ 
                        pointerEvents: (isValidLength(oldPassword) && isValidLength(newPassword) && samePassword(newPassword, verifyPassword) && validPassword) ? 'auto' : 'none',
                        opacity: (isValidLength(oldPassword) && isValidLength(newPassword) && samePassword(newPassword, verifyPassword) && validPassword) ? 1 : 0.5
                        }}
                    >
                        Update Password
                    </button>
                </div>
            </div>
        </div>
    )
};

export default PasswordChangeModal;