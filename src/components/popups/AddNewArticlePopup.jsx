import React, { useState } from 'react';
import { AddArticleRequest } from "../../API/ArticleApi.js";
import {convertToBase64} from "../../Helper/ConverterBase64.js";

const AddNewArticlePopup = ({ onClose }) => {
    const [articleData, setArticleData] = useState({
        Title: '',
        Content: '',
        PdfBase64: '',
        PhotoBase64: ''
    });

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
        await AddArticleRequest(articleData);
        onClose(false);
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content" style={{ color: '#fff' }} data-aos="zoom-in">
                <button className="popup-close-btn" onClick={() => onClose(false)}>&times;</button>
                <div className="row justify-content-center align-items-center row-gap-3">
                    <div className="titles text-center">Add Article</div>
                    <input className="col-12 profile_inp" name="Title" placeholder="Article Title" type="text" value={articleData.Title} onChange={handleInputChange} />
                    <input className="col-12 profile_inp" name="Content" placeholder="Article Description" type="text" value={articleData.Content} onChange={handleInputChange} />
                    <div className="dropzone" onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleDrop(e, 'PhotoBase64')} onClick={() => document.getElementById("fileInputPhoto").click()}>
                        <p className="dropzone-p">{articleData.PhotoBase64 ? 'Image Selected' : 'Drag your article image here or click to select it'}</p>
                        <input id="fileInputPhoto" type="file" onChange={(e) => handleFileChange(e, 'PhotoBase64')} style={{ display: "none" }} />
                    </div>
                    <div className="dropzone" onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleDrop(e, 'PdfBase64')} onClick={() => document.getElementById("fileInputPdf").click()}>
                        <p className="dropzone-p">{articleData.PdfBase64 ? 'PDF Selected' : 'Drag your article file here or click to select it'}</p>
                        <input id="fileInputPdf" type="file" onChange={(e) => handleFileChange(e, 'PdfBase64')} style={{ display: "none" }} />
                    </div>
                    <button onClick={handleSubmit} className="profile_btn">Post Article</button>
                </div>
            </div>
        </div>
    );
};

export default AddNewArticlePopup;