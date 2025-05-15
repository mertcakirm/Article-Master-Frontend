import React, {useState} from 'react';
import './css/MyNotes.css'
import NotesPopup from "../components/popups/NotesPopup.jsx";
import AddFolderPopup from "../components/popups/AddFolderPopup.jsx";

const MyNotes = () => {
    const [pageNum, setPageNum] = useState(1);
    const [lastPage, setLastPage] = useState(null);
    const [notesPopupState, setNotesPopupState] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [folderIdState, setFolderIdState] = useState("");
    const [addNotePopupState, setAddNotePopupState] = useState(false);

    const ToggleNotePopup = (folderId)=>{
        setFolderIdState(folderId);
        setNotesPopupState(!notesPopupState);
    }

    const ToggleAddNotePopup = ()=>{
        setAddNotePopupState(!addNotePopupState);
    }

    return (
            <div className="page-container container-fluid">
                <div className="row" style={{position:'relative'}}>
                    <div className="titles col-12 text-center mt-5" data-aos="fade-in">My Note Folders</div>
                    <button className="add-folder-btn" onClick={ToggleAddNotePopup} >Add New Folder</button>


                    <div className="col-12 px-5 mt-5 justify-content-center" data-aos="fade-in">
                        <div className="folder-row">
                            <button className="folder-card" onClick={()=>ToggleNotePopup(1)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="red" width="80" height="80" viewBox="0 0 24 24"><path d="M11 5c-1.629 0-2.305-1.058-4-3h-7v20h24v-17h-13z"/></svg>
                                <div className="folder-name">Important Folder</div>
                            </button>
                            <button className="folder-card" onClick={()=>ToggleNotePopup(1)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="blue" width="80" height="80" viewBox="0 0 24 24"><path d="M11 5c-1.629 0-2.305-1.058-4-3h-7v20h24v-17h-13z"/></svg>
                                <div className="folder-name">Software</div>
                            </button>
                            <button className="folder-card" onClick={()=>ToggleNotePopup(1)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="green" width="80" height="80" viewBox="0 0 24 24"><path d="M11 5c-1.629 0-2.305-1.058-4-3h-7v20h24v-17h-13z"/></svg>
                                <div className="folder-name">Education</div>
                            </button>
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

                            {lastPage !== pageNum && (

                                <button onClick={()=>setPageNum(pageNum+1)} className="my-notes-process-see">
                                    <svg  fill="white" width="34" height="36" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m10.211 7.155c-.141-.108-.3-.157-.456-.157-.389 0-.755.306-.755.749v8.501c0 .445.367.75.755.75.157 0 .316-.05.457-.159 1.554-1.203 4.199-3.252 5.498-4.258.184-.142.29-.36.29-.592 0-.23-.107-.449-.291-.591-1.299-1.002-3.945-3.044-5.498-4.243z"/></svg>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {notesPopupState && (
                    <NotesPopup
                        onClose={(b) => {
                            if (b === false) setNotesPopupState(b);
                            setRefresh(!refresh);
                        }}
                        folderId={folderIdState}
                    />
                )}

                {addNotePopupState && (
                    <AddFolderPopup
                        onClose={(b) => {
                            if (b === false) setAddNotePopupState(b);
                            setRefresh(!refresh);
                        }}
                    />
                )}


            </div>
    );
};

export default MyNotes;