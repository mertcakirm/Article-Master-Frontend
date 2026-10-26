import React, {useEffect, useState} from 'react';
import {GetArticlesRequest} from "../../API/ArticleApi.js";
import Pagination from "../other/Pagination.jsx";

const ArticleAdmin = ({toggleProcessPopup, refresh, setRefresh}) => {
    const [articles, setArticles] = useState([]);
    const [pageNum, setPageNum] = useState(1);
    const [lastPage, setLastPage] = useState(null);
    const [search, setSearch] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(null);

    const GetArticles = async () => {
        const articleObj = await GetArticlesRequest(pageNum, 5, search);
        setLastPage(articleObj.data.data.totalPages);
        setArticles(articleObj.data.data.items);
    };

    useEffect(() => {
        GetArticles();
    }, []);

    useEffect(() => {
        GetArticles();
    }, [pageNum]);

    useEffect(() => {
        GetArticles();
    }, [refresh]);

    const searchTextChanged = (searchStr) => {
        if (searchTimeout !== null) {
            clearTimeout(searchTimeout);
        }
        const newTimeout = setTimeout(() => {
            setSearch(searchStr);
            GetArticles();
        }, 800);
        setSearchTimeout(newTimeout);
    };

    return (
        <section className="admin-panel" data-aos="fade-up">
            <div className="admin-panel-head">
                <div className="admin-panel-heading">
                    <span className="admin-panel-kicker">LIBRARY / 04</span>
                    <h2 className="admin-panel-title">Articles</h2>
                    <p className="admin-panel-description">Review the published content library.</p>
                </div>
                <span className="admin-panel-count">{articles.length} on page</span>
            </div>
            <div className="admin-panel-toolbar">
                <input
                    type="search"
                    className="admin-search"
                    aria-label="Search articles"
                    onChange={(e) => searchTextChanged(e.target.value)}
                    placeholder="Search articles..."
                />
            </div>
            <div className="admin-table-wrap">
            <table className="table table-striped table-dark text-center admin-table">
                <thead>
                <tr>
                    <th scope="col">Article Name</th>
                    <th scope="col">Writer Name</th>
                    <th scope="col">View Count</th>
                    <th scope="col">Process</th>
                </tr>
                </thead>
                <tbody>
                {articles.length > 0 ? (
                    articles.map((article, index) => (
                        <tr key={index}>
                            <th scope="row">{article.title}</th>
                            <td>{article.writerName}</td>
                            <td>{article.viewCount}</td>
                            <td>
                                <div className="my-notes-process-flex">
                                    <button
                                        onClick={() => toggleProcessPopup(
                                            'delete_article',
                                            article.id,
                                            "Should the article be deleted?",
                                            "Transaction successful"
                                        )}
                                        className="admin-action admin-action-delete"
                                        aria-label={`Delete article ${article.title}`}
                                        title="Delete article"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="24" height="24"
                                             viewBox="0 0 24 24">
                                            <path
                                                d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z"/>
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4" className="admin-empty-state">
                            There are no articles yet.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
            </div>
            <div className="admin-pagination">
                <Pagination pageNum={pageNum} setPageNum={setPageNum} lastPage={lastPage}/>
            </div>
        </section>
    );
};

export default ArticleAdmin;