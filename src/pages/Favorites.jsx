import React, {useEffect, useState} from 'react';
import ProcessPopup from "../components/popups/processPopup.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import {GetFavoriteRequest} from "../API/FavoriteApi.js";

const Favorites = () => {
    const [pageNum, setPageNum] = useState(1);
    const [isProcessPopupOpen, setProcessIsPopupOpen] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [lastPage, setLastPage] = useState(null);
    const [processState, setProcessState] = useState({
        processtype: null,
        text: "",
        acceptedText: "",
        id: null,
    });

    const toggleProcessPopup = (type, id, text, acceptedText) => {
        setProcessIsPopupOpen(!isProcessPopupOpen);
        setProcessState(prevState => ({
            ...prevState,
            processtype: type,
            text: text,
            acceptedText: acceptedText,
            id: id
        }));
    };

    const GetFavorites = async () => {
        const data = await GetFavoriteRequest(pageNum);
        setFavorites(data.data.data.items);
        setLastPage(data.data.totalPages)
    }

    useEffect(() => {
        GetFavorites();
        AOS.init({ duration: 1000 });
    }, []);

    useEffect(() => {
        GetFavorites();
    }, [refresh]);

    useEffect(() => {
        GetFavorites();
    }, [pageNum]);

    return (
            <div className="page-container container-fluid">
                <div className="row">
                    <div className="titles col-12 text-center mt-5" data-aos="fade-in">My Favorites</div>
                    <div className="col-12 px-5 mt-5 justify-content-center" data-aos="fade-in">
                        <table className="table table-striped table-dark text-center" style={{borderRadius: '10px',overflow: 'hidden'}} >
                            <thead>
                            <tr>
                                <th scope="col">Article Name</th>
                                <th scope="col">Note Count</th>
                                <th scope="col">Writer</th>
                                <th scope="col">Process</th>
                            </tr>
                            </thead>
                            <tbody>

                            {favorites.length > 0 ? (
                                favorites.map((favorite,index) => (
                                    <tr key={index}>
                                        <th scope="row">{favorite.articleName}</th>
                                        <td>{favorite.noteCount}</td>
                                        <td>{favorite.author}</td>
                                        <td>
                                            <div className="my-notes-process-flex">
                                                <a style={{background:'orange'}} href={`/article/${favorite.id}`} className="my-notes-process-see">
                                                    <svg clipRule="evenodd" fill="white" width="30" height="30" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.998 5c-4.078 0-7.742 3.093-9.853 6.483-.096.159-.145.338-.145.517s.048.358.144.517c2.112 3.39 5.776 6.483 9.854 6.483 4.143 0 7.796-3.09 9.864-6.493.092-.156.138-.332.138-.507s-.046-.351-.138-.507c-2.068-3.403-5.721-6.493-9.864-6.493zm.002 3c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4zm0 1.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5z" fillRule="nonzero"/></svg>
                                                </a>
                                                <button style={{background:'red'}} onClick={()=>toggleProcessPopup('article_favorite',favorite.id,"Are you sure you want to delete this article from your favorites list?","Transaction successful")} className="my-notes-process-bin">
                                                    <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" width="30" height="30" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m14.123 19.336c-.468.453-.944.913-1.426 1.381-.194.189-.446.283-.697.283s-.503-.094-.697-.283c-4.958-4.813-9.303-8.815-9.303-12.54 0-5.659 7.376-6.978 10-2.461 2.604-4.483 10-3.217 10 2.461 0 .68-.144 1.369-.41 2.07-1.061-1.02-2.503-1.648-4.089-1.648-3.257 0-5.9 2.644-5.9 5.9 0 2 .997 3.77 2.522 4.837zm3.377-9.336c2.484 0 4.5 2.016 4.5 4.5s-2.016 4.5-4.5 4.5-4.5-2.016-4.5-4.5 2.016-4.5 4.5-4.5zm.707 4.5s.642-.642 1.061-1.061c.187-.187.187-.519 0-.707-.188-.187-.52-.187-.707 0-.419.419-1.061 1.061-1.061 1.061s-.642-.642-1.061-1.061c-.187-.187-.519-.187-.707 0-.187.188-.187.52 0 .707.419.419 1.061 1.061 1.061 1.061s-.642.642-1.061 1.061c-.187.187-.187.519 0 .707.188.187.52.187.707 0 .419-.419 1.061-1.061 1.061-1.061s.642.642 1.061 1.061c.187.187.519.187.707 0 .187-.188.187-.52 0-.707-.419-.419-1.061-1.061-1.061-1.061z" fillRule="nonzero"/></svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-4">No favorites found.</td>
                                </tr>

                            )}

                            </tbody>
                        </table>


                        <div  className="my-notes-process-flex">
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
                            {lastPage >= pageNum && lastPage !== pageNum && (
                                <button onClick={()=>setPageNum(pageNum+1)} className="my-notes-process-see">
                                    <svg  fill="white" width="34" height="36" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m10.211 7.155c-.141-.108-.3-.157-.456-.157-.389 0-.755.306-.755.749v8.501c0 .445.367.75.755.75.157 0 .316-.05.457-.159 1.554-1.203 4.199-3.252 5.498-4.258.184-.142.29-.36.29-.592 0-.23-.107-.449-.291-.591-1.299-1.002-3.945-3.044-5.498-4.243z"/></svg>
                                </button>
                            )}


                        </div>
                    </div>
                </div>
                {isProcessPopupOpen && (
                    <ProcessPopup
                        onClose={(b) => {
                            if (b === false) setProcessIsPopupOpen(b);
                            setRefresh(!refresh);
                        }}
                        text={processState.text}
                        acceptedText={processState.acceptedText}
                        type={processState.processtype}
                        id={processState.id}
                    />
                )}
            </div>


    );
};

export default Favorites;