import React, {useEffect, useState} from 'react';
import './css/MyNotes.css'
import NotesPopup from "../components/popups/NotesPopup.jsx";
import AddFolderPopup from "../components/popups/AddFolderPopup.jsx";
import Pagination from "../components/other/Pagination.jsx";
import {GetFoldersRequest} from "../API/NoteApi.js";

const MyNotes = () => {
    const [pageNum, setPageNum] = useState(1);
    const [lastPage, setLastPage] = useState(null);
    const [notesPopupState, setNotesPopupState] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [folderIdState, setFolderIdState] = useState("");
    const [addNotePopupState, setAddNotePopupState] = useState(false);
    const [folders, setFolders] = useState([]);

    const ToggleNotePopup = (folderId) => {
        setFolderIdState(folderId);
        setNotesPopupState(!notesPopupState);
    }

    const ToggleAddNotePopup = () => {
        setAddNotePopupState(!addNotePopupState);
    }

    const GetFolders= async ()=>{
        const foldersObj = await GetFoldersRequest(pageNum,10);
        setFolders(foldersObj.data.data.items);
    }

    useEffect(() => {
        GetFolders();
    }, []);
    useEffect(() => {
        GetFolders();
    }, [refresh]);
    return (
        <div className="page-container container-fluid">
            <div className="row" style={{position: 'relative'}}>
                <div className="titles col-12 text-center mt-5" data-aos="fade-in">My Note Folders</div>
                <button className="add-folder-btn" onClick={ToggleAddNotePopup}>Add New Folder</button>
                <div className="col-12 px-5 mt-5 justify-content-center" data-aos="fade-in">
                    <div className="folder-row">
                        {folders.length > 0 ? (
                            folders.map((folder, index) => (
                                <button key={index} className="folder-card" onClick={() => ToggleNotePopup(folder.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill={folder.color} width="80" height="80"
                                         viewBox="0 0 24 24">
                                        <path d="M11 5c-1.629 0-2.305-1.058-4-3h-7v20h24v-17h-13z"/>
                                    </svg>
                                    <div className="folder-name">
                                        {folder.name}
                                    </div>
                                    <div className="folder-queantity">{folder.notesCount} Items</div>
                                </button>
                            ))
                        ) : (
                            <div className="text-center w-100">No folders found.</div>
                        )}
                    </div>
                    <Pagination pageNum={pageNum} setPageNum={setPageNum} lastPage={lastPage}/>
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