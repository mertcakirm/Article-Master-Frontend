import React, {useEffect, useState} from 'react';
import {AddCommentRequest, GetAllCommentsRequest} from "../../API/ArticleApi.js";
import {getCookie} from '../../API/Cokkie.js'

const CommentsPopup = ({ onClose, id }) => {
    const [comments, setComments] = useState([]);
    const [refresh, setRefresh] = useState(true);
    const [newCommentData, setNewCommentData] = useState({
        content: "",
        rating: 1,
        articleId: id
    });
    const token = getCookie("token")

    const handleInputChange = (e) => {
        setNewCommentData({ ...newCommentData, content: e.target.value });
    };

    const handleRatingChange = (e) => {
        setNewCommentData({ ...newCommentData, rating: parseInt(e.target.value) });
    };

    const handleSendComment = async () => {
        if (newCommentData.content.trim() === "") return;
        if (!token){
            window.location.href = "/sign/in";
        }
        try {
            await AddCommentRequest(newCommentData);
            setNewCommentData({ content: "", rating: 1, articleId: id });
            setRefresh(!refresh);
        } catch (error) {
            console.error("Error while sending comment:", error.response?.data || error.message);
        }
    };

    const GetAllComment=async ()=>{
        const CommentsObj = await GetAllCommentsRequest(id)
        const CommentsObjFiltered = CommentsObj.data.data
        setComments(CommentsObjFiltered.items);
    };

    useEffect(() => {
        GetAllComment()
    }, []);

    useEffect(() => {
        GetAllComment()
    }, [refresh]);

    return (
        <div className="popup-overlay">
            <div className="popup-content comments-popup" style={{ color: '#fff' }} data-aos="zoom-in">
                <button className="popup-close-btn" onClick={() => onClose(false)}>&times;</button>
                <div className="row justify-content-center align-items-center row-gap-3">
                    <div className="col-12 titles text-center">COMMENTS</div>

                    <div className="add-comments-part row justify-content-between row-gap-3 py-3 w-100" style={{ borderBottom: '1px solid #fff' }}>
                        <textarea
                            className="profile_inp col-10"
                            style={{ height: '60px', resize: 'none' }}
                            placeholder="Write your comment"
                            value={newCommentData.content}
                            onChange={handleInputChange}
                        ></textarea>
                        <select
                            className="col-3 form-select w-auto"
                            style={{ color: '#fff', background: '#212121' }}
                            value={newCommentData.rating}
                            onChange={handleRatingChange}
                        >
                            <option value="1" >Select Point</option>

                            {[...Array(10).keys()].map(num => (
                                <option key={num + 1} value={num + 1}>{num + 1}</option>
                            ))}
                        </select>
                        <button className="profile_btn" onClick={handleSendComment}>Send Comment</button>
                    </div>

                    <div className="comments-flex w-100">

                        {Array.isArray(comments) && comments.length > 0 ? (
                            comments.map(comment => (
                                <div className="comment-card w-100 row" key={comment.id}>
                                    <img
                                        className="profile_photo_comment col-1 align-items-center p-0"
                                        style={{ aspectRatio: '1' }}
                                        src={comment.photoBase64 || "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg"}
                                        alt="profile_photo"
                                    />
                                    <div className="row col-11">
                                        <div className="comment-name col-12 row justify-content-between align-items-center">
                                            <div className="col-6">{comment.author}</div>
                                            <div className="col-6 text-end">
                                                {comment.rating}/10
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" fill="yellow" height="20" viewBox="0 0 24 24">
                                                    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="comment-text col-12">{comment.content}</div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center">No comments yet</p>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentsPopup;
