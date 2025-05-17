import React, { useEffect, useState } from 'react';
import { WriterGetAll } from "../API/UserApi.js";
import Pagination from "../components/other/Pagination.jsx";
import {toast} from "react-toastify";

const Writers = () => {
    const [pageNum, setPageNum] = useState(1);
    const [writers, setWriters] = useState([]);
    const [lastPage, setLastPage] = useState(null);

    const GetWriters = async () => {
        try {
            const data = await WriterGetAll(pageNum, 36);
            setWriters(data.data.data.items);
            setLastPage(data.data.data.totalPages);
        }catch (error) {
            console.log(error);
            toast.error("Error while getting writers!");
        }
    };

    useEffect(() => {
        GetWriters();
    }, [pageNum]);

    return (
        <div className="page-container mb-5 container-fluid">
            <div className="row row-gap-5 m-0 popular-row column-gap-5 align-items-center">
                <div className="col-12 titles mb-4 mt-5 text-center" data-aos="fade-up">Writers</div>

                {writers.length > 0 ? (
                    writers.map((writer, index) => (
                        <div key={index} className="col-lg-1 col-3" data-aos="fade-up">
                            <a href={`/writer/${writer.id}`} className="writer-card">
                                <img
                                    className="profile_photo"
                                    style={{ aspectRatio: '1' }}
                                    src={
                                        writer.profilePhoto
                                            ? (writer.profilePhoto.startsWith("data:image")
                                                ? writer.profilePhoto
                                                : `data:image/jpeg;base64,${writer.profilePhoto}`)
                                            : "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg"
                                    }
                                    alt="profile_photo"
                                />
                                <div className="small text-uppercase fw-bold">{writer.writerName}</div>
                                <div className="my-notes-process-flex align-items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" fill="yellow" height="25" viewBox="0 0 24 24">
                                        <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                                    </svg>
                                    <div>{Number.isInteger(writer.rating) ? writer.rating : writer.rating.toFixed(1)}/10</div>
                                </div>
                            </a>
                        </div>
                    ))
                ) : (
                    <p className="text-center my-4">There are no writers yet.</p>
                )}

                <Pagination pageNum={pageNum} setPageNum={setPageNum} lastPage={lastPage} />
            </div>
        </div>
    );
};

export default Writers;