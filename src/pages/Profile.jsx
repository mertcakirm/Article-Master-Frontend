import React, {useEffect, useState} from 'react';
import Navbar from "../components/Navbar.jsx";
import './css/profile.css'
import UpdateProfilePopup from "../components/popups/UpdateProfilePopup.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import ProcessPopup from "../components/popups/processPopup.jsx";
import AddNewArticlePopup from "../components/popups/AddNewArticlePopup.jsx";
import EditArticlePopup from "../components/popups/EditArticlePopup.jsx";
import {UpdateProfilePhotoRequest} from "../API/ProfileApi.js";

const Profile = () => {
    const [updatePopup, setUpdatePopup] = useState(false);
    const [pageNum, setPageNum] = useState(1);
    const [processPopup, setProcessPopup] = useState(false);
    const [updateId, setUpdateId] = useState(null);
    const [newArticlePopup, setNewArticlePopup] = useState(false);
    const [editArticlePopup, setEditArticlePopup] = useState(false);
    const [photoBase64, setPhotoBase64] = useState("");
    const [processState, setProcessState] = useState({
        processtype: null,
        text: "",
        acceptedText: "",
        id: null,
    });



    const toggleUpdatePopup = () => {
        setUpdatePopup(!updatePopup);
    };

    const toggleProcessPopup = (type, id, text, acceptedText) => {
        setProcessPopup(!processPopup);
        setProcessState(prevState => ({
            ...prevState,
            processtype: type,
            text: text,
            acceptedText: acceptedText,
            id: id
        }));
    };

    const toggleNewArticlePopup = () => {
        setNewArticlePopup(!newArticlePopup);
    };
    const toggleEditArticlePopup = () => {
        setEditArticlePopup(!editArticlePopup);
    };

    useEffect(() => {
        AOS.init({ duration: 500 });
    }, []);

    const SubmitPhoto=async ()=>{
        await UpdateProfilePhotoRequest(photoBase64);

    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.src = e.target.result;
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");


                    const maxWidth = 500;
                    const scaleSize = maxWidth / img.width;
                    canvas.width = maxWidth;
                    canvas.height = img.height * scaleSize;

                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    const base64String = canvas.toDataURL("image/jpeg", 0.7).split(",")[1];
                    setPhotoBase64(base64String);
                    SubmitPhoto(base64String);
                };
            };
            reader.readAsDataURL(file);
        }
    };



    return (
        <div>
            <Navbar />
            <div className="page-container  container-fluid">
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


                    <div className="row profile-col-2 col-xl-6 col-12">
                        <div className="row row-gap-5 col-12" style={{position:'relative'}}>
                            <h3 className="text-center col-12" data-aos="fade-in">My Article List</h3>
                            <button className="add-article-btn-profile " onClick={toggleNewArticlePopup}>Add New Article</button>
                            <button className="add-article-btn-profile-sm" onClick={toggleNewArticlePopup}>
                                +<svg xmlns="http://www.w3.org/2000/svg" fill="white" width="24" height="24" viewBox="0 0 24 24"><path d="M13.744 8s1.522-8-3.335-8h-8.409v24h20v-13c0-3.419-5.247-3.745-8.256-3zm.256 11h-8v-1h8v1zm4-3h-12v-1h12v1zm0-3h-12v-1h12v1zm-3.432-12.925c2.202 1.174 5.938 4.883 7.432 6.881-1.286-.9-4.044-1.657-6.091-1.179.222-1.468-.185-4.534-1.341-5.702z"/></svg>
                            </button>
                            <div className="col-lg-6" data-aos="fade-up">
                                <a href="#" className="article-card pb-3">
                                    <img className="w-100 img-fluid article-card-img" alt="article-image"
                                         src="https://bgcp.bionluk.com/images/portfolio/1400x788/d9792dfe-2379-4a8f-bc5f-3c1649310174.jpg"/>
                                    <p className="article-card-title">Article Title</p>
                                    <p className="article-card-desc">Article Description Article Description Article Description Article Description Article Description Article Description Article Description</p>
                                    <div className="profile-article-card-btns col-12 px-3 justify-content-between">
                                        <button className="my-notes-process-see" onClick={toggleEditArticlePopup}>Edit</button>
                                        <button className="my-notes-process-see" onClick={()=>toggleProcessPopup('delete_article',1,"Should the article be deleted?","Transaction successful")}>Delete</button>
                                    </div>
                                </a>
                            </div>

                            <div className="col-lg-6" data-aos="fade-up">
                                <a href="#" className="article-card pb-3">
                                    <img className="w-100 img-fluid article-card-img" alt="article-image"
                                         src="https://bgcp.bionluk.com/images/portfolio/1400x788/d9792dfe-2379-4a8f-bc5f-3c1649310174.jpg"/>
                                    <p className="article-card-title">Article Title</p>
                                    <p className="article-card-desc">Article Description Article Description Article Description Article Description Article Description Article Description Article Description</p>
                                    <div className="profile-article-card-btns col-12 px-3 justify-content-between">
                                        <button className="my-notes-process-see" onClick={toggleEditArticlePopup}>Edit</button>
                                        <button className="my-notes-process-see" onClick={toggleProcessPopup}>Delete</button>
                                    </div>
                                </a>
                            </div>

                            <div className="col-lg-6" data-aos="fade-up">
                                <a href="#" className="article-card pb-3">
                                    <img className="w-100 img-fluid article-card-img" alt="article-image"
                                         src="https://bgcp.bionluk.com/images/portfolio/1400x788/d9792dfe-2379-4a8f-bc5f-3c1649310174.jpg"/>
                                    <p className="article-card-title">Article Title</p>
                                    <p className="article-card-desc">Article Description Article Description Article Description Article Description Article Description Article Description Article Description</p>
                                    <div className="profile-article-card-btns col-12 px-3 justify-content-between">
                                        <button className="my-notes-process-see" onClick={toggleEditArticlePopup}>Edit</button>
                                        <button className="my-notes-process-see" onClick={toggleProcessPopup}>Delete</button>
                                    </div>
                                </a>
                            </div>

                            <div className="col-lg-6" data-aos="fade-up">
                                <a href="#" className="article-card pb-3">
                                    <img className="w-100 img-fluid article-card-img" alt="article-image"
                                         src="https://bgcp.bionluk.com/images/portfolio/1400x788/d9792dfe-2379-4a8f-bc5f-3c1649310174.jpg"/>
                                    <p className="article-card-title">Article Title</p>
                                    <p className="article-card-desc">Article Description Article Description Article Description Article Description Article Description Article Description Article Description</p>
                                    <div className="profile-article-card-btns col-12 px-3 justify-content-between">
                                        <button className="my-notes-process-see" onClick={toggleEditArticlePopup}>Edit</button>
                                        <button className="my-notes-process-see" onClick={toggleProcessPopup}>Delete</button>
                                    </div>
                                </a>
                            </div>
                        </div>

                        <div  className="my-notes-process-flex my-5" >
                            {pageNum > 1 && (
                                <button onClick={() => setPageNum(pageNum - 1)} className="my-notes-process-see">
                                    <svg
                                        fill="white"
                                        width="34"
                                        height="36"
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                        strokeLinejoin="round"
                                        strokeMiterlimit="2"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="m13.789 7.155c.141-.108.3-.157.456-.157.389 0 .755.306.755.749v8.501c0 .445-.367.75-.755.75-.157 0-.316-.05-.457-.159-1.554-1.203-4.199-3.252-5.498-4.258-.184-.142-.29-.36-.29-.592 0-.23.107-.449.291-.591 1.299-1.002 3.945-3.044 5.498-4.243z"/>
                                    </svg>
                                </button>
                            )}

                            <div className="my-notes-process-see text-center" style={{width:'40px',lineHeight:'40px'}}>{pageNum}</div>
                            <button onClick={()=>setPageNum(pageNum+1)} className="my-notes-process-see">
                                <svg  fill="white" width="34" height="36" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m10.211 7.155c-.141-.108-.3-.157-.456-.157-.389 0-.755.306-.755.749v8.501c0 .445.367.75.755.75.157 0 .316-.05.457-.159 1.554-1.203 4.199-3.252 5.498-4.258.184-.142.29-.36.29-.592 0-.23-.107-.449-.291-.591-1.299-1.002-3.945-3.044-5.498-4.243z"/></svg>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
            {updatePopup && (
                <UpdateProfilePopup
                    onClose={(b) => {
                        if (b === false) setUpdatePopup(b);
                    }}
                />
            )}

            {processPopup && (
                <ProcessPopup
                    onClose={(b) => {
                        if (b === false) setProcessPopup(b);
                    }}
                    text={processState.text}
                    acceptedText={processState.acceptedText}
                    type={processState.processtype}
                    id={processState.id}
                />
            )}

            {newArticlePopup && (
                <AddNewArticlePopup
                    onClose={(b) => {
                        if (b === false) setNewArticlePopup(b);
                    }}
                />
            )}

            {editArticlePopup && (
                <EditArticlePopup
                    onClose={(b) => {
                        if (b === false) setEditArticlePopup(b);
                    }}
                    id={updateId}
                />
            )}


        </div>
    );
};

export default Profile;