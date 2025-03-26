import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import ReactMarkdown from "react-markdown";
import "./css/ArticleDetail.css";
import NotePopup from "../components/popups/AddNotesPopup.jsx";
import rehypeRaw from 'rehype-raw';

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
        return;
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
                        <RichTextMarkdown
                            markdown={markdownContent}
                            notes={notes}
                            setNotes={setNotes}
                        />
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

const RichTextMarkdown = ({
                              markdown,
                              notes,
                              setNotes
                          }) => {
    const [selectedText, setSelectedText] = useState(null);
    const [newNoteText, setNewNoteText] = useState('');
    const markdownRef = useRef(null);

    const handleTextSelection = () => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return;

        const range = selection.getRangeAt(0);
        const selectedContent = range.toString();

        const markdownElement = markdownRef.current;
        if (!markdownElement) return;

        // Find the absolute position of the selected text in the markdown
        const absolutePosition = markdown.indexOf(selectedContent);

        if (absolutePosition !== -1) {
            setSelectedText({
                text: selectedContent,
                start: absolutePosition,
                end: absolutePosition + selectedContent.length
            });
        }
    };

    const addNote = (noteText, color) => {
        if (selectedText) {
            const newNote = {
                start: selectedText.start,
                end: selectedText.end,
                text: noteText,
                color
            };
            setNotes([...notes, newNote]);
            setSelectedText(null);
            setNewNoteText('');
        }
    };

    const renderMarkdownWithNotes = () => {
        if (!notes.length) return markdown;

        // Sort notes by start position in descending order to avoid index shifting
        const sortedNotes = [...notes].sort((a, b) => b.start - a.start);

        let modifiedMarkdown = markdown;

        // Apply notes
        sortedNotes.forEach(note => {
            const prefix = modifiedMarkdown.slice(0, note.start);
            const highlightedText = modifiedMarkdown.slice(note.start, note.end);
            const suffix = modifiedMarkdown.slice(note.end);

            modifiedMarkdown = `${prefix}<span style="background-color:${note.color}; padding: 0px 4px; border-radius: 4px;">${highlightedText}</span>${suffix}`;
        });

        return modifiedMarkdown;
    };

    const noteColors = [
        '#FFD700', // Gold
        '#98FB98', // Pale Green
        '#87CEFA', // Light Sky Blue
        '#DDA0DD', // Plum
        '#F0E68C'  // Khaki
    ];

    return (
        <div style={{ maxWidth: '100%', padding: '16px' }}>
            <div
                ref={markdownRef}
                onMouseUp={handleTextSelection}
                style={{ marginBottom: '16px' }}
            >
                <ReactMarkdown
                    rehypePlugins={[rehypeRaw]}
                    components={{
                        span: ({ node, ...props }) => (
                            <span
                                {...props}
                                style={{
                                    ...props.style,
                                    cursor: props.title ? 'help' : 'inherit',
                                }}
                            />
                        ),
                    }}
                >
                    {renderMarkdownWithNotes()}
                </ReactMarkdown>
            </div>

            {selectedText && (
                <div style={{
                    border: '1px solid #ccc',
                    padding: '16px',
                    borderRadius: '8px'
                }}>
          <textarea
              placeholder="Enter your note"
              value={newNoteText}
              onChange={(e) => setNewNoteText(e.target.value)}
              style={{
                  width: '100%',
                  marginBottom: '16px',
                  padding: '8px',
                  borderRadius: '4px'
              }}
          />
                    <div style={{
                        display: 'flex',
                        gap: '8px'
                    }}>
                        {noteColors.map((color) => (
                            <button
                                key={color}
                                onClick={() => addNote(newNoteText, color)}
                                style={{
                                    backgroundColor: color,
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '50%',
                                    border: 'none',
                                    cursor: 'pointer'
                                }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};