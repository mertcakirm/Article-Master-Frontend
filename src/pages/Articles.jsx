import React, {useEffect, useState} from 'react';
import {GetArticlesRequest} from "../API/ArticleApi.js";
import Loading from "../components/other/Loading.jsx";
import {AddFavoriteRequest} from "../API/FavoriteApi.js";
import { toast } from 'react-toastify';
import Pagination from "../components/other/Pagination.jsx";

const Articles = () => {
    const [pageNum, setPageNum] = useState(1);
    const [articles, setArticles] = useState([]);
    const [lastPage, setLastPage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(null);
    const AddFavorite = async (id)=>{
        const FavoriteObj ={
            articleId:id,
        }
        try {
            await AddFavoriteRequest(FavoriteObj);
            toast.success("Article added to favorites!");
        }catch (error){
            toast.error("The article could not be added to favorites!")
            console.log(error);
        }
    }

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



    const GetArticles = async () => {
        try {
            const data = await GetArticlesRequest(pageNum,10,search)
            setArticles(data.data.data.items)
            setLastPage(data.data.data.totalPages)
        }catch (error) {
            console.log(error);
        }finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        GetArticles()
    }, []);

    useEffect(() => {
        GetArticles()
    }, [pageNum]);

    if (loading) {
        return <Loading />;
    }
    return (
            <div className="page-container mb-5 container-fluid">
                <div className="row row-gap-5 popular-row">
                    <div className="col-12 row align-items-center align-content-center mt-3">
                        <input type="text" className="profile_inp admin-inp col-lg-3" data-aos="fade-in" onChange={(e) => searchTextChanged(e.target.value)} placeholder="Search Article"></input>
                        <div className="col-lg-6 titles mt-5 mb-4 text-center" data-aos="fade-in">Articles</div>
                        <div className="col-lg-3"></div>
                    </div>

                    {articles.length > 0 ? (
                        articles.map((article, index) => (
                            <div className="col-lg-3" data-aos="fade-up" key={index}>
                                <a href={`/article/${article.id}`} className="article-card">
                                    <img className="w-100 img-fluid article-card-img"
                                        src={
                                            article.thumbnailBase64
                                                ? (article.thumbnailBase64.startsWith("data:image")
                                                    ? article.thumbnailBase64
                                                    : `data:image/jpeg;base64,${article.thumbnailBase64}`)
                                                : "https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg"
                                        }
                                        alt="Article Thumbnail"
                                    />
                                    <p className="article-card-title">{article.title}</p>
                                    <p className="article-card-desc">{article.description || "Article description not found."}</p>
                                    <div className="my-notes-process-flex justify-content-between w-100 px-5">
                                        <div className="my-notes-process-flex align-items-center">
                                            <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round"
                                                 strokeMiterlimit="2" width="30" fill="white" height="30"
                                                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="m11.998 5c-4.078 0-7.742 3.093-9.853 6.483-.096.159-.145.338-.145.517s.048.358.144.517c2.112 3.39 5.776 6.483 9.854 6.483 4.143 0 7.796-3.09 9.864-6.493.092-.156.138-.332.138-.507s-.046-.351-.138-.507c-2.068-3.403-5.721-6.493-9.864-6.493zm.002 3c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4zm0 1.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5z"
                                                    fillRule="nonzero"/>
                                            </svg>
                                            <div>{article.viewCount}</div>
                                        </div>
                                        <div className="my-notes-process-flex align-items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" fill="yellow" height="25"
                                                 viewBox="0 0 24 24">
                                                <path
                                                    d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
                                            </svg>
                                            <div>{Number.isInteger(article.ratingOverall) ? article.ratingOverall : article.ratingOverall.toFixed(1)}/10</div>
                                        </div>
                                    </div>
                                    <p className="article-card-writerName">{article.writerName}</p>

                                </a>
                                <button className="article-card-like" onClick={()=>AddFavorite(article.id)} >
                                    <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round"
                                         strokeMiterlimit="2" width="30" height="30" fill="red" viewBox="0 0 24 24"
                                         xmlns="http://www.w3.org/2000/svg">
                                    <path d="m12 5.72c-2.624-4.517-10-3.198-10 2.461 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-5.678-7.396-6.944-10-2.461z" fillRule="nonzero"/>
                                    </svg>
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-center my-4">There are no articles yet.</p>
                    )}
                </div>
                <Pagination pageNum={pageNum} setPageNum={setPageNum} lastPage={lastPage} />
            </div>

    );
};

export default Articles;