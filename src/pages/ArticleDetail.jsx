import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import "./css/ArticleDetail.css";
import CommnetsPopup from "../components/popups/CommnetsPopup.jsx";
import {GetArticleRequest, IncreaseArticleViewCountRequest} from "../API/ArticleApi.js";
import RichTextMarkdown from "../components/other/RichTextMarkdown.jsx";
import Loading from "../components/other/Loading.jsx";
import {AddNoteRequest, GetNoteRequest} from "../API/NoteApi.js";
import {end} from "@popperjs/core";

const ArticleDetail = () => {
    const [notes, setNotes] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isPopupOpenComment, setIsPopupOpenComment] = useState(false);
    const [selectionRange, setSelectionRange] = useState({});
    const [markdownContent, setMarkdownContent] = useState("Article content is empty");
    const [articleid,setArticleid] = useState(null);
    const [loading, setLoading] = useState(true);

    const url = window.location.pathname.split("/").filter(Boolean).pop();

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

            setSelectionRange({ startIndex, endIndex });

            setIsPopupOpen(true);
        }
    };

    const IncreaseViewCount=async ()=>{
        await IncreaseArticleViewCountRequest(url)
    }


    const GetArticle=async ()=>{
        try {
            const article =await GetArticleRequest(url);
            setMarkdownContent(article.data.data)
            if (article.data===null) {
                setLoading(true)
            }
            setLoading(false);

        }catch (error) {
            console.log(error);
        }

    }

    const GetNotes = async ()=>{
        const notes = await GetNoteRequest (url);
        setNotes(notes.data.data.map(n=>({
            start:n.insertStart,
                end:n.insertEnd,
            text:n.note,
            color:n.color
        })));
    }


    useEffect(()=>{
        GetArticle();
        GetNotes();
        setArticleid(url)

        const timer = setTimeout(() => {
            IncreaseViewCount();
        }, 5000);

        return () => clearTimeout(timer);
    },[])

    if (loading) {
        return <Loading />;
    }

    return (
            <div className="page-container container-fluid">
                    <button className="comment-canvas-btn" onClick={togglePopupComment} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" viewBox="0 0 24 24"><path d="M12 3c5.514 0 10 3.685 10 8.213 0 5.04-5.146 8.159-9.913 8.159-2.027 0-3.548-.439-4.548-.712l-4.004 1.196 1.252-2.9c-.952-1-2.787-2.588-2.787-5.743 0-4.528 4.486-8.213 10-8.213zm0-2c-6.628 0-12 4.573-12 10.213 0 2.39.932 4.591 2.427 6.164l-2.427 5.623 7.563-2.26c1.585.434 3.101.632 4.523.632 7.098.001 11.914-4.931 11.914-10.159 0-5.64-5.372-10.213-12-10.213z"/></svg>
                    </button>
                <div className="markdown-content" style={{position:'relative'}} onMouseUp={handleTextSelection}>
                    <div className="titles pt-3 text-center">{markdownContent.title}</div>
                    <div className="article-detail-info-flex">
                        <div className="my-notes-process-flex align-items-center" style={{columnGap:'5px'}}>
                            <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round"
                                 strokeMiterlimit="2" width="30" fill="white" height="30"
                                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="m11.998 5c-4.078 0-7.742 3.093-9.853 6.483-.096.159-.145.338-.145.517s.048.358.144.517c2.112 3.39 5.776 6.483 9.854 6.483 4.143 0 7.796-3.09 9.864-6.493.092-.156.138-.332.138-.507s-.046-.351-.138-.507c-2.068-3.403-5.721-6.493-9.864-6.493zm.002 3c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4zm0 1.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5z"
                                    fillRule="nonzero"/>
                            </svg>
                            <div>{markdownContent.viewCount}</div>
                        </div>
                        <div className="my-notes-process-flex align-items-center" style={{columnGap:'5px'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" fill="yellow" height="25"
                                 viewBox="0 0 24 24">
                                <path
                                    d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
                            </svg>
                            <div>{parseFloat(markdownContent.ratingOverall).toFixed(1)}/10</div>
                        </div>
                    </div>
                    <div className="mark-text">
                        <RichTextMarkdown
                            markdown={markdownContent.pdfText}
                            notes={notes}
                            setNotes={setNotes}
                            onNewNote={({start, end, text, color}) => AddNoteRequest(
                                {
                                    "articleId":articleid,
                                    "insertStart": start,
                                    "insertEnd": end,
                                    "note": text,
                                    "color": color,
                                }
                            )}
                        />
                    </div>
                </div>

                {isPopupOpenComment && (
                    <CommnetsPopup
                        onClose={() => setIsPopupOpenComment(false)}
                        id={articleid}
                    />
                )}
            </div>


    );
};

export default ArticleDetail;