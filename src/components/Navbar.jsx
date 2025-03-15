import React from 'react';
import './css/navbar.css';
import logo from '../assets/logo2-removebg-preview.png'

const Navbar = () => {
    const token = localStorage.getItem('token');
    return (
        <div className="container-fluid nav-con">

            <div className="row align-items-center nav-row-lg">
                <div className="col-lg-7 p-0 align-items-center row">
                    <a href="/" className="col-lg-1 p-0 navbar-link"><img src={logo} alt="logo" className="img-fluid w-100 mx-3"  /></a>
                </div>

                <div className="row align-items-center justify-content-end col-lg-5">
                    <a href="/" className="col-lg-2 navbar-link">Home</a>
                    <a href="/articles" className="col-lg-2 navbar-link">Articles</a>
                    <a href="/my-notes" className="col-lg-2 navbar-link">Notlarım</a>
                    <a href="/profile" className="col-lg-2 navbar-link" style={{border:'1px solid #fff',borderRadius:'10px'}}>Profile</a>
                    {token? <button className="col-lg-2 navbar-link bg-transparent border-0 p-0">Çıkış Yap</button> : null }


                </div>
            </div>

            <div className="row py-1 px-1 align-items-center justify-content-between nav-row-sm">
                <div className="col-3 p-0 align-items-center row">
                    <a href="/" className="col-lg-1 p-0 navbar-link"><img src={logo} alt="logo" className="img-fluid w-100 mx-3"  /></a>
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