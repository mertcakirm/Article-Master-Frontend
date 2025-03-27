import React, {useEffect} from 'react';
import Navbar from "../components/Navbar.jsx";
import header from "../assets/home-header.jpg"
import AOS from "aos";
import "aos/dist/aos.css";
import './css/Home.css'
const Home = () => {

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <div>
            <Navbar />
            <div className="page-container p-0  container-fluid">
                <div className="row p-0 m-0 justify-content-center" style={{borderBottom: '3px solid /articles/1fff',position: 'relative'}}>
                    <img className="img-fluid w-100 p-0 m-0 header-img" data-aos="fade-in" src={header} alt="header_photo" />
                    <div className="header-link-row justify-content-center align-items-center column-gap-3"  data-aos="fade-up">
                        <a className="up-writer-btn" href="/sign/writer-up">Sign up for writer</a>
                        <a className="up-user-btn" href="/sign/up">Sign up for user</a>
                    </div>

                </div>


                <div className="row row-gap-5 m-0  my-5 popular-row">
                    <div className="col-12 titles mb-4 text-center" data-aos="fade-up">Popular Articles</div>
                    <div className="col-lg-3" data-aos="fade-up">
                        <a href="/articles/1" className="article-card">
                            <img className="w-100 img-fluid article-card-img" alt="article-image"
                                 src="https://bgcp.bionluk.com/images/portfolio/1400x788/d9792dfe-2379-4a8f-bc5f-3c1649310174.jpg"/>
                            <p className="article-card-title">Article Title</p>
                            <p className="article-card-desc">Article Description Article Description Article Description
                                Article Description Article Description Article Description Article Description</p>
                        </a>
                        <button className="article-card-like"><svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" width="30" height="30" fill="red" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 5.72c-2.624-4.517-10-3.198-10 2.461 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-5.678-7.396-6.944-10-2.461z" fillRule="nonzero"/></svg></button>
                    </div>
                    <div className="col-lg-3" data-aos="fade-up">
                        <a href="/articles/1" className="article-card">
                            <img className="w-100 img-fluid article-card-img" alt="article-image"
                                 src="https://bgcp.bionluk.com/images/portfolio/1400x788/d9792dfe-2379-4a8f-bc5f-3c1649310174.jpg"/>
                            <p className="article-card-title">Article Title</p>
                            <p className="article-card-desc">Article Description Article Description Article Description
                                Article Description Article Description Article Description Article Description</p>
                        </a>
                        <button className="article-card-like"><svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" width="30" height="30" fill="red" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 5.72c-2.624-4.517-10-3.198-10 2.461 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-5.678-7.396-6.944-10-2.461z" fillRule="nonzero"/></svg></button>
                    </div>
                    <div className="col-lg-3" data-aos="fade-up">
                        <a href="/articles/1" className="article-card">
                            <img className="w-100 img-fluid article-card-img" alt="article-image"
                                 src="https://bgcp.bionluk.com/images/portfolio/1400x788/d9792dfe-2379-4a8f-bc5f-3c1649310174.jpg"/>
                            <p className="article-card-title">Article Title</p>
                            <p className="article-card-desc">Article Description Article Description Article Description
                                Article Description Article Description Article Description Article Description</p>
                        </a>
                        <button className="article-card-like"><svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" width="30" height="30" fill="red" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 5.72c-2.624-4.517-10-3.198-10 2.461 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-5.678-7.396-6.944-10-2.461z" fillRule="nonzero"/></svg></button>
                    </div>                    <div className="col-lg-3" data-aos="fade-up">
                    <a href="/articles/1" className="article-card">
                        <img className="w-100 img-fluid article-card-img" alt="article-image"
                             src="https://bgcp.bionluk.com/images/portfolio/1400x788/d9792dfe-2379-4a8f-bc5f-3c1649310174.jpg"/>
                        <p className="article-card-title">Article Title</p>
                        <p className="article-card-desc">Article Description Article Description Article Description
                            Article Description Article Description Article Description Article Description</p>
                    </a>
                    <button className="article-card-like"><svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" width="30" height="30" fill="red" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 5.72c-2.624-4.517-10-3.198-10 2.461 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-5.678-7.396-6.944-10-2.461z" fillRule="nonzero"/></svg></button>
                </div>


                    <div className="col-12 row justify-content-center">
                        <a href="/articles" className="animation-btn">
                            <div className="btn animation-btn-child">
                                <span>Show All</span>
                            </div>
                        </a>
                    </div>

                </div>


                <div className="row">

                </div>

            </div>
        </div>
    );
};

export default Home;