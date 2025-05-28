import React, {useEffect, useState} from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import {AddFolderRequest} from "../../API/NoteApi.js";

const AddFolderPopup = ({onClose}) => {
    const [refresh, setRefresh] = useState(false);
    const [folderColor, setFolderColor] = useState("blue");
    const [folderName, setFolderName] = useState(""); // klasör adı

    const colorList = [
        "blue", "red", "green", "purple", "orange", "teal",
        "yellow", "pink", "cyan", "lime", "lightBlue", "lightGreen"
    ];

    useEffect(() => {
        AOS.init({duration: 500});
    }, []);

    const AddFolder = async () => {
        if (!folderName.trim()) {
            alert("Folder name cannot be empty.");
            return;
        }

        const FolderDTO = {
            folderName: folderName,
            color: folderColor
        };

        try {
            await AddFolderRequest(FolderDTO);
            setRefresh(!refresh);
            onClose(false);
        } catch (error) {
            console.error("Error adding folder:", error);
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content" style={{color: '#fff'}} data-aos="zoom-in">
                <button className="popup-close-btn" onClick={() => onClose(false)}>&times;</button>
                <div className="row row-gap-4 justify-content-center">
                    <div className="article-card-title col-12 text-center">Create New Folder</div>
                    <input
                        type="text"
                        placeholder="New folder name"
                        className="profile_inp"
                        maxLength="30"
                        value={folderName}
                        onChange={(e) => setFolderName(e.target.value)}
                    />
                    <div className="color-palette d-flex flex-wrap row-gap-3 justify-content-center col-12">
                        {colorList.map((color) => (
                            <button
                                key={color}
                                className="color-swatch mx-2"
                                style={{
                                    backgroundColor: color,
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "50%",
                                    border: folderColor === color ? "3px solid #ccc" : "1px solid black",
                                    cursor: "pointer"
                                }}
                                onClick={() => setFolderColor(color)}
                            />
                        ))}
                    </div>
                    <button className="profile_btn col-12" onClick={AddFolder}>Create Folder</button>
                </div>
            </div>
        </div>
    );
};

export default AddFolderPopup;