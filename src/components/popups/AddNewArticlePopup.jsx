import React, {useState} from 'react';

const AddNewArticlePopup = ({onClose}) => {
    const [file, setFile] = useState(null);
    const [file2, setFile2] = useState(null);


    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        setFile(droppedFile);
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    const handleDragOver2 = (event) => {
        event.preventDefault();
    };

    const handleDrop2 = (event) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        setFile2(droppedFile);
    };

    const handleFileChange2 = (event) => {
        const selectedFile = event.target.files[0];
        setFile2(selectedFile);
    };
    return (
        <div className="popup-overlay">
            <div className="popup-content"  style={{color:'#fff'}} data-aos="zoom-in" >
                <button className="popup-close-btn" onClick={() => onClose(false)}>&times;</button>
                <div className="row justify-content-center align-items-center row-gap-3">
                    <div className="titles text-center">Add Article</div>
                    <input className="col-12 profile_inp" placeholder="Article Title" type="text" />
                    <input className="col-12 profile_inp" placeholder="Article Description" type="text" />
                    <div
                        className="dropzone"
                        onDragOver={handleDragOver2}
                        onDrop={handleDrop2}
                        onClick={() => document.getElementById("fileInput2").click()}
                    >
                        {file ? (
                            <p className="dropzone-p">{file2.name}</p>
                        ) : (
                            <p className="dropzone-p">Drag your article image here or click to select it</p>
                        )}
                        <input
                            id="fileInput2"
                            type="file"
                            onChange={handleFileChange2}
                            style={{ display: "none" }}
                        />
                    </div>
                    <div
                        className="dropzone"
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        onClick={() => document.getElementById("fileInput").click()}
                    >
                        {file ? (
                            <p className="dropzone-p">{file.name}</p>
                        ) : (
                            <p className="dropzone-p">Drag your article file here or click to select it</p>
                        )}
                        <input
                            id="fileInput"
                            type="file"
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                        />
                    </div>

                    <button  onClick={() => onClose(false)} className="profile_btn">Post Article</button>

                </div>

            </div>
        </div>
    );
};

export default AddNewArticlePopup;