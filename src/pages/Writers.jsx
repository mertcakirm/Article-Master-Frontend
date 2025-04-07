import React, {useEffect, useState} from 'react';
import Navbar from "../components/Navbar.jsx";
import {WriterGetAllRequest} from "../API/AdminApi.js";
import {WriterGetAll} from "../API/UserApi.js";

const Writers = () => {
    const [pageNum, setPageNum] = useState(1);
    const [writers, setWriters] = useState([]);
    const [lastPage, setLastPage] = useState(null);

    const GetWriters = async () => {
        const data = await WriterGetAll(pageNum,36);
        setWriters(data.data.data.items);
        setLastPage(data.data.data.totalPages)
    }

    useEffect(() => {
        GetWriters();
    },[])

    useEffect(() => {
        GetWriters();
    },[pageNum])

    return (
        <div>
            <Navbar />
            <div className="page-container mb-5 container-fluid">
                <div className="row row-gap-5 m-0  popular-row  column-gap-5 align-items-center">
                    <div className="col-12 titles mb-4 mt-5 text-center" data-aos="fade-up">Writers</div>

                    {writers.length > 0 ? (
                        writers.map((writer,index) => (
                            <div key={index} className="col-lg-1 col-3" data-aos="fade-up">
                                <a href={`/writer/${writer.id}`} className="writer-card">
                                    <img className="profile_photo"
                                         style={{aspectRatio:'1'}}
                                         src={
                                             writers.thumbnailBase64
                                                 ? (writers.thumbnailBase64.startsWith("data:image")
                                                     ? writers.thumbnailBase64
                                                     : `data:image/jpeg;base64,${writers.thumbnailBase64}`)
                                                 : "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg"
                                         }
                                         alt="profile_photo"/>
                                    <div className="small text-uppercase fw-bold">{writer.writerName}</div>
                                    <div className="my-notes-process-flex align-items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" fill="yellow" height="25"
                                             viewBox="0 0 24 24">
                                            <path
                                                d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
                                        </svg>
                                        <div>{Number.isInteger(writer.rating) ? writer.rating : writer.rating.toFixed(1)}/10</div>
                                    </div>
                                </a>
                            </div>
                        ))
                    ) : (
                        <p className="text-center my-4">There are no writers yet.</p>
                    )}

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
                        {lastPage !== pageNum && (

                            <button onClick={()=>setPageNum(pageNum+1)} className="my-notes-process-see">
                                <svg  fill="white" width="34" height="36" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m10.211 7.155c-.141-.108-.3-.157-.456-.157-.389 0-.755.306-.755.749v8.501c0 .445.367.75.755.75.157 0 .316-.05.457-.159 1.554-1.203 4.199-3.252 5.498-4.258.184-.142.29-.36.29-.592 0-.23-.107-.449-.291-.591-1.299-1.002-3.945-3.044-5.498-4.243z"/></svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Writers;