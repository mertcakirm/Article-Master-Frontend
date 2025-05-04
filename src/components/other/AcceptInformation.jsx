import React from 'react';

const AcceptInformation = ({onClose,infoText}) => {
    return (
        <div className="popup-overlay">
            <div className="popup-content" data-aos="zoom-in">
                <div className="success-checkmark">
                    <div className="check-icon">
                        <span className="icon-line line-tip"></span>
                        <span className="icon-line line-long"></span>
                        <div className="icon-circle"></div>
                        <div className="icon-fix"></div>
                    </div>
                </div>
                <div className="row w-100 p-0 m-0 justify-content-center">
                    <p className="col-12 text-center"  style={{color:'#fff'}}>{infoText ? infoText : 'Operation successful'}</p>
                    <button className="mt-3 col-4 popup-accepted-btn" onClick={()=>onClose(false)}>Okey</button>
                </div>
            </div>
        </div>
    );
};

export default AcceptInformation;