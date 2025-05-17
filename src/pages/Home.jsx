import React, {useEffect, useState} from 'react';
import header from "../assets/editor-checking-words-journal-article-befor-publish_53876-31529.jpg.avif"
import './css/Home.css'
import {getCookie} from "../API/Cokkie.js";
import {GetPopularArticlesRequest} from "../API/ArticleApi.js";
import Loading from "../components/other/Loading.jsx";
import {PopularWriterGetAllRequest} from "../API/UserApi.js";
import {AddFavoriteRequest} from "../API/FavoriteApi.js";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
const Home = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [writers, setWriters] = useState([]);
    const token = getCookie("token")

    const GetArticles = async () => {
        try {
            const data = await GetPopularArticlesRequest()
            setArticles(data.data.data)
        }catch (error) {
            console.log(error);
            toast.error("Error while getting popular articles!");
        }finally {
            setLoading(false);
        }
    }

    const GetWriters = async () => {
        try {
            const data = await PopularWriterGetAllRequest();
            setWriters(data.data.data);
        }catch (error) {
            console.log(error);
            toast.error("Error while getting popular writers!");
        }finally {
            setLoading(false);
        }
    }


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


    useEffect(() => {
        GetArticles()
        GetWriters();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <div className="page-container p-0 container-fluid">
                <div className="row p-0 m-0 justify-content-center" style={{borderBottom: '3px solid /articles/1fff',position: 'relative'}}>
                    <img className="img-fluid w-100 p-0 m-0 header-img" data-aos="fade-in" src={header} alt="header_photo" />

                        {token? null:(
                            <div className="header-link-row justify-content-center align-items-center column-gap-3"  data-aos="fade-up">
                                <a className="up-writer-btn" href="/sign/writer-up">Sign up for writer</a>
                                <a className="up-user-btn" href="/sign/up">Sign up for user</a>
                            </div>
                        )
                        }


                </div>


                <div className="row row-gap-5 m-0  my-5 popular-row">
                    <div className="col-12 titles mb-4 text-center" data-aos="fade-up">Popular Articles</div>

                    {articles.length > 0 ? (
                        articles.map((article, index) => (
                            <div className="col-lg-3" data-aos="fade-up" key={index}>
                                <Link to={`/article/${article.id}`} className="article-card">
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

                                </Link>
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

                    <div className="col-12 mb-5 row justify-content-center" data-aos="fade-up">
                        <Link to="/articles" className="animation-btn">
                            <div className="btn animation-btn-child">
                                <span>Show All</span>
                            </div>
                        </Link>
                    </div>

                </div>


                <div className="row row-gap-5 m-0 my-5 popular-row justify-content-center  column-gap-5 align-items-center">
                    <div className="col-12 titles mb-4 text-center" data-aos="fade-up">Popular Writers</div>

                    {writers.length > 0 ? (
                        writers.map((writer,index) => (
                            <div key={index} className="col-lg-1 col-3" data-aos="fade-up">
                                <Link to={`/writer/${writer.id}`} className="writer-card">
                                    <img className="profile_photo"
                                         style={{aspectRatio:'1'}}
                                         src={
                                             writer.profilePhoto
                                                 ? (writer.profilePhoto.startsWith("data:image")
                                                     ? writer.profilePhoto
                                                     : `data:image/jpeg;base64,${writer.profilePhoto}`)
                                                 : "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg"
                                         }
                                         alt="profile_photo"/>
                                    <div className="small text-uppercase fw-bold">{writer.writerName}</div>
                                    <div className="my-notes-process-flex align-items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" fill="yellow" height="25"
                                             viewBox="0 0 24 24">
                                            <path
                                                d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
                                        </svg>
                                        <div>{Number.isInteger(writer.rating) ? writer.rating : writer.rating.toFixed(1)}/10</div>
                                    </div>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p className="text-center my-4">There are no writers yet.</p>
                    )}

                    <div className="col-12 mb-5 row justify-content-center" data-aos="fade-up">
                        <Link to="/writers" className="animation-btn">
                            <div className="btn animation-btn-child">
                                <span>Show All</span>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="row row-gap-5 m-0 my-5 popular-row">
                    <div className="col-12 titles mb-4 text-center" data-aos="fade-up">ABOUT ARTICLE MASTER</div>


                    <div className="about-text text-center" data-aos="fade-up">
                        <p>
                            <strong>Article Master</strong> is an innovative web platform developed to simplify access to information and transform how individuals interact with content. Our primary goal is not only for users to read articles but also to reflect deeply on the content, take notes, and personalize information for lasting learning.
                        </p>
                        <p>
                            In the modern age of information, reading habits are rapidly evolving. At Article Master, we not only keep up with this change but also aim to make the reading experience more <strong>interactive</strong>, <strong>personalized</strong>, and <strong>social</strong>.
                        </p>
                    </div>

                    <div className="col-12 mb-5 row justify-content-center" data-aos="fade-up">
                        <Link to="/about" className="animation-btn">
                            <div className="btn animation-btn-child">
                                <span>VISIT</span>
                            </div>
                        </Link>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Home;