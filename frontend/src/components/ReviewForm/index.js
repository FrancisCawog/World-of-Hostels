import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createReview } from '../../store/review';
import './ReviewForm.css'
import MyArrowSVG from "../../assets/pictures/icons/arrow-left.svg"
import diamondSVG from "../../assets/pictures/icons/diamond.svg"
import securitySVG from "../../assets/pictures/icons/security.svg"
import locationSVG from "../../assets/pictures/icons/location.svg"
import atmosphereSVG from "../../assets/pictures/icons/atmosphere.svg"
import staffSVG from "../../assets/pictures/icons/staff.svg"
import cleanlinessSVG from "../../assets/pictures/icons/cleanliness.svg"
import facilitiesSVG from "../../assets/pictures/icons/facilities.svg"
import feedbackSVG from "../../assets/pictures/icons/feedback.svg"
import AboutSVG from "../../assets/pictures/icons/about_me.svg"
import StarSVG from "../../assets/pictures/icons/Yellow_Star_with_rounded_edges.svg.png"
import triangleSVG from "../../assets/pictures/icons/761354-200.png"
import GrayStar from "../../assets/pictures/icons/star-on.svg"
import arrowRight from "../../assets/pictures/icons/arrow-right.svg"
import sendSVG from "../../assets/pictures/icons/icons8-send-48.png"

const ReviewForm = ({ onClose, sessionUserId, modalReservationId, modalListingId, modalPropertyName }) => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [progressWidth, setProgressWidth] = useState(11.1);
    const [formData, setFormData] = useState({
        page1: { value: 0 },
        page2: { security: 0 },
        page3: { location: 0 },
        page4: { staff: 0 },
        page5: { atmosphere: 0 },
        page6: { cleanliness: 0 },
        page7: { facilities: 0 },
        page8: { feedback: "" },
        page9: { areYou: ""},
        page9: { chooseAge: ""},
        page9: { tripType: ""}
    });

    const [showFirstDropdown, setshowFirstDropdown] = useState(false);
    const [showSecondDropdown, setshowSecondDropdown] = useState(false);
    const [showThirdDropdown, setshowThirdDropdown] = useState(false);
    const [selectedFirstOption, setFirstSelectedOption] = useState('');
    const [selectedSecondOption, setSecondSelectedOption] = useState('');
    const [selectedThirdOption, setThirdSelectedOption] = useState('');

    const firstDropdownRef = useRef(null);
    const firstButtonRef = useRef(null);
  
    const secondDropdownRef = useRef(null);
    const secondButtonRef = useRef(null);
  
    const thirdDropdownRef = useRef(null);
    const thirdButtonRef = useRef(null);

    const handleClickOutside = (event) => {
        if (
          firstDropdownRef.current &&
          !firstDropdownRef.current.contains(event.target) &&
          !firstButtonRef.current.contains(event.target)
        ) {
          setshowFirstDropdown(false);
        }
        if (
          secondDropdownRef.current &&
          !secondDropdownRef.current.contains(event.target) &&
          !secondButtonRef.current.contains(event.target)
        ) {
          setshowSecondDropdown(false);
        }
        if (
          thirdDropdownRef.current &&
          !thirdDropdownRef.current.contains(event.target) &&
          !thirdButtonRef.current.contains(event.target)
        ) {
          setshowThirdDropdown(false);
        }
      };
    
      useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

    const buttonLabels = [
        ['Male', 'Female', 'Couple', 'All Male Group', 'All Female Group', 'Mixed Group'],
        ['18-24', '25-30', '31-40', '41+'],
        ['College Break', 'Weekend Away', 'Gap Year', 'RTW Trip', 'Regular Vacation', 'Other']
    ];

    const handleFirstButtonClick = () => {
        setshowFirstDropdown(!showFirstDropdown);
        setshowSecondDropdown(false);
        setshowThirdDropdown(false);
    };

    const handleSecondButtonClick = () => {
        setshowFirstDropdown(false);
        setshowSecondDropdown(!showSecondDropdown);
        setshowThirdDropdown(false);
    };

    const handleThirdButtonClick = () => {
        setshowFirstDropdown(false);
        setshowSecondDropdown(false);
        setshowThirdDropdown(!showThirdDropdown);
    };

    const handleFirstOptionSelect = (option) => {
        setFirstSelectedOption(option);
        setshowFirstDropdown(false); 
    };

    const handleSecondOptionSelect = (option) => {
        setSecondSelectedOption(option);
        setshowSecondDropdown(false); 
    };

    const handleThirdOptionSelect = (option) => {
        setThirdSelectedOption(option);
        setshowThirdDropdown(false); 
    };

    const pageKeys = Object.keys(formData).slice(0, 7); 
    let totalScore = 0;

    pageKeys.forEach((pageKey) => {
        const rating = formData[pageKey][Object.keys(formData[pageKey])[0]];
        totalScore += rating;
    });

    const averageScore = totalScore / 3.5;
    const roundedAverage = Number(averageScore.toFixed(1));

    const conditionalWidth = {
        width: `${progressWidth}%`
    };

    const handleStarClick = (starNumber, pageType) => {
        const updatedFormData = { ...formData };
        if (pageType === "value"){
        updatedFormData.page1.value = starNumber;
        setFormData(updatedFormData);
        } else if (pageType === "security"){
            updatedFormData.page2.security = starNumber;
        setFormData(updatedFormData);
        } else if (pageType === "location"){
            updatedFormData.page3.location = starNumber;
        setFormData(updatedFormData);
        } else if (pageType === "staff"){
            updatedFormData.page4.staff = starNumber;
        setFormData(updatedFormData);
        } else if (pageType === "atmosphere"){
            updatedFormData.page5.atmosphere = starNumber;
        setFormData(updatedFormData);
        } else if (pageType === "cleanliness"){
            updatedFormData.page6.cleanliness = starNumber;
        setFormData(updatedFormData);
        } else if (pageType === "facilities"){
            updatedFormData.page7.facilities = starNumber;
        setFormData(updatedFormData);
        }
        setTimeout(() => {
            nextPage();
        }, 500);
    };

    const handleSkiporNext = (text) => {
        const updatedFormData = { ...formData };
        updatedFormData.page8.feedback = text;
        setFormData(updatedFormData);

        setTimeout(() => {
            nextPage();
        }, 300);
    }

    const handleAboutYou = (areYou, chooseAge, tripType) => {
        const updatedFormData = { ...formData };
        updatedFormData.page9.areYou = areYou;
        updatedFormData.page9.chooseAge = chooseAge;
        updatedFormData.page9.tripType = tripType;

        handleFormSubmit();
    }

    const [textareaValue, setTextareaValue] = useState('');
    const textareaRef = useRef(null);

    const handleTextareaChange = (event) => {
        const textarea = event.target;
        setTextareaValue(textarea.value);
        adjustTextareaHeight(textarea);
    };

    const adjustTextareaHeight = (textarea) => {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    const sections = [
    { title: 'Value', question: 'Overall, what do you think about the property?', icon: diamondSVG, field: 'value' },
    { title: 'Security', question: 'Did you feel safe in the property?', icon: securitySVG, field: 'security' },
    { title: 'Location', question: 'Did you like the property’s location?', icon: locationSVG, field: 'location' },
    { title: 'Staff', question: 'Was the staff good for you?', icon: staffSVG, field: 'staff' },
    { title: 'Atmosphere', question: 'How was the atmosphere there?', icon: atmosphereSVG, field: 'atmosphere' },
    { title: 'Cleanliness', question: 'Was the property clean?', icon: cleanlinessSVG, field: 'cleanliness' },
    { title: 'Facilities', question: 'Were the facilities good?', icon: facilitiesSVG, field: 'facilities' },
];

    const RatingSection = ({ title, question, currentRating, icon, onClick }) => (
        <div className='review-inner-square'>
            <div className='review-pic-and-print'>
                <img src={icon} alt={title} />
                <p>{title}</p>
            </div>
            <div className='review-overall'>
                <p>{question}</p>
            </div>
            <div className='review-stars'>
                {[1, 2, 3, 4, 5].map(star => (
                    <img
                        key={star}
                        src={currentRating >= star ? StarSVG : GrayStar}
                        onClick={() => onClick(star)}
                        alt={`Rate ${star} star${star > 1 ? 's' : ''}`}
                    />
                ))}
            </div>
        </div>
    );


    const renderPageContent = () => {
        switch (currentPage) {
            case 1:
                return (
                    <>
                        <p className='review-disclaimer'>Your review will appear on WorldofHostels.com websites and on selected partner sites</p>
                        <div className='review-square' style={{ marginTop:'0'}}>
                            <RatingSection
                                title={sections[0].title}
                                question={sections[0].question}
                                icon={sections[0].icon}
                                currentRating={formData.page1.value}
                                onClick={(star) => handleStarClick(star, sections[0].field)}
                            />
                        </div>
                        <p className='review-helper'>By filling in this quick review, you will help fellow travellers to decide on the property that best suits their needs.</p>
                    </>
                );
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                const section = sections[currentPage - 1];
                return (
                    <div className='review-square' style={{ marginTop:'2.6rem'}}>
                        <RatingSection
                            title={section.title}
                            question={section.question}
                            icon={section.icon}
                            currentRating={formData[`page${currentPage}`][section.field]}
                            onClick={(star) => handleStarClick(star, section.field)}
                        />
                    </div>
                );
            case 8:
                return (
                    <>
                    <div className='review-square' style={{marginTop: "2.6rem"}}>
                        <div className='review-inner-square'>
                            <div className='review-pic-and-print' style={{marginTop: "-35px"}}>
                                <img src={feedbackSVG}/>
                                <p>Feedback</p>
                            </div>

                            <div className='review-overall'>
                                <p>What do you think about the property?</p>
                            </div>
                            
                            <div className='feedback-input'>
                                <div className='feedback-box'>
                                    <label className='review-label'>My Review</label>
                                    <textarea
                                        id='reviewInput'
                                        ref={textareaRef}
                                        placeholder='Write your opinion...'
                                        value={textareaValue}
                                        onChange={handleTextareaChange}
                                        onFocus={() => adjustTextareaHeight(textareaRef.current)}
                                        style={{
                                            minHeight: '50px',
                                            maxHeight: '200px',
                                            width: '100%',
                                            resize: 'none'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className= "review-footer" >
                        <div className='review-footer-score'>
                            <p>Your overall rating is:</p>
                            <img src={StarSVG}/>
                            <p id='rounded-average'>{roundedAverage}</p>
                        </div>
                        <button className='review-button-skip' onClick={() => handleSkiporNext(textareaValue)}>
                            {textareaValue ? (
                            <>
                                <p className='next-or-skip'>Next</p>
                                <img src={arrowRight} />
                            </>
                            ) : (
                            <>
                                <p className='next-or-skip'>Skip</p>
                                <img src={arrowRight} />
                            </>
                            )}
                        </button>
                    </div>
                    </>
                );
            case 9:
                return (
                    <>
                    <div className='review-square' style={{marginTop: "2.6rem"}}>
                        <div className='review-inner-square' style={{marginTop: "-100px"}}>
                            <div className='review-pic-and-print'>
                                <img src={AboutSVG}/>
                                <p>About you</p>
                            </div>

                            <div className='review-overall'>
                                <p>Tell us more about yourself</p>
                            </div>

                            <div style={{ position: 'relative' }}>
                                <div>
                                    <button className='about-you-button' onClick={handleFirstButtonClick} ref={firstButtonRef}>
                                        <div style={{display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center"}}>
                                            <div className='value-wrapper' style={{ fontWeight: selectedFirstOption ? 500 : 'normal', color: selectedFirstOption ? 'black' : 'normal', marginTop: selectedFirstOption ? '15px' : 'normal' }}>
                                                {selectedFirstOption || 'Are you?'}
                                            </div>
                                            <div className={`icon-wrapper ${showFirstDropdown ? 'rotate' : ''}`}>
                                                <img src={triangleSVG} className='triangle-icon' style={{width: "12px", height: "12px"}}/>
                                            </div>

                                            {selectedFirstOption &&
                                            <span className='about-you-label'>
                                                <p>Are you?</p>
                                            </span>}
                                        </div>
                                    </button>
                                    {showFirstDropdown && (
                                        <div className='dropdown' style={{ position: 'absolute', marginTop: "1.5%" }} ref={firstDropdownRef}>
                                            <ul className='dropdown-list'>
                                                {buttonLabels[0].map((option, index) => (
                                                     <li
                                                     className={`dropdown-option ${selectedFirstOption === option ? 'selected' : ''}`}
                                                     key={index}
                                                     onClick={() => handleFirstOptionSelect(option)}
                                                 >
                                                     {option}

                                                     {selectedFirstOption === option && (
                                                        <span className='check-mark'>&#10003;</span>
                                                    )}
                                                 </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <button className='about-you-button' onClick={handleSecondButtonClick} placeholder='' ref={secondButtonRef}>
                                        <div style={{display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center"}}>
                                            <div className='value-wrapper' style={{ fontWeight: selectedSecondOption ? 500 : 'normal', color: selectedSecondOption ? 'black' : 'normal', marginTop: selectedSecondOption ? '15px' : 'normal' }}>
                                                {selectedSecondOption || 'Choose age group'}
                                            </div>
                                            <div className={`icon-wrapper ${showSecondDropdown ? 'rotate' : ''}`}>
                                                <img src={triangleSVG} className='triangle-icon' style={{width: "12px", height: "12px"}}/>
                                            </div>

                                            {selectedSecondOption &&
                                            <span className='about-you-label'>
                                                <p>Choose age group</p>
                                            </span>}
                                        </div>
                                    </button>
                                    {showSecondDropdown && (
                                        <div className='dropdown' style={{ position: 'absolute', marginTop: "14%" }} ref={secondDropdownRef}>
                                            <ul className='dropdown-list'>
                                                {buttonLabels[1].map((option, index) => (
                                                    <li
                                                    className={`dropdown-option ${selectedSecondOption === option ? 'selected' : ''}`}
                                                    key={index}
                                                    onClick={() => handleSecondOptionSelect(option)}
                                                >
                                                    {option}

                                                    {selectedSecondOption === option && (
                                                        <span className='check-mark'>&#10003;</span>
                                                    )}
                                                </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <button className='about-you-button' onClick={handleThirdButtonClick} placeholder='' ref={thirdButtonRef}>
                                        <div style={{display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center"}}>
                                            <div className='value-wrapper'  style={{ fontWeight: selectedThirdOption ? 500 : 'normal', color: selectedThirdOption ? 'black' : 'normal', marginTop: selectedThirdOption ? '15px' : 'normal'  }}>
                                                {selectedThirdOption || 'Trip Type'}
                                            </div>
                                            <div className={`icon-wrapper ${showThirdDropdown ? 'rotate' : ''}`}>
                                                <img src={triangleSVG} className='triangle-icon' style={{width: "12px", height: "12px"}}/>
                                            </div>

                                            {selectedThirdOption &&
                                            <span className='about-you-label'>
                                                <p>Trip Type</p>
                                            </span>}
                                        </div>
                                    </button>
                                    {showThirdDropdown && (
                                        <div className='dropdown' style={{ position: 'absolute', marginTop: "26.5%" }} ref={thirdDropdownRef}>
                                            <ul className='dropdown-list'>
                                                {buttonLabels[2].map((option, index) => (
                                                    <li
                                                    className={`dropdown-option ${selectedThirdOption === option ? 'selected' : ''}`}
                                                    key={index}
                                                    onClick={() => handleThirdOptionSelect(option)}
                                                >
                                                    {option}

                                                    {selectedThirdOption === option && (
                                                        <span className='check-mark'>&#10003;</span>
                                                    )}
                                                </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                        
                    <div className= "review-footer" >
                        <div className='review-footer-score'>
                            <p>Your overall rating is:</p>
                            <img src={StarSVG}/>
                            <p id='rounded-average'>{roundedAverage}</p>
                        </div>
                        <button className='review-button-skip' onClick={() => handleAboutYou(selectedFirstOption, selectedSecondOption, selectedThirdOption)} disabled={ selectedFirstOption === '' || selectedSecondOption === '' || selectedThirdOption === ''}>
                                <p className='next-or-skip'>Send</p>
                                <img src={sendSVG} style={{width: "18px", height: "18px", marginLeft: "5px"}}/>
                        </button>
                    </div>
                    </>
                );
            default:
                return null;
        }
    };

    const nextPage = () => {
        if (currentPage < 9) {
            setCurrentPage(currentPage + 1);
            setProgressWidth(progressWidth + 11.1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            setProgressWidth(progressWidth - 11.1);
        }
    };

    const handleFormSubmit = () => {
        const reviewData = {
            about_you: formData.page9.areYou.toLowerCase(),
            age_group: formData.page9.chooseAge,
            atmosphere: (formData.page5.atmosphere * 2),
            cleanliness: (formData.page6.cleanliness * 2),
            facilities: (formData.page7.facilities * 2),
            feedback: formData.page8.feedback,
            listing_id: modalListingId,
            location: (formData.page3.location * 2),
            reservation_id: modalReservationId,
            security: (formData.page2.security * 2),
            staff: (formData.page4.staff * 2),
            total_score: roundedAverage,
            trip_type: formData.page9.tripType.toLowerCase(),
            user_id: sessionUserId,
            value_for_money: (formData.page1.value * 2),
          };
          onClose();
        dispatch(createReview(reviewData));
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="review-modal-form" onClick={(e) => e.stopPropagation()}>
                <div className="modal-content">
                    {currentPage === 1 ? (
                    <p className='modal-review-label-form'>Leave a review</p>
                    ) : (
                        <div className='modal-review-label-form-with-picure'>
                            <img onClick={prevPage} src={MyArrowSVG}/>
                            <p className='modal-review-label-form'>Leave a review</p>
                        </div>
                    )}
                    <span className="close" onClick={onClose}>&times;</span>
                    <div className='progress-wrapper'>
                        <div className='progress' style={conditionalWidth}></div>
                    </div>

                    <div className='pages'>
                        <p className='modalPropertyName'>{modalPropertyName}</p>
                        {renderPageContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewForm;