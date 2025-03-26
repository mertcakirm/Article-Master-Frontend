import React, { useState } from "react";

const NotePopup = ({ selectedText, onClose, onSaveNote, noteColor, setNoteColor }) => {
    const [noteText, setNoteText] = useState("");

    const handleNoteChange = (e) => {
        setNoteText(e.target.value);
    };

    const handleColorChange = (e) => {
        setNoteColor(e.target.value);
    };

    const saveNote = () => {
        if (!noteText.trim()) {
            alert("Lütfen bir not girin!");
            return;
        }

        onSaveNote(noteText, noteColor);
        setNoteText("");
        onClose();
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h3 className="titles text-center" style={{ color: "#fff" }}>Not Ekle</h3>
                <textarea
                    value={noteText}
                    onChange={handleNoteChange}
                    placeholder="Notunuzu girin"
                    rows="4"
                    className="w-100 profile_inp mt-3"
                    style={{ resize: "none", height: "200px" }}
                ></textarea>
                <div>
                    <label style={{ color: "#fff" }}>Renk Seçin:</label>
                    <input
                        type="color"
                        value={noteColor}
                        onChange={handleColorChange}
                    />
                </div>
                <div className="my-notes-process-flex justify-content-between mt-3">
                    <button className="my-notes-process-see" onClick={onClose}>İptal</button>
                    <button className="my-notes-process-see" onClick={saveNote}>Notu Kaydet</button>
                </div>
            </div>
        </div>
    );
};

export default NotePopup;