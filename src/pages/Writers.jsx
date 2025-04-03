import React, {useEffect, useState} from 'react';
import Navbar from "../components/Navbar.jsx";
import {WriterGetAllRequest} from "../API/AdminApi.js";

const Writers = () => {
    const [pageNum, setPageNum] = useState(1);
    const [writers, setWriters] = useState([]);

    const GetWriters = async () => {
        const data = await WriterGetAllRequest();
        setWriters(data);
        console.log(data)
    }

    useEffect(() => {
        GetWriters();
    },[])

    return (
        <div>
            <Navbar />
            <div className="page-container mb-5 container-fluid">
                <div className="row row-gap-5 m-0  popular-row  column-gap-5 align-items-center">
                    <div className="col-12 titles mb-4 mt-5 text-center" data-aos="fade-up">Writers</div>

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

                    <div  className="my-notes-process-flex">
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
    );
};

export default Writers;