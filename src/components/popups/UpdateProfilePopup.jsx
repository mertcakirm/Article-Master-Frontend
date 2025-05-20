import React, {useState} from 'react';
import '../css/accepted.css';
import {UpdateProfileRequest} from "../../API/UserApi.js";
import {toast} from 'react-toastify';

const UpdateProfilePopup = ({onClose}) => {
    const [updateInfoObj, setUpdateInfoObj] = useState({
        userName: null,
        lastPassword: null,
        newPassword: null
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUpdateInfoObj(prev => ({...prev, [name]: value}));
    }

    const HandleSubmit = async () => {
        try {
            await UpdateProfileRequest(updateInfoObj);
            toast.success("Profile informations successfully updated.");
            onClose(false);
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while updating the profile.");
            onClose(false);
        }
    }

    return (
        <div className="popup-overlay">
            <div className="popup-content" style={{color: '#fff'}} data-aos="zoom-in">
                <button className="popup-close-btn" onClick={() => onClose(false)}>&times;</button>
                <div className="row justify-content-center align-items-center row-gap-3">
                    <input
                        className="col-12 profile_inp"
                        placeholder="New Username"
                        type="text"
                        name="userName"
                        value={updateInfoObj.userName ?? ""}
                        onChange={handleChange}
                    />
                    <input
                        className="col-12 profile_inp"
                        placeholder="Last Password"
                        type="password"
                        name="lastPassword"
                        value={updateInfoObj.lastPassword ?? ""}
                        onChange={handleChange}
                    />
                    <input
                        className="col-12 profile_inp"
                        placeholder="New Password"
                        type="password"
                        name="newPassword"
                        value={updateInfoObj.newPassword ?? ""}
                        onChange={handleChange}
                    />
                    <button onClick={HandleSubmit} className="profile_btn">Update Information</button>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfilePopup;