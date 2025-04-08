import React, {useEffect, useState} from 'react';
import ProcessPopup from "../popups/processPopup.jsx";
import AddNewArticlePopup from "../popups/AddNewArticlePopup.jsx";
import EditArticlePopup from "../popups/EditArticlePopup.jsx";
import {GetWriterArticleRequest} from "../../API/ArticleApi.js";

const UserArticles = () => {
    const [updateId, setUpdateId] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [processPopup, setProcessPopup] = useState(false);
    const [newArticlePopup, setNewArticlePopup] = useState(false);
    const [editArticlePopup, setEditArticlePopup] = useState(false);
    const [lastPage, setLastPage] = useState(null);
    const [articles, setArticles] = useState([]);
    const [processState, setProcessState] = useState({
        processtype: null,
        text: "",
        acceptedText: "",
        id: null,
    });

    const toggleProcessPopup = (type, id, text, acceptedText) => {
        setProcessPopup(!processPopup);
        setProcessState(prevState => ({
            ...prevState,
            processtype: type,
            text: text,
            acceptedText: acceptedText,
            id: id
        }));
    };

    const toggleNewArticlePopup = () => {
        setNewArticlePopup(!newArticlePopup);
    };
    const toggleEditArticlePopup = () => {
        setEditArticlePopup(!editArticlePopup);
    };

    const GetMyArticles = async () => {
        const articlesObj = await GetWriterArticleRequest( pageNum,4, 23 )
        setArticles(articlesObj.data.data.items)
        setLastPage(articlesObj.data.data.totalPages)
    }

    useEffect(() => {
        GetMyArticles();
    }, []);

    useEffect(() => {
        GetMyArticles();
    }, [pageNum]);

    return (
        <div className="row profile-col-2 col-xl-6 col-12">
            <div className="row row-gap-5 col-12" style={{position:'relative'}}>
                <h3 className="text-center col-12" data-aos="fade-in">My Article List</h3>
                <button className="add-article-btn-profile " onClick={toggleNewArticlePopup}>Add New Article</button>
                <button className="add-article-btn-profile-sm" onClick={toggleNewArticlePopup}>
                    +<svg xmlns="http://www.w3.org/2000/svg" fill="white" width="24" height="24" viewBox="0 0 24 24"><path d="M13.744 8s1.522-8-3.335-8h-8.409v24h20v-13c0-3.419-5.247-3.745-8.256-3zm.256 11h-8v-1h8v1zm4-3h-12v-1h12v1zm0-3h-12v-1h12v1zm-3.432-12.925c2.202 1.174 5.938 4.883 7.432 6.881-1.286-.9-4.044-1.657-6.091-1.179.222-1.468-.185-4.534-1.341-5.702z"/></svg>
                </button>

                {articles.length > 0 ? (
                    articles.map((article, index) => (
                        <div className="col-lg-6" key={index} data-aos="fade-up">
                            <a href="#" className="article-card pb-3">
                                <img className="w-100 img-fluid article-card-img" alt="article-image"
                                     src="https://bgcp.bionluk.com/images/portfolio/1400x788/d9792dfe-2379-4a8f-bc5f-3c1649310174.jpg"/>
                                <p className="article-card-title">{article.title}</p>
                                <p className="article-card-desc">{article.shortContent}</p>
                                <div className="profile-article-card-btns col-12 px-3 justify-content-between">
                                    <button className="my-notes-process-see" onClick={toggleEditArticlePopup}>Edit</button>
                                    <button className="my-notes-process-see" onClick={()=>toggleProcessPopup('delete_article',1,"Should the article be deleted?","Transaction successful")}>Delete</button>
                                </div>
                            </a>
                        </div>
                    ))
                ) : (
                    <p className="text-center my-4">There are no articles yet.</p>
                )}




            </div>

            <div  className="my-notes-process-flex my-5" data-aos="fade-up" style={{height:'fit-content'}} >
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

                {(lastPage !== pageNum && lastPage !== 0) && (
                    <button onClick={() => setPageNum(pageNum + 1)} className="my-notes-process-see">
                        <svg fill="white" width="34" height="36" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="m10.211 7.155c-.141-.108-.3-.157-.456-.157-.389 0-.755.306-.755.749v8.501c0 .445.367.75.755.75.157 0 .316-.05.457-.159 1.554-1.203 4.199-3.252 5.498-4.258.184-.142.29-.36.29-.592 0-.23-.107-.449-.291-.591-1.299-1.002-3.945-3.044-5.498-4.243z" />
                        </svg>
                    </button>
                )}

            </div>
            {processPopup && (
                <ProcessPopup
                    onClose={(b) => {
                        if (b === false) setProcessPopup(b);
                    }}
                    text={processState.text}
                    acceptedText={processState.acceptedText}
                    type={processState.processtype}
                    id={processState.id}
                />
            )}

            {newArticlePopup && (
                <AddNewArticlePopup
                    onClose={(b) => {
                        if (b === false) setNewArticlePopup(b);
                    }}
                />
            )}

            {editArticlePopup && (
                <EditArticlePopup
                    onClose={(b) => {
                        if (b === false) setEditArticlePopup(b);
                    }}
                    id={updateId}
                />
            )}
        </div>
    );
};

export default UserArticles;