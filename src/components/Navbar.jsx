import React, {useEffect} from 'react';
import './css/navbar.css';
import logo from '../assets/logo2-removebg-preview.png'
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const Navbar = () => {
    const token = localStorage.getItem('token');
    const url = window.location.pathname.split("/").filter(Boolean).pop();
    console.log(url)

    useEffect(() => {
        AOS.init({ duration: 500 });
    }, []);

    const LogOut = () => {
        localStorage.removeItem('token');
        window.location.href = "/sign/in";
    }

    return (
        <div className="container-fluid nav-con" data-aos="fade-in">

            <div className="row align-items-center nav-row-lg">
                <div className="col-lg-5 p-0 align-items-center row">
                    <a href="/" className="col-lg-1 p-0 navbar-link"><img src={logo} alt="logo" className="img-fluid w-100 mx-3"  /></a>
                </div>

                <div className="nav-lg-flex align-items-center justify-content-end column-gap-3 col-lg-7 m-0">
                    <a href="/" className={` navbar-link ${url === undefined ? "active-nav-link" : ""}`}>Home</a>
                    <a href="/articles" className={` navbar-link ${url === "articles" ? "active-nav-link" : ""}`}>Articles</a>

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
                    <a href="/" className="col-lg-1 p-0 navbar-link"><img src={logo} alt="logo"
                                                                          className="img-fluid w-100 mx-3"/></a>
                </div>
                <button className="btn col-3 p-0" type="button" data-bs-toggle="offcanvas"
                         data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                        <svg fill="white" width="50" height="50" clipRule="evenodd" fillRule="evenodd"
                             strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="m21 17.75c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75zm0-4c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75zm0-4c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75zm0-4c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75z"
                                fillRule="nonzero"/>
                        </svg>
                    </button>
            </div>


            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight"
                 aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasRightLabel">Offcanvas right</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    ...
                </div>
            </div>

        </div>
    );
};

export default Navbar;