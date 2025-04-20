import React, {useEffect, useState} from 'react';
import './css/navbar.css';
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import {deleteCookie, getCookie} from "../API/Cokkie.js";
import {CheckRoleRequest} from "../API/UserApi.js";

const Navbar = ({popupOpen,setPopupOpen}) => {
    const token = getCookie('token');
    const [role, setRole] = useState("");
    const url = window.location.pathname.split("/").filter(Boolean).pop();



    const getRole=async ()=>{
        try {
            const data =await CheckRoleRequest();
            setRole(data.data.data.role)
            if(data.data.data.role === "admin"){
                deleteCookie("token");
            }
        }catch (error) {
            console.log(error);
            deleteCookie("token");
        }

    }

    useEffect(() => {
        if (token) {
            getRole();
        }
        AOS.init({ duration: 500 });
    }, []);

    const LogOut = () => {
        deleteCookie('token');
        window.location.href = "/sign/in";
    }



    const OpenPopUpNavbar = () => {
        if (typeof setPopupOpen === "function") {
            setPopupOpen(true);
        } else {
            console.warn("popupOpen fonksiyon değil:", popupOpen);
        }
    };

    return (
        <div className="container-fluid nav-con py-2" data-aos="fade-in">

            <div className="row align-items-center nav-row-lg">
                <div className="col-lg-5 p-0 align-items-center row">
                    <a href="/" className="col-lg-1 p-0 navbar-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="200" viewBox="0 0 600 200">
                            <path d="M120,60 L220,60 L220,140 L120,140 Z" fill="#FFFFFF" stroke="#4A235A" strokeWidth="1"/>
                            <path d="M120,60 L120,140 L140,120 L140,80 Z" fill="#F8F9F9" stroke="#4A235A" strokeWidth="1"/>

                            <line x1="160" y1="80" x2="210" y2="80" stroke="#4A235A" strokeWidth="3"/>
                            <line x1="160" y1="95" x2="210" y2="95" stroke="#4A235A" strokeWidth="3"/>
                            <line x1="160" y1="110" x2="200" y2="110" stroke="#4A235A" strokeWidth="3"/>
                            <line x1="160" y1="125" x2="190" y2="125" stroke="#4A235A" strokeWidth="3"/>

                            <text x="250" y="95" fontFamily="Arial, sans-serif" fontSize="36" fontWeight="bold" fill="#4A235A">ARTICLE</text>
                            <text x="250" y="135" fontFamily="Arial, sans-serif" fontSize="36" fontWeight="bold" fill="#8E44AD">MASTER</text>

                            <line x1="250" y1="150" x2="520" y2="150" stroke="#4A235A" strokeWidth="3"/>
                        </svg>
                    </a>
                </div>

                <div className="nav-lg-flex align-items-center justify-content-end column-gap-3 col-lg-7 m-0">
                    <a href="/" className={` navbar-link ${url === undefined ? "active-nav-link" : ""}`}>Home</a>
                    <a href="/articles" className={` navbar-link ${url === "articles" ? "active-nav-link" : ""}`}>Articles</a>
                    <a href="/writers" className={`navbar-link ${url === "writers" ? "active-nav-link" : ""}`}>
                        Writers
                    </a>

                    {token ? (
                        <>

                            <a href="/favorites" className={` navbar-link ${url === "favorites" ? "active-nav-link" : ""}`}>
                                Favorites
                            </a>
                            <a href="/my-notes" className={`navbar-link ${url === "my-notes" ? "active-nav-link" : ""}`}>
                                Notes
                            </a>
                            <a href="/profile" className={`navbar-link ${url === "profile" ? "active-nav-link" : ""}`}>
                                Profile
                            </a>

                            {role === "ADMIN" && (
                                <a href="/admin" className={` navbar-link ${url === "admin" ? "active-nav-link" : ""}`}>
                                    Admin
                                </a>
                            )}
                            <button
                                className=" navbar-link bg-transparent border-0 p-0"
                                onClick={LogOut}>
                                Log Out
                            </button>
                        </>
                    ) : (
                        <a href="/sign/in" className=" navbar-link">Log In</a>
                    )}
                </div>
            </div>



            <div className="row py-1 px-1 align-items-center justify-content-between nav-row-sm m-0">
                <div className="col-3 p-0 align-items-center row">
                    <a href="/" className="col-lg-1 p-0 navbar-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="200" viewBox="0 0 600 200">
                            <path d="M120,60 L220,60 L220,140 L120,140 Z" fill="#FFFFFF" stroke="#4A235A" strokeWidth="1"/>
                            <path d="M120,60 L120,140 L140,120 L140,80 Z" fill="#F8F9F9" stroke="#4A235A" strokeWidth="1"/>

                            <line x1="160" y1="80" x2="210" y2="80" stroke="#4A235A" strokeWidth="3"/>
                            <line x1="160" y1="95" x2="210" y2="95" stroke="#4A235A" strokeWidth="3"/>
                            <line x1="160" y1="110" x2="200" y2="110" stroke="#4A235A" strokeWidth="3"/>
                            <line x1="160" y1="125" x2="190" y2="125" stroke="#4A235A" strokeWidth="3"/>

                            <text x="250" y="95" fontFamily="Arial, sans-serif" fontSize="36" fontWeight="bold" fill="#4A235A">ARTICLE</text>
                            <text x="250" y="135" fontFamily="Arial, sans-serif" fontSize="36" fontWeight="bold" fill="#8E44AD">MASTER</text>

                            <line x1="250" y1="150" x2="520" y2="150" stroke="#4A235A" strokeWidth="3"/>
                        </svg>
                    </a>
                </div>
                <button  onClick={() => setPopupOpen(true)} className="btn col-3 p-0" >
                        <svg fill="white" width="50" height="50" clipRule="evenodd" fillRule="evenodd"
                             strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="m21 17.75c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75zm0-4c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75zm0-4c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75zm0-4c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75z"
                                fillRule="nonzero"/>
                        </svg>
                    </button>

            </div>


        </div>
    );
};

export default Navbar;