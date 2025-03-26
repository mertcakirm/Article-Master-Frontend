import React from 'react';
import '../css/accepted.css';

const UpdateProfilePopup = ({onClose}) => {
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
        </div>
    );
};

export default UpdateProfilePopup;


