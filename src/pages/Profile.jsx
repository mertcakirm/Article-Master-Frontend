import React, {useEffect, useState} from 'react';
import './css/profile.css'
import UpdateProfilePopup from "../components/popups/UpdateProfilePopup.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import {UpdateProfilePhotoRequest} from "../API/ProfileApi.js";
import UserArticles from "../components/other/UserArticles.jsx";
import {convertToBase64} from "../Helper/ConverterBase64.js";
import {CheckRoleRequest, GetUserInfoRequest} from "../API/UserApi.js";
import AcceptInformation from "../components/other/AcceptInformation.jsx";
import RejectInformation from "../components/other/RejectInformation.jsx";

const Profile = () => {
    const [updatePopup, setUpdatePopup] = useState(false);
    const [photoBase64, setPhotoBase64] = useState("");
    const [role, setRole] = useState("");
    const [acceptPopup, setAcceptPopup] = useState(false);
    const [rejectPopup, setRejectPopup] = useState(false);
    const [userData, setUserData] = useState({});
    const [refresh, setRefresh] = useState(false);

    const GetUserInfo=async ()=>{
        const userData=await GetUserInfoRequest();
        console.log(userData.data.data);
        setUserData(userData.data.data);
    }

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
                setAcceptPopup(!acceptPopup)
                setRefresh(!refresh);

            } catch (err) {
                console.error("Fotoğraf yüklenirken hata:", err);
                setRejectPopup(!rejectPopup)
            }
        }
    };

    const getRole=async ()=>{
        const data =await CheckRoleRequest();
        setRole(data.data.data.role)
    }

    useEffect(() => {
        getRole();
        GetUserInfo();
        AOS.init({ duration: 500 });
    }, []);

    useEffect(() => {
        GetUserInfo();

    }, [refresh]);

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
                                                src={
                                                    userData.image
                                                        ? (userData.image.startsWith("data:image")
                                                            ? userData.image
                                                            : `data:image/jpeg;base64,${userData.image}`)
                                                        : "https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg"
                                                }
                                                alt="profile_photo"
                                            />
                                            <div className="overlay">
                                                <input type="file" className="file-input" onChange={handleFileChange} />
                                                <span className="overlay-text">Fotoğraf Yükle</span>
                                            </div>
                                        </div>

                                        <div className="profile-card-left-info col-lg-8 col-12 text-center">{userData.username}</div>
                                        <div className="profile-card-left-info col-lg-8 col-12 border-0 text-center">{userData.role}</div>
                                    </div>


                                <div className="col-lg-7 col-12 justify-content-center align-items-start row-gap-3" style={{display:'flex',flexDirection:'column'}}>

                                    <div className="w-100 row justify-content-between align-items-center  p-0 m-0">
                                        <div className="col-9 profile-card-right-key">Note Count</div>
                                        <div className="col-3 profile-card-right-value">{userData.noteCount}</div>
                                    </div>
                                    <div className="w-100 row justify-content-between align-items-center  p-0 m-0">
                                        <div className="col-9 profile-card-right-key">Comments Count</div>
                                        <div className="col-3 profile-card-right-value">{userData.commentCount}</div>
                                    </div>

                                    {role !== "USER" && (
                                        <>
                                            <div className="w-100 row justify-content-between align-items-center p-0 m-0">
                                                <div className="col-9 profile-card-right-key">Article Count</div>
                                                <div className="col-3 profile-card-right-value">{userData.articleCount}</div>
                                            </div>
                                            <div className="w-100 row justify-content-between align-items-center  p-0 m-0">
                                                <div className="col-9 profile-card-right-key">Writer Rating</div>
                                                <div className="col-3 profile-card-right-value">{userData.ratingOverall}</div>
                                            </div>
                                            <div className="w-100 row justify-content-between align-items-center  p-0 m-0">
                                                <div className="col-9 profile-card-right-key">View Count</div>
                                                <div className="col-3 profile-card-right-value">{userData.viewCount}</div>
                                            </div>
                                        </>
                                    )}

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
                                setRefresh(!refresh);
                            }}
                        />
                    )}
                    {acceptPopup && (
                        <AcceptInformation
                            onClose={(b) => {
                                if (b === false) setAcceptPopup(b);
                            }}
                            infoText="Profile photo updated."
                        />
                    )}
                    {rejectPopup && (
                        <RejectInformation
                            onClose={(b) => {
                                if (b === false) setRejectPopup(b);
                            }}
                            infoText="An error occurred while changing the profile photo."
                        />
                    )}

            </div>
    );
};

export default Profile;