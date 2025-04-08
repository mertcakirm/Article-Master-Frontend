import React, {useState} from 'react';
import '../css/accepted.css';
import RejectInformation from "../other/RejectInformation.jsx";
import AcceptInformation from "../other/AcceptInformation.jsx";

const UpdateProfilePopup = ({onClose}) => {
    const [isPopupOpenReject, setIsPopupOpenReject] = useState(false);
    const [isPopupOpenAccept, setIsPopupOpenAccept] = useState(false);
    const [infoText, setInfoText] = useState("");

    return (
        <div className="popup-overlay">
            <div className="popup-content"  style={{color:'#fff'}} data-aos="zoom-in" >
                <button className="popup-close-btn" onClick={() => onClose(false)}>&times;</button>
                <div className="row justify-content-center align-items-center row-gap-3">

                        <input className="col-12 profile_inp" placeholder="New Username" type="text" />

                        <input className="col-12 profile_inp" placeholder="Last Password" type="password" />

                        <input className="col-12 profile_inp"  placeholder="New Password" type="password" />

                        <button  onClick={() => onClose(false)} className="profile_btn">Update Information</button>

                </div>

            </div>

            {isPopupOpenReject && (
                <RejectInformation
                    onClose={(b) => {
                        if (b === false) setIsPopupOpenReject(b);
                        onClose(false)
                    }}
                    infoText={infoText}

                />
            )}

            {isPopupOpenAccept && (
                <AcceptInformation
                    onClose={(b) => {
                        if (b === false) setIsPopupOpenAccept(b);
                        onClose(false)
                    }}
                    infoText={infoText}

                />
            )}
        </div>
    );
};

export default UpdateProfilePopup;


