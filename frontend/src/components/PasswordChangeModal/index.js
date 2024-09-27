import { useState,useEffect } from 'react';
import errorSvg from "../../assets/pictures/icons/error.svg";
import "./PasswordChangeModal.css"
import { passwordChange } from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';

const PasswordChangeModal = ({ onClose }) => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.user.id);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);

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
                        alert("Password updated successfully");  ////////////
                        onClose();
                    })
                    .catch(err => {
                        alert("Password update failed. " + err.message);  ////////
                    });
            } else {
                alert("User ID is not available. Please log in again.");  
            }
        } else {
            alert("New passwords do not match or invalid."); ///////////
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="password-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-content">
                    <p className="update-password-title">Update Password</p>
                    <span className="close" onClick={onClose}>&times;</span>

                    <div className="horizontal-line"/>

                    <div className='three-passwords'>
                        <div className={`input-wrapper-login ${oldPassword ? 'non-empty' : ''}`}>
                            <input
                            type="password"
                            name="verifyPassword"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            required
                            />
                            <label className="input-label5">Existing Password</label>
                        </div>

                        <div className={`input-wrapper-login ${newPassword ? 'non-empty' : ''}`}>
                            <input
                            type= "password"
                            name="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            />
                            <label className="input-label5">New Password</label>
                            <span className='password-change-condition'>
                                <img src={errorSvg}/>
                                Must be 8 or more characters, with at least 1 lowercase letter and one number.
                            </span>
                        </div>

                        <div className={`input-wrapper-login ${verifyPassword ? 'non-empty' : ''}`}>
                            <input
                            type="password"
                            name="verifyPassword"
                            value={verifyPassword}
                            onChange={(e) => setVerifyPassword(e.target.value)}
                            required
                            />
                            <label className="input-label5">Verify Password</label>
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