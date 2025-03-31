import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import ReactMarkdown from "react-markdown";
import "./css/ArticleDetail.css";
import rehypeRaw from 'rehype-raw';
import CommnetsPopup from "../components/popups/CommnetsPopup.jsx";

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
    const [isPopupOpenComment, setIsPopupOpenComment] = useState(false);
    const [noteColor, setNoteColor] = useState("#ffeb3b");
    const [selectedText, setSelectedText] = useState("");
    const [selectionRange, setSelectionRange] = useState({});
    const [articleid,setArticleid] = useState(null);
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

    const togglePopupComment = () => {
        setIsPopupOpenComment(!isPopupOpenComment);
    }

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
                    <button className="comment-canvas-btn" onClick={togglePopupComment} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" viewBox="0 0 24 24"><path d="M12 3c5.514 0 10 3.685 10 8.213 0 5.04-5.146 8.159-9.913 8.159-2.027 0-3.548-.439-4.548-.712l-4.004 1.196 1.252-2.9c-.952-1-2.787-2.588-2.787-5.743 0-4.528 4.486-8.213 10-8.213zm0-2c-6.628 0-12 4.573-12 10.213 0 2.39.932 4.591 2.427 6.164l-2.427 5.623 7.563-2.26c1.585.434 3.101.632 4.523.632 7.098.001 11.914-4.931 11.914-10.159 0-5.64-5.372-10.213-12-10.213z"/></svg>
                    </button>


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
            {isPopupOpenComment && (
                <CommnetsPopup
                    onClose={() => setIsPopupOpenComment(false)}
                    id="1"
                />
            )}
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
    const noteEditorRef = useRef(null);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (!noteEditorRef.current)
            return;

        noteEditorRef.current.style.top = `${cursorPosition.y + 18}px`;
    }, [selectedText]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setCursorPosition({
                x: e.clientX,
                y: e.clientY
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

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

            modifiedMarkdown = `${prefix}<span style="background-color:${note.color}; padding: 0px 4px; border-radius: 4px;" data-note="${note.text}">${highlightedText}</span>${suffix}`;
        });

        return modifiedMarkdown;
    };
    const noteColors = [
        '#FF4500', // Orange Red
        '#32CD32', // Lime Green
        '#1E90FF', // Dodger Blue
        '#FF69B4', // Hot Pink
        '#8A2BE2', // Blue Violet
        '#00CED1', // Dark Turquoise
        '#FF6347', // Tomato
        '#20B2AA', // Light Sea Green
        '#FF8C00', // Dark Orange
        '#DC143C', // Crimson
        '#4682B4', // Steel Blue
        '#8FBC8F', // Dark Sea Green
        '#7B68EE', // Medium Slate Blue
        '#800000', // Maroon
        '#556B2F', // Dark Olive Green
        '#8B0000', // Dark Red
        '#2F4F4F', // Dark Slate Gray
        '#9932CC', // Dark Orchid
        '#483D8B', // Dark Slate Blue
        '#008B8B'  // Dark Cyan
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
                <CustomTooltip />
            </div>

            {selectedText && (
                <div ref={noteEditorRef}
                    style={{
                    position: 'fixed',
                    border: '1px solid #ccc',
                    padding: '16px',
                    borderRadius: '8px',
                    backgroundColor: '#232323',
                }}>
          <textarea
              placeholder="Enter your note"
              value={newNoteText}
              onChange={(e) => setNewNoteText(e.target.value)}
              style={{
                  width: '100%',
                  marginBottom: '16px',
                  padding: '8px',
                  borderRadius: '4px',
                  resize:'none'
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

const CustomTooltip = () => {
    const [tooltip, setTooltip] = useState({
        visible: false,
        content: '',
        position: { x: 0, y: 0 }
    });
    const [hoveredElement, setHoveredElement] = useState(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const element = document.elementFromPoint(e.clientX, e.clientY);

            if (element === hoveredElement) {
                setTooltip(prev => ({
                    ...prev,
                    position: { x: e.clientX, y: e.clientY }
                }));
                return;
            }

            setHoveredElement(element);

            if (element && element.hasAttribute('data-note')) {
                const content = element.getAttribute('data-note');
                setTooltip({
                    visible: true,
                    content,
                    position: { x: e.clientX, y: e.clientY }
                });
            } else {
                setTooltip(prev => ({ ...prev, visible: false }));
            }
        };

        const handleMouseLeave = () => {
            setTooltip(prev => ({ ...prev, visible: false }));
            setHoveredElement(null);
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.body.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [hoveredElement]);

    if (!tooltip.visible) return null;

    return (
        <div
            style={{
                position: 'fixed',
                left: `${tooltip.position.x + 10}px`,
                top: `${tooltip.position.y + 10}px`,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                color: 'white',
                padding: '5px 10px',
                borderRadius: '4px',
                zIndex: 9999,
                pointerEvents: 'none',
            }}
        >
            {tooltip.content}
        </div>
    );
};