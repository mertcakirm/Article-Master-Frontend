import React, {useState} from 'react';
import '../css/accepted.css';
import RejectInformation from "../other/RejectInformation.jsx";
import AcceptInformation from "../other/AcceptInformation.jsx";
import {UpdateProfileRequest} from "../../API/UserApi.js";

const UpdateProfilePopup = ({onClose}) => {
    const [isPopupOpenReject, setIsPopupOpenReject] = useState(false);
    const [isPopupOpenAccept, setIsPopupOpenAccept] = useState(false);
    const [infoText, setInfoText] = useState("");
    const [updateInfoObj, setUpdateInfoObj] = useState({
        userName:null,
        lastPassword:null,
        newPassword:null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdateInfoObj(prev => ({ ...prev, [name]: value }));
    }

    const HandleSubmit = async () => {
        try {
            const response = await UpdateProfileRequest(updateInfoObj);
            setInfoText("Profile successfully updated.");
            setIsPopupOpenAccept(true);
        } catch (error) {
            console.log(error);
            setInfoText("An error occurred while updating the profile.");
            setIsPopupOpenReject(true);
        }
    }

    return (
        <div className="popup-overlay">
            <div className="popup-content" style={{ color: '#fff' }} data-aos="zoom-in">
                <button className="popup-close-btn" onClick={() => onClose(false)}>&times;</button>
                <div className="row justify-content-center align-items-center row-gap-3">
                    <input
                        className="col-12 profile_inp"
                        placeholder="New Username"
                        type="text"
                        name="userName"
                        value={updateInfoObj.userName}
                        onChange={handleChange}
                    />
                    <input
                        className="col-12 profile_inp"
                        placeholder="Last Password"
                        type="password"
                        name="lastPassword"
                        value={updateInfoObj.lastPassword}
                        onChange={handleChange}
                    />
                    <input
                        className="col-12 profile_inp"
                        placeholder="New Password"
                        type="password"
                        name="newPassword"
                        value={updateInfoObj.newPassword}
                        onChange={handleChange}
                    />
                    <button onClick={HandleSubmit} className="profile_btn">Update Information</button>
                </div>
            </div>

            {isPopupOpenReject && (
                <RejectInformation
                    onClose={(b) => {
                        if (b === false) setIsPopupOpenReject(b);
                        onClose(false);
                    }}
                    infoText={infoText}
                />
            )}

            {isPopupOpenAccept && (
                <AcceptInformation
                    onClose={(b) => {
                        if (b === false) setIsPopupOpenAccept(b);
                        onClose(false);
                    }}
                    infoText={infoText}
                />
            )}
        </div>
    );
};

export default UpdateProfilePopup;