import React, { useEffect, useState } from 'react';
import { GetArticlesRequest } from "../../API/ArticleApi.js";
import Pagination from "../other/Pagination.jsx";

const ArticleAdmin = ({ toggleProcessPopup, refresh, setRefresh }) => {
    const [articles, setArticles] = useState([]);
    const [pageNum, setPageNum] = useState(1);
    const [lastPage, setLastPage] = useState(null);
    const [search, setSearch] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(null);


    const GetArticles = async () => {
        const articleObj = await GetArticlesRequest(pageNum, 5,search);
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
        <div className="col-lg-6 col-12 px-3 mt-5 row justify-content-center" data-aos="fade-up" style={{ height: 'fit-content' }}>
            <div className="row justify-content-between">
                <input type="text" className="profile_inp admin-inp col-lg-3" onChange={(e) => searchTextChanged(e.target.value)} placeholder="Search Article"></input>
                <div className="titles text-center admin-title mb-3 col-lg-6">artIcles</div>
                <div className="col-lg-3"></div>
            </div>

            <table className="table table-striped table-dark text-center" style={{ borderRadius: '10px', overflow: 'hidden' }}>
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
                                            className="my-notes-process-bin px-3 py-1"
                                            style={{ background: 'red' }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="24" height="24" viewBox="0 0 24 24"><path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z" /></svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center my-4">
                                There are no articles yet.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <Pagination pageNum={pageNum} setPageNum={setPageNum} lastPage={lastPage} />

        </div>
    );
};

export default ArticleAdmin;