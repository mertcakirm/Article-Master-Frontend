import React, {useEffect, useRef, useState} from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import CustomTooltip from "./CustomTooltip.jsx";
import {getCookie} from "../../API/Cokkie.js";

const RichTextMarkdown = ({
                              markdown,
                              notes,
                              setNotes, onNewNote = null,
                          }) => {
    const [selectedText, setSelectedText] = useState(null);
    const [newNoteText, setNewNoteText] = useState('');
    const markdownRef = useRef(null);
    const noteEditorRef = useRef(null);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

    const token =getCookie("token")
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
        if(!token){
            window.location.href="/sign/in";
        }
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

            if (onNewNote)
                onNewNote(newNote);
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

export default RichTextMarkdown;