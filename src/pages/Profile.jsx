import React from 'react';
import Navbar from "../components/Navbar.jsx";
import './css/profile.css'

const Profile = () => {
    return (
        <div>
            <Navbar />
            <div className="page-container  container-fluid">
                <div className="row py-5">
                    <div className="col-lg-6 row justify-content-center align-items-center column-gap-5">
                        <div className="p-0" style={{position:'relative',overflow:'hidden',width:'300px',height:'300px'}}>
                            <img className="col-lg-6 profile_photo" src="https://image.hurimg.com/i/hurriyet/75/750x422/596730b4c03c0e32bc3e59a2.jpg" alt="profile_photo" />
                        </div>
                        <div className="col-lg-6 row-gap-3 text-center row justify-content-center">
                            <h3>Update Profile</h3>
                            <input type="text" placeholder="Your Username" className="col-12 profile_inp" />
                            <input type="password" placeholder="Last Password" className="col-12 profile_inp" />
                            <input type="password" placeholder="New Password" className="col-12 profile_inp" />
                            <button className="col-12 profile_btn">Save</button>
                        </div>
                    </div>

                    <div className="col-lg-6">wdaw</div>
                </div>
            </div>

        </div>
    );
};

export default Profile;