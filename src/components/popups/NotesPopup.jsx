import React, {useEffect, useState} from 'react';
import {NoteGetAllRequests} from "../../API/NoteApi.js";


const NotesPopup = ({onClose,folderId}) => {
    const [notesList, setNotesList] = useState([]);
    const [isProcessPopupOpen, setProcessIsPopupOpen] = useState(false);
    const [lastPage, setLastPage] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [pageNum, setPageNum] = useState(1);
    const [processState, setProcessState] = useState({
        processtype: null,
        text: "",
        id: null,
    });

    const toggleProcessPopup = (type, id, text) => {
        setProcessIsPopupOpen(!isProcessPopupOpen);
        setProcessState(prevState => ({
            ...prevState,
            processtype: type,
            text: text,
            id: id
        }));
    };

    const GetNotes=async() => {
        const notes = await NoteGetAllRequests(pageNum,10);
        setNotesList(notes.data.data.items);
        setLastPage(notes.data.data.totalPages)
    }


    useEffect(() => {
        GetNotes();
    }, [refresh]);

    return (
        <div className="popup-overlay">
            <div className="popup-content popup-content-note" style={{ color: '#fff'}} data-aos="zoom-in">
                <button className="popup-close-btn" onClick={() => onClose(false)}>&times;</button>
                <button className="popup-close-btn" style={{left:'5px',right:'unset'}}
                        onClick={() => {
                            toggleProcessPopup('folder_delete', folderId, "Are you sure you want to delete your folder?");
                            }}>
                    <svg fill="white" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2m-9-14c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6-5h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-12-2h4v-1h-4v1z"/></svg>
                </button>

                <div className="titles col-12 text-center mb-3" data-aos="fade-in">My Note Folders</div>
                <table className="table table-striped table-dark text-center" style={{borderRadius: '10px',overflow: 'hidden'}} >
                    <thead>
                    <tr>
                        <th scope="col">Note Description</th>
                        <th scope="col">Note Color</th>
                        <th scope="col">Article Name</th>
                        <th scope="col">Writer</th>
                        <th scope="col">Process</th>
                    </tr>
                    </thead>
                    <tbody>

                    {notesList.length > 0 ? (
                        notesList.map((note, index) => (
                            <tr key={index}>
                                <th scope="row">bu bölümü araştır</th>
                                <th scope="row">
                                    <div
                                    className="color-swatch mx-auto"
                                    style={{
                                        backgroundColor: "red",
                                        width: "30px",
                                        height: "30px",
                                        borderRadius: "50%",
                                        border: "3px solid #ccc",
                                        cursor: "pointer"
                                    }}

                                />
                                </th>
                                <th scope="row">{note.articleName}</th>
                                <td>{note.writer}</td>
                                <td>
                                    <div className="my-notes-process-flex">
                                        <a style={{background: 'orange'}} href={`/article/${note.id}`} className="my-notes-process-see">
                                            <svg clipRule="evenodd" fill="white" width="30" height="30" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.998 5c-4.078 0-7.742 3.093-9.853 6.483-.096.159-.145.338-.145.517s.048.358.144.517c2.112 3.39 5.776 6.483 9.854 6.483 4.143 0 7.796-3.09 9.864-6.493.092-.156.138-.332.138-.507s-.046-.351-.138-.507c-2.068-3.403-5.721-6.493-9.864-6.493zm.002 3c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4zm0 1.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5z" fillRule="nonzero"/></svg>
                                        </a>
                                        <button style={{background: 'red'}} onClick={() => toggleProcessPopup('note_delete', note.id, "Are you sure you want to delete your notes for this article?")} className="my-notes-process-bin">
                                            <svg fill="white" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2m-9-14c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6-5h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-12-2h4v-1h-4v1z"/></svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center py-4">No notes found.</td>
                        </tr>
                    )}





                    </tbody>
                </table>

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
            {isProcessPopupOpen && (
                <ProcessPopup
                    onClose={(b) => {
                        if (b === false) setProcessIsPopupOpen(b);
                        setRefresh(!refresh);
                        onClose(false)
                    }}
                    text={processState.text}
                    type={processState.processtype}
                    id={processState.id}
                />
            )}
        </div>
    );
};

export default NotesPopup;