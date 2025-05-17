import React, {useState} from 'react';
import './css/MyNotes.css'
import NotesPopup from "../components/popups/NotesPopup.jsx";
import AddFolderPopup from "../components/popups/AddFolderPopup.jsx";
import Pagination from "../components/other/Pagination.jsx";

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
                                <div className="folder-name">Important</div>
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


                        <Pagination pageNum={pageNum} setPageNum={setPageNum} lastPage={lastPage} />

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