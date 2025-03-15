import React from 'react';
import './css/navbar.css';

const Navbar = () => {
    return (
        <div className="container-fluid nav-con">
            <div className="row align-items-center">

                <div className="col-lg-7 align-items-center row">
                    <a href="/" className="col-lg-3 navbar-link">Logo alanı</a>
                </div>

                <div className="row align-items-center justify-content-end col-lg-5">
                    <a  href="/" className="col-lg-2 navbar-link">Home</a>
                    <a href="/articles" className="col-lg-2 navbar-link">Articles</a>
                    <a  href="/profile" className="col-lg-2 navbar-link">Profile</a>
                </div>

            </div>
        </div>
    );
};

export default Navbar;