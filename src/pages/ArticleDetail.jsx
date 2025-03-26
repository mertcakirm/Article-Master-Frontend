import React, {useEffect, useState} from "react";
import Navbar from "../components/Navbar.jsx";
import ReactMarkdown from "react-markdown";
import "./css/ArticleDetail.css";
import NotePopup from "../components/popups/AddNotesPopup.jsx";


const markdownContent = `
## Başlık 1
Bu bir makale giriş paragrafıdır.
### Alt Başlık
Bu makalenin ikinci bölümüdür.

Liste öğesi 1  
Liste öğesi 2
`;

const ArticleDetail = () => {
    const [notes, setNotes] = useState([]);
    const [selectedText, setSelectedText] = useState("");
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [noteColor, setNoteColor] = useState("");

    const handleTextSelection = () => {
        const selection = window.getSelection();
        if (selection.toString().trim().length > 0) {
            setSelectedText(selection.toString());
        }
    };

    useEffect(() => {
        console.log(selectedText)
        console.log(noteColor)
    }, [selectedText,noteColor]);

    const openPopup = () => {
        if (selectedText.trim() === "") {
            alert("Lütfen not eklemek için metin seçin!");
            return;
        }
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const saveNote = (noteText, noteColor) => {
        const startIndex = markdownContent.indexOf(selectedText);
        const endIndex = startIndex + selectedText.length;

        const isAlreadySelected = notes.some(
            (note) => note.startIndex === startIndex && note.endIndex === endIndex
        );

        if (!isAlreadySelected) {
            setNotes([...notes, { startIndex, endIndex, note: noteText, color: noteColor }]);
        } else {
            alert("Bu bölüme zaten not eklendi!");
        }

        setSelectedText("");
        closePopup();
    };

    const renderMarkdownWithNotes = (content) => {
        const markdownArray = content.split("\n");
        let modifiedText = markdownArray.map((line, index) => {
            let modifiedLine = line;
            notes
                .sort((a, b) => a.startIndex - b.startIndex)
                .forEach(({ startIndex, endIndex, note, color }) => {
                    if (startIndex >= 0 && endIndex <= modifiedLine.length) {
                        modifiedLine = (
                            <span key={index} className="highlighted-text" style={{ backgroundColor: color }}>
                                {modifiedLine.substring(startIndex, endIndex)}
                                <span className="tooltip">{note}</span>
                            </span>
                        );
                    }
                });
            return modifiedLine;
        }).join("\n");
        return modifiedText;
    };

    return (
        <div>
            <Navbar />
            <div className="page-container container-fluid">
                <div onMouseUp={handleTextSelection} className="markdown-content">
                    <div className="mark-text">
                        <ReactMarkdown>{renderMarkdownWithNotes(markdownContent)}</ReactMarkdown>
                    </div>
                </div>
            </div>

            {isPopupOpen && (
                <NotePopup
                    selectedText={selectedText}
                    onClose={closePopup}
                    onSaveNote={saveNote}
                    noteColor={noteColor}
                />
            )}

            <button onClick={openPopup} className="my-notes-process-see add-note-btn">
                📌 Seçili Bölgeye Not Ekle
            </button>
        </div>
    );
};

export default ArticleDetail;