import React, { useState } from 'react';
import {AddCommentRequest} from "../../API/ArticleApi.js";

const CommentsPopup = ({ onClose, id }) => {
    const [newCommentData, setNewCommentData] = useState({
        content: "",
        rating: 1,
        articleId: id
    });
    const [comments, setComments] = useState([
        { id: 1, name: "User1", content: "Great article!", rating: 8 },
        { id: 2, name: "User2", content: "Not bad, but could be better.", rating: 6 }
    ]);

    const handleInputChange = (e) => {
        setNewCommentData({ ...newCommentData, content: e.target.value });
    };

    const handleRatingChange = (e) => {
        setNewCommentData({ ...newCommentData, rating: parseInt(e.target.value) });
    };

    const handleSendComment = async () => {
        if (newCommentData.content.trim() === "") return;

        try {
            await AddCommentRequest(newCommentData);
            setNewCommentData({ content: "", rating: 1, articleId: id });
        } catch (error) {
            console.error("Error while sending comment:", error.response?.data || error.message);
            alert("Yorum gönderilirken hata oluştu. Lütfen tekrar deneyin.");
        }
    };

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
                        {comments.map(comment => (
                            <div className="comment-card w-100 row" key={comment.id}>
                                <img
                                    className="profile_photo_comment col-1 align-items-center"
                                    style={{ aspectRatio: '1' }}
                                    src="https://image.hurimg.com/i/hurriyet/75/750x422/596730b4c03c0e32bc3e59a2.jpg"
                                    alt="profile_photo"
                                />
                                <div className="row col-11">
                                    <div className="comment-name col-12">{comment.name} - {comment.rating}/10</div>
                                    <div className="comment-text col-12">{comment.content}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentsPopup;
