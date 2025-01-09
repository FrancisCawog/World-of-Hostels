import { React, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../store/session";
import PasswordChangeModal from "../../PasswordChangeModal";
import NationalityModal from "../../NationalityModal";
import KeySVG from "../../../assets/pictures/icons/key.svg";

export function UserEdit({ sessionUser, setButtonDisabled }) {
  const [fullName, setFullName] = useState(sessionUser.first_name + " " + sessionUser.last_name);
  const [showNationality, setShowNationality] = useState(false);
  const [userNationality, setUserNationality] = useState(sessionUser.nationality);
  const defaultPic = "https://world-of-hostels-seeds.s3.amazonaws.com/profile_pics/user8.jpeg";
  let formattedDate = null;

  if (sessionUser.date_of_birth) {
    const [year, month, day] = sessionUser.date_of_birth.split("-");
    formattedDate = `${year}-${month}-${day}`;
  }

  const [dateOfBirth, setDateOfBirth] = useState(flip(formattedDate));

  const handleNationalityInput = () => {
    setShowNationality(true);
  };

  const handleModalInputChange = (newValue) => {
    setUserNationality(newValue);
    setShowNationality(false);
  };

  const closeNationality = () => {
    setShowNationality(false);
  };

  function isValidAge(dateOfBirth) {
    if (dateOfBirth) {
      const cleanedInput = dateOfBirth.replace(/\D/g, "");
      if (cleanedInput.length !== 8) return false;

      const [year, month, day] = dateOfBirth.split("-");
      const dayNum = parseInt(day, 10);
      const monthNum = parseInt(month, 10);
      const yearNum = parseInt(year, 10);

      if (yearNum < 1900 || yearNum > new Date().getFullYear()) return false;

      const dob = new Date(yearNum, monthNum - 1, dayNum);
      if (dob.getMonth() !== monthNum - 1 || dob.getDate() !== dayNum) return false;

      const today2 = new Date();
      let age = today2.getFullYear() - dob.getFullYear();
      const monthDiff = today2.getMonth() - dob.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today2.getDate() < dob.getDate())) {
        age--;
      }

      return age >= 18 && age <= 100;
    }
    return false;
  }

  function flip(formattedDate) {
    if (formattedDate) {
      const [year, month, day] = formattedDate.split("-");
      return `${year}-${month}-${day}`;
    }
    return false;
  }

  function formatInputDate(inputDate) {
    const cleanedInput = inputDate.replace(/\D/g, "");
    if (cleanedInput.length === 8) {
      const year = cleanedInput.slice(0, 4);
      const month = cleanedInput.slice(4, 6);
      const day = cleanedInput.slice(-2);
      return `${year}-${month}-${day}`;
    }
    return inputDate;
  }

  useEffect(() => {
    const [firstName, lastName] = fullName.split(" ");

    if (
      (dateOfBirth?.length === 0 && formattedDate === null && sessionUser.nationality === userNationality &&
        sessionUser.first_name === firstName && sessionUser.last_name === lastName) ||
      fullName.length === 0 || fullName.split(" ").length > 2 || !isValidAge(dateOfBirth)
    ) {
      setButtonDisabled(true);
    } else if (dateOfBirth?.length !== 10 && dateOfBirth?.length !== 0 && isValidAge(dateOfBirth)) {
      setButtonDisabled(true);
    } else if (
      flip(formattedDate) === dateOfBirth && sessionUser.nationality === userNationality &&
      sessionUser.first_name === firstName && sessionUser.last_name === lastName
    ) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [dateOfBirth, userNationality, fullName, sessionUser]);

  useEffect(() => {
    if (showNationality) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showNationality]);

  return (
    <>
      {showNationality && <NationalityModal onClose={closeNationality} onInputChange={handleModalInputChange} />}
      <div className="edit-about">
        <p>Edit Details</p>
        <div className="edit-picture-circle">
          <img src={sessionUser?.photoUrl || defaultPic} alt="User"/>
        </div>
        <div className="four-inputs-div">
          <div className="input-with-label">
            <label htmlFor="fullName">Full Name</label>
            <input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>
          <div className="input-with-label">
            <label htmlFor="dateofBirth">Date of Birth</label>
            <input id="dateofBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(formatInputDate(e.target.value))} />
          </div>
          <div className="input-with-label" id="input-with-label-nat">
            {userNationality !== null && userNationality !== "" ? (
              <label htmlFor="nationality">Nationality</label>
            ) : (
              <label htmlFor="nationality" id="blankNationality">Nationality</label>
            )}
            <input id="nationality" value={userNationality} onClick={handleNationalityInput} readOnly />
          </div>
          <div className="input-with-label">
            <label htmlFor="email">Email</label>
            <input id="email" value={sessionUser.email} disabled />
            <p id="input-email-change">To change your email, please contact us</p>
          </div>
        </div>
      </div>
    </>
  );
}

export function EditButtons({ buttonDisabled, sessionUser }) {
  const dispatch = useDispatch();
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const closePasswordModal = () => {
    setShowPasswordModal(false);
  };

  function handlePasswordChange() {
    setShowPasswordModal(true);
  }

  const handleSaveChanges = () => {
    const fullName = document.getElementById("fullName").value;
    const [firstName, lastName] = fullName.split(" ");

    const dateOfBirth = document.getElementById("dateofBirth").value;
    const nationality = document.getElementById("nationality").value;

    const [year, month, day] = dateOfBirth.split("-");
    const dob = new Date(`${year}-${month}-${day}`);
    const now = new Date();
    let ages = now.getFullYear() - dob.getFullYear();
    const monthDiff = now.getMonth() - dob.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < dob.getDate())) {
      ages--;
    }

    dispatch(
      updateUser({
        id: sessionUser.id,
        first_name: firstName,
        last_name: lastName,
        date_of_birth: dob,
        nationality: nationality,
        age: ages,
      })
    );

    setShowConfirmation(true);
  };

  useEffect(() => {
    if (showPasswordModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showPasswordModal]);

  useEffect(() => {
    if (showPasswordChange) {
      const timer = setTimeout(() => {
        setShowPasswordChange(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showPasswordChange]);

  useEffect(() => {
    if (showConfirmation) {
      const timer = setTimeout(() => {
        setShowConfirmation(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showConfirmation]);

  return (
    <>
      {showPasswordModal && <PasswordChangeModal onClose={closePasswordModal} setShowPasswordChange={setShowPasswordChange} />}
      {showConfirmation && <div className="confirmation-box">Changes saved successfully</div>}
      {showPasswordChange && <div className="confirmation-box">Password updated successfully</div>}

      <div className="two-button-div">
        <button className="save-new-password-button" onClick={handlePasswordChange}>
          <img src={KeySVG} alt="key" className="key-icon" />
          Update Password
        </button>
        <button className={`edit-user-button ${buttonDisabled ? "disabled" : ""}`} disabled={buttonDisabled} onClick={handleSaveChanges}>
          Save Changes
        </button>
      </div>
    </>
  );
}