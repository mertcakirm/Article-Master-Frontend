import React, {useEffect} from 'react';
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
            <div className="page-container p-0 container-fluid">
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
                        <a href="/article/1" className="article-card">
                            <img className="w-100 img-fluid article-card-img" alt="article-image" src="https://bgcp.bionluk.com/images/portfolio/1400x788/d9792dfe-2379-4a8f-bc5f-3c1649310174.jpg"/>
                            <p className="article-card-title">Article Title</p>
                            <p className="article-card-desc">Article Description Article Description Article Description
                                Article Description Article Description Article Description Article Description</p>
                            <div className="my-notes-process-flex justify-content-between w-100 px-5">
                                <div className="my-notes-process-flex align-items-center">
                                    <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" width="30" fill="white" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.998 5c-4.078 0-7.742 3.093-9.853 6.483-.096.159-.145.338-.145.517s.048.358.144.517c2.112 3.39 5.776 6.483 9.854 6.483 4.143 0 7.796-3.09 9.864-6.493.092-.156.138-.332.138-.507s-.046-.351-.138-.507c-2.068-3.403-5.721-6.493-9.864-6.493zm.002 3c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4zm0 1.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5z" fillRule="nonzero"/></svg>
                                    <div>123</div>
                                </div>
                                <div className="my-notes-process-flex align-items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" fill="yellow" height="25" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
                                    <div>9/10</div>
                                </div>
                            </div>
                        </a>
                        <button className="article-card-like"><svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" width="30" height="30" fill="red" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 5.72c-2.624-4.517-10-3.198-10 2.461 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-5.678-7.396-6.944-10-2.461z" fillRule="nonzero"/></svg></button>
                    </div>

                    <div className="col-lg-3" data-aos="fade-up">
                        <a href="/article/1" className="article-card">
                            <img className="w-100 img-fluid article-card-img" alt="article-image"
                                 src="https://bgcp.bionluk.com/images/portfolio/1400x788/d9792dfe-2379-4a8f-bc5f-3c1649310174.jpg"/>
                            <p className="article-card-title">Article Title</p>
                            <p className="article-card-desc">Article Description Article Description Article Description
                                Article Description Article Description Article Description Article Description</p>
                            <div className="my-notes-process-flex justify-content-between w-100 px-5">
                                <div className="my-notes-process-flex align-items-center">
                                    <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" width="30" fill="white" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.998 5c-4.078 0-7.742 3.093-9.853 6.483-.096.159-.145.338-.145.517s.048.358.144.517c2.112 3.39 5.776 6.483 9.854 6.483 4.143 0 7.796-3.09 9.864-6.493.092-.156.138-.332.138-.507s-.046-.351-.138-.507c-2.068-3.403-5.721-6.493-9.864-6.493zm.002 3c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4zm0 1.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5z" fillRule="nonzero"/></svg>
                                    <div>123</div>
                                </div>
                                <div className="my-notes-process-flex align-items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" fill="yellow" height="25" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
                                    <div>9/10</div>
                                </div>
                            </div>
                        </a>
                        <button className="article-card-like"><svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" width="30" height="30" fill="red" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 5.72c-2.624-4.517-10-3.198-10 2.461 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-5.678-7.396-6.944-10-2.461z" fillRule="nonzero"/></svg></button>
                    </div>

                    <div className="col-lg-3" data-aos="fade-up">
                        <a href="/article/1" className="article-card">
                            <img className="w-100 img-fluid article-card-img" alt="article-image"
                                 src="https://bgcp.bionluk.com/images/portfolio/1400x788/d9792dfe-2379-4a8f-bc5f-3c1649310174.jpg"/>
                            <p className="article-card-title">Article Title</p>
                            <p className="article-card-desc">Article Description Article Description Article Description
                                Article Description Article Description Article Description Article Description</p>
                            <div className="my-notes-process-flex justify-content-between w-100 px-5">
                                <div className="my-notes-process-flex align-items-center">
                                    <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" width="30" fill="white" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.998 5c-4.078 0-7.742 3.093-9.853 6.483-.096.159-.145.338-.145.517s.048.358.144.517c2.112 3.39 5.776 6.483 9.854 6.483 4.143 0 7.796-3.09 9.864-6.493.092-.156.138-.332.138-.507s-.046-.351-.138-.507c-2.068-3.403-5.721-6.493-9.864-6.493zm.002 3c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4zm0 1.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5z" fillRule="nonzero"/></svg>
                                    <div>123</div>
                                </div>
                                <div className="my-notes-process-flex align-items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" fill="yellow" height="25" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
                                    <div>9/10</div>
                                </div>
                            </div>
                        </a>
                        <button className="article-card-like"><svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" width="30" height="30" fill="red" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 5.72c-2.624-4.517-10-3.198-10 2.461 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-5.678-7.396-6.944-10-2.461z" fillRule="nonzero"/></svg></button>
                    </div>

                    <div className="col-lg-3" data-aos="fade-up">
                        <a href="/article/1" className="article-card">
                            <img className="w-100 img-fluid article-card-img" alt="article-image"
                                 src="https://bgcp.bionluk.com/images/portfolio/1400x788/d9792dfe-2379-4a8f-bc5f-3c1649310174.jpg"/>
                            <p className="article-card-title text-center">Article Title</p>
                            <p className="article-card-desc">Article Description Article Description Description Article Description </p>
                            <div className="my-notes-process-flex justify-content-between w-100 px-5">
                                <div className="my-notes-process-flex align-items-center">
                                    <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" width="30" fill="white" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.998 5c-4.078 0-7.742 3.093-9.853 6.483-.096.159-.145.338-.145.517s.048.358.144.517c2.112 3.39 5.776 6.483 9.854 6.483 4.143 0 7.796-3.09 9.864-6.493.092-.156.138-.332.138-.507s-.046-.351-.138-.507c-2.068-3.403-5.721-6.493-9.864-6.493zm.002 3c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4zm0 1.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5z" fillRule="nonzero"/></svg>
                                    <div>123</div>
                                </div>
                                <div className="my-notes-process-flex align-items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" fill="yellow" height="25" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
                                    <div>9/10</div>
                                </div>
                            </div>
                        </a>
                        <button className="article-card-like"><svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" width="30" height="30" fill="red" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 5.72c-2.624-4.517-10-3.198-10 2.461 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-5.678-7.396-6.944-10-2.461z" fillRule="nonzero"/></svg></button>
                    </div>


                    <div className="col-12 mb-5 row justify-content-center" data-aos="fade-up">
                        <a href="/articles" className="animation-btn">
                            <div className="btn animation-btn-child">
                                <span>Show All</span>
                            </div>
                        </a>
                    </div>

                </div>


                <div className="row row-gap-5 m-0 my-5 popular-row justify-content-center  column-gap-5 align-items-center">
                    <div className="col-12 titles mb-4 text-center" data-aos="fade-up">Popular Writers</div>

                    <div className="col-lg-1 col-3" data-aos="fade-up">
                        <a href="/writer/1" className="writer-card">
                            <img className="profile_photo"
                                 style={{aspectRatio:'1'}}
                                 src="https://image.hurimg.com/i/hurriyet/75/750x422/596730b4c03c0e32bc3e59a2.jpg"
                                 alt="profile_photo"/>
                            <div className="small text-uppercase fw-bold">Mert çakır</div>
                            <div className="small">9/10</div>
                        </a>
                    </div>

                    <div className="col-lg-1 col-3" data-aos="fade-up">
                        <a href="/writer/1" className="writer-card">
                            <img className="profile_photo"
                                 style={{aspectRatio:'1'}}
                                 src="https://image.hurimg.com/i/hurriyet/75/750x422/596730b4c03c0e32bc3e59a2.jpg"
                                 alt="profile_photo"/>
                            <div className="small text-uppercase fw-bold">Mert çakır</div>
                            <div className="small">9/10</div>
                        </a>
                    </div>

                    <div className="col-lg-1 col-3" data-aos="fade-up">
                        <a href="/writer/1" className="writer-card">
                            <img className="profile_photo"
                                 style={{aspectRatio:'1'}}
                                 src="https://image.hurimg.com/i/hurriyet/75/750x422/596730b4c03c0e32bc3e59a2.jpg"
                                 alt="profile_photo"/>
                            <div className="small text-uppercase fw-bold">Mert çakır</div>
                            <div className="small">9/10</div>
                        </a>
                    </div>

                    <div className="col-lg-1 col-3" data-aos="fade-up">
                        <a href="/writer/1" className="writer-card">
                            <img className="profile_photo"
                                 style={{aspectRatio:'1'}}
                                 src="https://image.hurimg.com/i/hurriyet/75/750x422/596730b4c03c0e32bc3e59a2.jpg"
                                 alt="profile_photo"/>
                            <div className="small text-uppercase fw-bold">Mert çakır</div>
                            <div className="small">9/10</div>
                        </a>
                    </div>

                    <div className="col-lg-1 col-3" data-aos="fade-up">
                        <a href="/writer/1" className="writer-card">
                            <img className="profile_photo"
                                 style={{aspectRatio:'1'}}
                                 src="https://image.hurimg.com/i/hurriyet/75/750x422/596730b4c03c0e32bc3e59a2.jpg"
                                 alt="profile_photo"/>
                            <div className="small text-uppercase fw-bold">Mert çakır</div>
                            <div className="small">9/10</div>
                        </a>
                    </div>

                    <div className="col-lg-1 col-3" data-aos="fade-up">
                        <a href="/writer/1" className="writer-card">
                            <img className="profile_photo"
                                 style={{aspectRatio:'1'}}
                                 src="https://image.hurimg.com/i/hurriyet/75/750x422/596730b4c03c0e32bc3e59a2.jpg"
                                 alt="profile_photo"/>
                            <div className="small text-uppercase fw-bold">Mert çakır</div>
                            <div className="small">9/10</div>
                        </a>
                    </div>


                    <div className="col-12 mb-5 row justify-content-center" data-aos="fade-up">
                        <a href="/writers" className="animation-btn">
                            <div className="btn animation-btn-child">
                                <span>Show All</span>
                            </div>
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Home;