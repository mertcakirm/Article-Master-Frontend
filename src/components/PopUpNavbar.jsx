import React, {useEffect, useState} from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import {deleteCookie, getCookie} from "../API/Cokkie.js";
import {CheckRoleRequest} from "../API/UserApi.js";
import {Link} from "react-router-dom";

const PopUpNavbar = ({setPopupOpen}) => {
    const token = getCookie('token');
    const [role, setRole] = useState("");

    const getRole = async () => {
        const data = await CheckRoleRequest();
        setRole(data.data.data.role);
    };

    useEffect(() => {
        if (token) {
            getRole();
        }
        AOS.init({duration: 500});
    }, []);

    const LogOut = () => {
        deleteCookie('token');
        window.location.href = "/sign/in";
    };

    const navLinks = [
        {
            to: "/",
            label: "Home",
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="30" height="30" viewBox="0 0 24 24">
                <path
                    d="M12 6.453l9 8.375v9.172h-6v-6h-6v6h-6v-9.172l9-8.375zm12 5.695l-12-11.148-12 11.133 1.361 1.465 10.639-9.868 10.639 9.883 1.361-1.465z"/>
            </svg>
        },
        {
            to: "/articles",
            label: "Articles",
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="30" height="30" viewBox="0 0 24 24">
                <path
                    d="M13.744 8s1.522-8-3.335-8h-8.409v24h20v-13c0-3.419-5.247-3.745-8.256-3zm.256 11h-8v-1h8v1zm4-3h-12v-1h12v1zm0-3h-12v-1h12v1zm-3.432-12.925c2.202 1.174 5.938 4.883 7.432 6.881-1.286-.9-4.044-1.657-6.091-1.179.222-1.468-.185-4.534-1.341-5.702z"/>
            </svg>
        },
        {
            to: "/writers",
            label: "Writers",
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="30" height="30" viewBox="0 0 24 24">
                <path
                    d="M18.009 13.388c-1.771 2.408-4.399 4.783-7.359 4.396-.801 1.119-1.695 2.682-2.688 4.496l-2.296.72c1.943-3.79 4.537-7.981 7.32-11.166-1.205.785-3.185 2.473-4.908 4.253-1.554-3.246.085-6.253 2.458-8.548-.067 1.081.413 2.068.772 2.575-.062-.904.044-2.52.704-3.92 1.323-1.116 2.492-1.92 3.829-2.622-.217.791-.033 1.739.222 2.331.116-.82.603-2.368 1.167-3.01 1.667-1.075 4.135-1.936 6.77-1.892-.291 1.623-1.143 4.258-2.294 5.893-.929.597-2.157.946-3.137 1.115.811.228 1.719.293 2.509.235-.575 1.207-1.157 2.311-2.039 3.666-1.216.679-2.77.978-3.832 1.035.743.389 2.097.617 2.802.443zm-14.009 8.612h-4v1h4v-1z"/>
            </svg>
        }
    ];

    if (token) {
        navLinks.push(
            {
                to: "/favorites",
                label: "Favorites",
                icon: <svg fill="white" width="30" height="30" clipRule="evenodd" fillRule="evenodd"
                           strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24"
                           xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="m12 5.72c-2.624-4.517-10-3.198-10 2.461 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-5.678-7.396-6.944-10-2.461z"
                        fillRule="nonzero"/>
                </svg>
            },
            {
                to: "/my-notes",
                label: "Notes",
                icon: <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="30" height="30" viewBox="0 0 24 24">
                    <path
                        d="M2 5v-5h20v5h-20zm13.909 13.223c.222 1.468-.186 4.534-1.341 5.702 2.201-1.174 5.938-4.884 7.432-6.881-1.286.9-4.044 1.657-6.091 1.179zm6.091-11.223v6c0 3.419-5.247 3.745-8.256 3 0 0 1.522 8-3.335 8h-8.409v-17h20zm-10 9h-6v1h6v-1zm6-3h-12v1h12v-1zm0-3h-12v1h12v-1z"/>
                </svg>
            },
            {
                to: "/profile",
                label: "Profile",
                icon: <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="30" height="30" viewBox="0 0 24 24">
                    <path
                        d="M19 7.001c0 3.865-3.134 7-7 7s-7-3.135-7-7c0-3.867 3.134-7.001 7-7.001s7 3.134 7 7.001zm-1.598 7.18c-1.506 1.137-3.374 1.82-5.402 1.82-2.03 0-3.899-.685-5.407-1.822-4.072 1.793-6.593 7.376-6.593 9.821h24c0-2.423-2.6-8.006-6.598-9.819z"/>
                </svg>
            }
        );
        if (role === "ADMIN") {
            navLinks.push({
                to: "/admin",
                label: "Admin",
                icon: <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="30" height="30" viewBox="0 0 24 24">
                    <path
                        d="M18 10v-4c0-3.313-2.687-6-6-6s-6 2.687-6 6v4h-3v14h18v-14h-3zm-5 7.723v2.277h-2v-2.277c-.595-.347-1-.984-1-1.723 0-1.104.896-2 2-2s2 .896 2 2c0 .738-.404 1.376-1 1.723zm-5-7.723v-4c0-2.206 1.794-4 4-4 2.205 0 4 1.794 4 4v4h-8z"/>
                </svg>
            });
        }
    }

    return (
        <div className="popup-overlay" style={{zIndex: '120', height: '100vh'}}>
            <div className="popup-content checked-content-popup" data-aos="zoom-in">
                <button className="popup-close-btn" onClick={() => setPopupOpen(false)}>&times;</button>
                <div className="row justify-content-center align-items-center row-gap-3 column-gap-3 w-100 p-0 m-0">
                    {navLinks.map(({to, label, icon}) => (
                        <Link
                            to={to}
                            key={label}
                            onClick={() => setPopupOpen(false)}
                            className="navbar-card-sm col-5"
                        >
                            {icon}
                            <div className="navbar-card-sm-text">{label}</div>
                        </Link>
                    ))}
                    {token ? (
                        <button onClick={LogOut} className="navbar-card-sm col-5">
                            <svg fill="white" width="30" height="30" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
                                <path d="M16 2v7h-2v-5h-12v16h12v-5h2v7h-16v-20h16zm2 9v-4l6 5-6 5v-4h-10v-2h10z"/>
                            </svg>
                            <div className="navbar-card-sm-text">Log Out</div>
                        </button>
                    ) : (
                        <Link
                            to="/sign/in"
                            onClick={() => setPopupOpen(false)}
                            className="navbar-card-sm col-5"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="30" height="30"
                                 viewBox="0 0 24 24">
                                <path
                                    d="M12.451 17.337l-2.451 2.663h-2v2h-2v2h-6v-1.293l7.06-7.06c-.214-.26-.413-.533-.599-.815l-6.461 6.461v-2.293l6.865-6.949c1.08 2.424 3.095 4.336 5.586 5.286zm11.549-9.337c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-3-3c0-1.104-.896-2-2-2s-2 .896-2 2 .896 2 2 2 2-.896 2-2z"/>
                            </svg>
                            <div className="navbar-card-sm-text">Log In</div>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PopUpNavbar;