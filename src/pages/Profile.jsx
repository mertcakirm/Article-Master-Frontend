import React, {useEffect, useState} from 'react';
import './css/profile.css'
import UpdateProfilePopup from "../components/popups/UpdateProfilePopup.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import {UpdateProfilePhotoRequest} from "../API/ProfileApi.js";
import UserArticles from "../components/other/UserArticles.jsx";
import {convertToBase64} from "../Helper/ConverterBase64.js";
import {CheckRoleRequest} from "../API/UserApi.js";

const Profile = () => {
    const [updatePopup, setUpdatePopup] = useState(false);
    const [photoBase64, setPhotoBase64] = useState("");
    const [role, setRole] = useState("");

    const toggleUpdatePopup = () => {
        setUpdatePopup(!updatePopup);
    };



    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const base64String = await convertToBase64(file);
                setPhotoBase64(base64String);
                await UpdateProfilePhotoRequest(base64String);
            } catch (err) {
                console.error("Fotoğraf yüklenirken hata:", err);
            }
        }
    };

    const getRole=async ()=>{
        const data =await CheckRoleRequest();
        setRole(data.data.data.role)
    }

    useEffect(() => {
        getRole();
        AOS.init({ duration: 500 });
    }, []);

    return (
            <div className="page-container container-fluid">
                <div className="row justify-content-center py-5">

                    <div className="col-xl-6 row justify-content-center">
                        <div className="col-lg-9 col-12">
                            <h3 className="text-center col-12" data-aos="fade-in">Profile Card</h3>

                            <div className="profile_card row justify-content-between p-3 mt-5"  data-aos="fade-up">
                                    <div className="col-lg-5 col-12 row justify-content-center align-items-center row-gap-2">

                                        <div className="p-0 profile-container">
                                            <img
                                                className="profile_photo"
                                                src="https://image.hurimg.com/i/hurriyet/75/750x422/596730b4c03c0e32bc3e59a2.jpg"
                                                alt="profile_photo"
                                            />
                                            <div className="overlay">
                                                <input type="file" className="file-input" onChange={handleFileChange} />
                                                <span className="overlay-text">Fotoğraf Yükle</span>
                                            </div>
                                        </div>

                                        <div className="profile-card-left-info col-lg-8 col-12 text-center">Mert Çakır</div>
                                        <div className="profile-card-left-info col-lg-8 col-12 border-0 text-center">Writer</div>
                                    </div>

                                    <div className="col-lg-7 col-12 justify-content-center align-items-start row-gap-3" style={{display:'flex',flexDirection:'column'}}>
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
                                            <div className="col-9 profile-card-right-key">Writer Rating</div>
                                            <div className="col-3 profile-card-right-value">75</div>
                                        </div>
                                        <div className="w-100 row justify-content-between align-items-center  p-0 m-0">
                                            <div className="col-9 profile-card-right-key">View Count</div>
                                            <div className="col-3 profile-card-right-value">75</div>
                                        </div>
                                        <button onClick={toggleUpdatePopup} className="my-notes-process-see col-12">Update Other Information</button>
                                    </div>
                            </div>
                        </div>
                    </div>
                    {(role === "ADMIN" || role === "WRITER") && (
                        <UserArticles />
                    )}

                </div>
                {updatePopup && (
                    <UpdateProfilePopup
                        onClose={(b) => {
                            if (b === false) setUpdatePopup(b);
                        }}
                    />
                )}
            </div>
    );
};

export default Profile;