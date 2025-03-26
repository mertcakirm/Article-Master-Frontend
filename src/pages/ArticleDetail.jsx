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
    const [hoveredNote, setHoveredNote] = useState(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const markdownRef = useRef(null);

    const getContrastColor = (backgroundColor) => {
        const r = parseInt(backgroundColor.substr(1, 2), 16);
        const g = parseInt(backgroundColor.substr(3, 2), 16);
        const b = parseInt(backgroundColor.substr(5, 2), 16);
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance > 0.5 ? '#000000' : '#FFFFFF';
    };

    const handleTextSelection = () => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return;

        const range = selection.getRangeAt(0);
        const selectedContent = range.toString();
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

    const handleNoteHover = (note, e) => {
        setHoveredNote(note);
        setTooltipPosition({
            x: e.clientX,
            y: e.clientY
        });
    };

    const handleNoteLeave = () => {
        setHoveredNote(null);
    };

    const renderMarkdownWithNotes = () => {
        if (!notes.length) return markdown;

        const sortedNotes = [...notes].sort((a, b) => b.start - a.start);
        let modifiedMarkdown = markdown;

        sortedNotes.forEach(note => {
            const prefix = modifiedMarkdown.slice(0, note.start);
            const highlightedText = modifiedMarkdown.slice(note.start, note.end);
            const suffix = modifiedMarkdown.slice(note.end);
            const textColor = getContrastColor(note.color);

            modifiedMarkdown = `${prefix}<span 
                style="background-color:${note.color}; 
                       color:${textColor};
                       padding: 0px 4px; 
                       border-radius: 4px;"
                onmouseenter="window.__handleNoteHover(${JSON.stringify(note)}, event)"
                onmouseleave="window.__handleNoteLeave()"
            >${highlightedText}</span>${suffix}`;
        });

        return modifiedMarkdown;
    };

    useEffect(() => {
        // Expose functions to the global scope for inline event handlers
        window.__handleNoteHover = (note, e) => {
            handleNoteHover(note, e);
        };
        window.__handleNoteLeave = handleNoteLeave;

        return () => {
            delete window.__handleNoteHover;
            delete window.__handleNoteLeave;
        };
    }, []);

    const noteColors = [
        '#FFD700', '#98FB98', '#87CEFA', '#DDA0DD', '#F0E68C'
    ];

    return (
        <div style={{ maxWidth: '100%', padding: '16px', position: 'relative' }}>
            <div
                ref={markdownRef}
                onMouseUp={handleTextSelection}
                style={{ marginBottom: '16px' }}
            >
                <ReactMarkdown
                    rehypePlugins={[rehypeRaw]}
                    components={{
                        span: ({ node, ...props }) => {
                            // Check if this is a note span
                            if (typeof props.onmouseenter === 'string') {
                                return <span {...props} />;
                            }
                            return <span {...props} />;
                        },
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
                    <div style={{ display: 'flex', gap: '8px' }}>
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

            {hoveredNote && (
                <div style={{
                    position: 'fixed',
                    left: `${tooltipPosition.x + 10}px`,
                    top: `${tooltipPosition.y + 10}px`,
                    backgroundColor: 'white',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    padding: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    zIndex: 1000,
                    maxWidth: '300px',
                    pointerEvents: 'none'
                }}>
                    {hoveredNote.text}
                </div>
            )}
        </div>
    );
};