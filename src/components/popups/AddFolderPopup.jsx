import React, {useEffect, useState} from 'react';
import {NoteGetAllRequests} from "../../API/NoteApi.js";
import ProcessPopup from "./processPopup.jsx";
import AOS from "aos";
import "aos/dist/aos.css";

const AddFolderPopup = ({onClose}) => {
    const [isProcessPopupOpen, setProcessIsPopupOpen] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [folderColor, setFolderColor] = useState("blue");
    const [processState, setProcessState] = useState({
        processtype: null,
        text: "",
        acceptedText: "",
        id: null,
    });

    const colorList=["blue", "red", "green", "purple", "orange"]

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);
    return (
        <div className="popup-overlay">
            <div className="popup-content " style={{ color: '#fff'}} data-aos="zoom-in">
                <button className="popup-close-btn" onClick={() => onClose(false)}>&times;</button>
                <div className="row row-gap-4 justify-content-center">
                    <div className="article-card-title col-12 text-center ">Create New Folder</div>
                    <input type="text" placeholder="New folder name" className="profile_inp" />
                    <div className="color-palette d-flex justify-content-center col-12" >
                        {colorList.map((color) => (
                            <button
                                key={color}
                                className="color-swatch mx-2"
                                style={{
                                    backgroundColor: color,
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "50%",
                                    border: folderColor === color ? "3px solid black" : "1px solid #ccc",
                                    cursor: "pointer"
                                }}
                                onClick={() => setFolderColor(color)}
                            />
                        ))}
                    </div>
                    <button className="profile_btn col-12">Create Folder</button>

                </div>
            </div>
            {isProcessPopupOpen && (
                <ProcessPopup
                    onClose={(b) => {
                        if (b === false) setProcessIsPopupOpen(b);
                        setRefresh(!refresh);
                        onClose(false)
                    }}
                    text={processState.text}
                    acceptedText={processState.acceptedText}
                    type={processState.processtype}
                    id={processState.id}
                />
            )}
        </div>
    );
};

export default AddFolderPopup;