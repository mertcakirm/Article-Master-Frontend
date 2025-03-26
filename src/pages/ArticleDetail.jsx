import React, { useState } from "react";
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
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [noteColor, setNoteColor] = useState("#ffeb3b");
    const [selectedText, setSelectedText] = useState("");
    const [selectionRange, setSelectionRange] = useState({});

    const saveNote = (noteText, noteColor) => {
        const { startIndex, endIndex } = selectionRange;
        if (!noteText.trim()) {
            alert("Lütfen bir not girin!");
            return;
        }

        const isAlreadySelected = notes.some(
            (note) => note.startIndex === startIndex && note.endIndex === endIndex
        );

        if (!isAlreadySelected) {
            setNotes([
                ...notes,
                { startIndex, endIndex, note: noteText, color: noteColor },
            ]);
        } else {
            alert("Bu bölüme zaten not eklendi!");
        }

        setIsPopupOpen(false);
    };

    const handleTextSelection = () => {
        const selection = window.getSelection();
        const selectedText = selection.toString();

        if (selectedText.trim()) {
            const range = selection.getRangeAt(0);
            const startIndex = range.startOffset;
            const endIndex = range.endOffset;

            setSelectedText(selectedText);
            setSelectionRange({ startIndex, endIndex });

            setIsPopupOpen(true);
        }
    };

    const renderMarkdownWithNotes = (content) => {
        let modifiedContent = content;

        notes.forEach(({ startIndex, endIndex, note, color }) => {
            const highlightedText = modifiedContent.substring(startIndex, endIndex);
            const replacementText = `<span class="highlighted-text" style="background-color: ${color}" data-note="${note}">${highlightedText}</span>`;
            modifiedContent = modifiedContent.replace(highlightedText, replacementText);
        });

        return <div dangerouslySetInnerHTML={{ __html: modifiedContent }} />;
    };

    return (
        <div>
            <Navbar />
            <div className="page-container container-fluid">
                <div className="markdown-content" onMouseUp={handleTextSelection}>
                    <div className="mark-text">
                        {renderMarkdownWithNotes(markdownContent)}
                    </div>
                </div>
            </div>

            {isPopupOpen && (
                <NotePopup
                    selectedText={selectedText}
                    noteColor={noteColor}
                    setNoteColor={setNoteColor}
                    onSaveNote={saveNote}
                    onClose={() => setIsPopupOpen(false)}
                />
            )}

            <button onClick={() => setIsPopupOpen(true)} className="my-notes-process-see add-note-btn">
                📌 Seçili Bölgeye Not Ekle
            </button>
        </div>
    );
};

export default ArticleDetail;