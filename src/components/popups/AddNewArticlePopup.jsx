import React, {useState} from 'react';
import {AddArticleRequest} from "../../API/ArticleApi.js";
import {convertToBase64} from "../../Helper/ConverterBase64.js";
import {toast} from 'react-toastify';

const AddNewArticlePopup = ({onClose}) => {
    const [articleData, setArticleData] = useState({
        title: '',
        content: '',
        pdfBase64: '',
        photoBase64: ''
    });
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setArticleData(prevState => ({...prevState, [name]: value}));
    };

    const handleFileChange = async (event, field) => {
        const file = event.target.files[0];
        if (file) {
            const base64 = await convertToBase64(file);
            setArticleData(prevState => ({...prevState, [field]: base64}));
        }
    };

    const handleDrop = async (event, field) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            const base64 = await convertToBase64(file);
            setArticleData(prevState => ({...prevState, [field]: base64}));
        }
    };

    const handleSubmit = async () => {
        if (!articleData.title || !articleData.content || !articleData.pdfBase64 || !articleData.photoBase64) {
            toast.error("Please fill in all fields.");
            return;
        }
        try {
            await AddArticleRequest(articleData);
            toast.success("Article Added successfully.");
            onClose(false);
        } catch (error) {
            const errorMessage = error?.response?.data?.errorMessage || "Add failed.";
            toast.error(errorMessage || "Article add failed.");
            onClose(false);
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content" style={{color: '#fff'}} data-aos="zoom-in">
                <button className="popup-close-btn" onClick={() => onClose(false)}>&times;</button>
                <div className="row justify-content-center align-items-center row-gap-3">
                    <div className="titles text-center">Add Article</div>
                    <input className="col-12 profile_inp" name="title" placeholder="Article title" type="text"
                           value={articleData.title} onChange={handleInputChange}/>
                    <input className="col-12 profile_inp" name="content" placeholder="Article content" type="text"
                           value={articleData.content} onChange={handleInputChange}/>
                    <div className="dropzone" onDragOver={(e) => e.preventDefault()}
                         onDrop={(e) => handleDrop(e, 'photoBase64')}
                         onClick={() => document.getElementById("fileInputPhoto").click()}>
                        <p className="dropzone-p">{articleData.photoBase64 ? 'Image Selected' : 'Drag your article image here or click to select it'}</p>
                        <input id="fileInputPhoto" type="file" onChange={(e) => handleFileChange(e, 'photoBase64')}
                               style={{display: "none"}}/>
                    </div>
                    <div className="dropzone" onDragOver={(e) => e.preventDefault()}
                         onDrop={(e) => handleDrop(e, 'pdfBase64')}
                         onClick={() => document.getElementById("fileInputPdf").click()}>
                        <p className="dropzone-p">{articleData.pdfBase64 ? 'PDF Selected' : 'Drag your article file here or click to select it'}</p>
                        <input id="fileInputPdf" type="file" onChange={(e) => handleFileChange(e, 'pdfBase64')}
                               style={{display: "none"}}/>
                    </div>
                    <button onClick={handleSubmit} className="profile_btn">Post Article</button>
                </div>
            </div>
        </div>
    );
};

export default AddNewArticlePopup;