import React, { useState } from 'react';
import { AddArticleRequest } from "../../API/ArticleApi.js";
import {convertToBase64} from "../../Helper/ConverterBase64.js";
import RejectInformation from "../other/RejectInformation.jsx";
import AcceptInformation from "../other/AcceptInformation.jsx";

const AddNewArticlePopup = ({ onClose }) => {
    const [articleData, setArticleData] = useState({
        title: '',
        content: '',
        pdfBase64: '',
        photoBase64: ''
    });
    const [isPopupOpenReject, setIsPopupOpenReject] = useState(false);
    const [isPopupOpenAccept, setIsPopupOpenAccept] = useState(false);
    const [infoText, setInfoText] = useState("");

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setArticleData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleFileChange = async (event, field) => {
        const file = event.target.files[0];
        if (file) {
            const base64 = await convertToBase64(file);
            setArticleData(prevState => ({ ...prevState, [field]: base64 }));
        }
    };

    const handleDrop = async (event, field) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            const base64 = await convertToBase64(file);
            setArticleData(prevState => ({ ...prevState, [field]: base64 }));
        }
    };

    const handleSubmit = async () => {


        if (!articleData.title || !articleData.content || !articleData.pdfBase64 || !articleData.photoBase64) {
            setInfoText("Please fill in all fields.");
            setIsPopupOpenReject(true);
            return;
        }
        try {
            await AddArticleRequest(articleData);
            setIsPopupOpenAccept(true);
        } catch (error) {
            const errorMessage = error?.response?.data?.errorMessage || "Add failed.";
            setInfoText(errorMessage);
            setIsPopupOpenReject(true);
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content" style={{ color: '#fff' }} data-aos="zoom-in">
                <button className="popup-close-btn" onClick={() => onClose(false)}>&times;</button>
                <div className="row justify-content-center align-items-center row-gap-3">
                    <div className="titles text-center">Add Article</div>
                    <input className="col-12 profile_inp" name="title" placeholder="Article title" type="text" value={articleData.title} onChange={handleInputChange} />
                    <input className="col-12 profile_inp" name="content" placeholder="Article content" type="text" value={articleData.content} onChange={handleInputChange} />
                    <div className="dropzone" onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleDrop(e, 'photoBase64')} onClick={() => document.getElementById("fileInputPhoto").click()}>
                        <p className="dropzone-p">{articleData.photoBase64 ? 'Image Selected' : 'Drag your article image here or click to select it'}</p>
                        <input id="fileInputPhoto" type="file" onChange={(e) => handleFileChange(e, 'photoBase64')} style={{ display: "none" }} />
                    </div>
                    <div className="dropzone" onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleDrop(e, 'pdfBase64')} onClick={() => document.getElementById("fileInputPdf").click()}>
                        <p className="dropzone-p">{articleData.pdfBase64 ? 'PDF Selected' : 'Drag your article file here or click to select it'}</p>
                        <input id="fileInputPdf" type="file" onChange={(e) => handleFileChange(e, 'pdfBase64')} style={{ display: "none" }} />
                    </div>
                    <button onClick={handleSubmit} className="profile_btn">Post Article</button>
                </div>
            </div>
            {isPopupOpenReject && (
                <RejectInformation
                    onClose={(b) => {
                        if (b === false) setIsPopupOpenReject(b);
                        onClose(false)
                    }}
                    infoText={infoText}

                />
            )}

            {isPopupOpenAccept && (
                <AcceptInformation
                    onClose={(b) => {
                        if (b === false) setIsPopupOpenAccept(b);
                        onClose(false)
                    }}
                    infoText={infoText}

                />
            )}



        </div>
    );
};

export default AddNewArticlePopup;