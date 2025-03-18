import React, {useState} from 'react';
import Navbar from "../components/Navbar.jsx";
import './css/profile.css'

const Profile = () => {
    const [updatePopup, setUpdatePopup] = useState(false);

    const toggleUpdatePopup = () => {
        setUpdatePopup(!updatePopup);
    };

    return (
        <div>
            <Navbar />
            <div className="page-container  container-fluid">
                <div className="row justify-content-center py-5">

                    <div className="col-lg-6 row justify-content-center align-items-center">
                        <h3 className="text-center col-12">Profile Card</h3>
                        <div className="col-8 mt-3">
                            <div className="profile_card row justify-content-between p-3">
                                    <div className="col-4 row justify-content-center align-items-center row-gap-2">
                                        <div className="p-0" style={{
                                            position: 'relative',
                                            overflow: 'hidden',
                                            width: '150px',
                                            height: '150px'
                                        }}>
                                            <img className="profile_photo"
                                                 src="https://image.hurimg.com/i/hurriyet/75/750x422/596730b4c03c0e32bc3e59a2.jpg"
                                                 alt="profile_photo"/>
                                        </div>
                                        <div className="profile-card-left-info col-8 text-center">Mert Çakır</div>
                                        <div className="profile-card-left-info col-8 border-0 text-center">Writer</div>
                                    </div>

                                    <div className="col-8 justify-content-center align-items-start row-gap-3" style={{display:'flex',flexDirection:'column'}}>
                                        <div className="w-100 row justify-content-between align-items-center p-0 m-0">
                                            <div className="col-9 profile-card-right-key">Article Count</div>
                                            <div className="col-3 profile-card-right-value">12</div>
                                        </div>
                                        <div className="w-100 row justify-content-between align-items-center  p-0 m-0">
                                            <div className="col-9 profile-card-right-key">Note Count</div>
                                            <div className="col-3 profile-card-right-value">543</div>
                                        </div>
                                        <div className="w-100 row justify-content-between align-items-center  p-0 m-0">
                                            <div className="col-9 profile-card-right-key">Comments Count</div>
                                            <div className="col-3 profile-card-right-value">75</div>
                                        </div>
                                        <div className="w-100 row justify-content-between align-items-center  p-0 m-0">
                                            <div className="col-9 profile-card-right-key">Comments Count</div>
                                            <div className="col-3 profile-card-right-value">75</div>
                                        </div>
                                        <div className="w-100 row justify-content-between align-items-center  p-0 m-0">
                                            <div className="col-9 profile-card-right-key">Comments Count</div>
                                            <div className="col-3 profile-card-right-value">75</div>
                                        </div>
                                        <button className="my-notes-process-see col-12">Update Other Information</button>
                                    </div>
                            </div>
                        </div>


                        </div>
                    </div>
                </div>

        </div>
    );
};

export default Profile;