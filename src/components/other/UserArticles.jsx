import React, {useEffect, useState} from 'react';
import ProcessPopup from "../popups/processPopup.jsx";
import AddNewArticlePopup from "../popups/AddNewArticlePopup.jsx";
import {GetWriterArticleRequest} from "../../API/ArticleApi.js";
import {parseJwt} from "../../Helper/JWTDecoder.js";
import Pagination from "./Pagination.jsx";
import {toast} from "react-toastify";

const UserArticles = () => {
    const [pageNum, setPageNum] = useState(1);
    const [processPopup, setProcessPopup] = useState(false);
    const [newArticlePopup, setNewArticlePopup] = useState(false);
    const [lastPage, setLastPage] = useState(null);
    const [articles, setArticles] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [processState, setProcessState] = useState({
        processtype: null,
        text: "",
        id: null,
    });

    const toggleProcessPopup = (type, id, text) => {
        setProcessPopup(!processPopup);
        setProcessState(prevState => ({
            ...prevState,
            processtype: type,
            text: text,
            id: id
        }));
    };


    const toggleNewArticlePopup = () => {
        setNewArticlePopup(!newArticlePopup);
    };


    const GetMyArticles = async () => {
        try {
            const jwt = await parseJwt()
            const articlesObj = await GetWriterArticleRequest( pageNum,4, jwt.nameid )
            setArticles(articlesObj.data.data.items)
            setLastPage(articlesObj.data.data.totalPages)
        }catch (error) {
            console.error(error);
            toast.error("Error while getting articles!");

        }
    }

    useEffect(() => {
        GetMyArticles();
    }, []);

    useEffect(() => {
        GetMyArticles();
    }, [refresh]);

    useEffect(() => {
        GetMyArticles();
    }, [pageNum]);

    return (
        <div className="row profile-col-2 col-xl-6 col-12">
            <div className="row row-gap-5 mb-5 col-12" style={{position:'relative'}}>
                <h3 className="text-center mt-3 col-12" data-aos="fade-in">My Article List</h3>
                <button className="add-article-btn-profile " onClick={toggleNewArticlePopup}>Add New Article</button>
                <button className="add-article-btn-profile-sm" onClick={toggleNewArticlePopup}>
                    +<svg xmlns="http://www.w3.org/2000/svg" fill="white" width="24" height="24" viewBox="0 0 24 24"><path d="M13.744 8s1.522-8-3.335-8h-8.409v24h20v-13c0-3.419-5.247-3.745-8.256-3zm.256 11h-8v-1h8v1zm4-3h-12v-1h12v1zm0-3h-12v-1h12v1zm-3.432-12.925c2.202 1.174 5.938 4.883 7.432 6.881-1.286-.9-4.044-1.657-6.091-1.179.222-1.468-.185-4.534-1.341-5.702z"/></svg>
                </button>

                {articles.length > 0 ? (
                    articles.map((article, index) => (
                        <div className="col-lg-6" key={index} data-aos="fade-up">
                            <a href={`article/${article.id}`} className="article-card pb-3">
                                <img className="w-100 img-fluid article-card-img" alt="article-image"
                                     src={
                                         article.thumbnailBase64
                                             ? (article.thumbnailBase64.startsWith("data:image")
                                                 ? article.thumbnailBase64
                                                 : `data:image/jpeg;base64,${article.thumbnailBase64}`)
                                             : "https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg"
                                     }/>
                                <p className="article-card-title">{article.title}</p>
                                <p className="article-card-desc">{article.shortContent}</p>
                                <div className="profile-article-card-btns col-12 px-3 justify-content-between">
                                    <button className="my-notes-process-see w-100"   onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        toggleProcessPopup('delete_article', article.id, "Should the article be deleted?");
                                    }}>Delete</button>
                                </div>
                            </a>
                        </div>
                    ))
                ) : (
                    <p className="text-center my-4">There are no articles yet.</p>
                )}

            </div>
            <Pagination pageNum={pageNum} setPageNum={setPageNum} lastPage={lastPage} />
            {processPopup && (
                <ProcessPopup
                    onClose={(b) => {
                        if (b === false) setProcessPopup(b);
                        setRefresh(!refresh);
                    }}
                    text={processState.text}
                    type={processState.processtype}
                    id={processState.id}
                />
            )}
            {newArticlePopup && (
                <AddNewArticlePopup
                    onClose={(b) => {
                        if (b === false) {
                            setNewArticlePopup(b);
                            setRefresh(!refresh);
                        }

                    }}
                />
            )}
        </div>
    );
};

export default UserArticles;