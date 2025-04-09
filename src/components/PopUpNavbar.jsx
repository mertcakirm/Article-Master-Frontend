import React from 'react';

const PopUpNavbar = ({onClose}) => {
    return (
        <div className="popup-overlay">
            <div className="popup-content checked-content-popup" data-aos="zoom-in" >
                <div>popupnav</div>
            </div>
        </div>
    );
};

export default PopUpNavbar;