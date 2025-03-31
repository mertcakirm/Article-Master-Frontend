import React from 'react';

const CommnetsPopup = ({onClose,id}) => {
    return (
        <div className="popup-overlay">
            <div className="popup-content comments-popup"  style={{color:'#fff'}} data-aos="zoom-in" >
                <button className="popup-close-btn" onClick={() => onClose(false)}>&times;</button>
                <div className="row justify-content-center align-items-center row-gap-3">
                    <div className="col-12 titles text-center">COMMENTS</div>
                    <div className="add-comments-part row row-gap-3 py-3 w-100" style={{borderBottom:'1px solid #fff'}}>
                        <textarea className="profile_inp" style={{height:'60px' ,resize:'none'}} placeholder="Write your comment"></textarea>
                        <button className="profile_btn">Send Comment</button>
                    </div>


                    <div className="comments-flex w-100">
                        <div className="comment-card w-100 row">
                            <img className="profile_photo_comment col-1  align-items-center"
                                 style={{aspectRatio:'1'}}
                                 src="https://image.hurimg.com/i/hurriyet/75/750x422/596730b4c03c0e32bc3e59a2.jpg"
                                 alt="profile_photo"/>
                            <div className="row col-11">
                                <div className="comment-name col-12">test</div>
                                <div className="comment-text col-12">dwadğondoawndopawndpoawndpoawndpowdaddwadğondoawndopawndpoawnddwadğondoawndopawndpoawndpoawndpowdaddwadğondoawndopawndpoawndpoawndpowdadawdawdawanwodnawodwadğondoawndopawndpoawndpoawndpowdadawdawdawanwodnawoawdawdawanwodnawopoawndpowdadawdawdawanwodnawodwadğondoawndopawndpoawndpoawndpowdadawdawdawanwodnawoawdawdawanwodnawo</div>
                            </div>
                        </div>

                        <div className="comment-card w-100 row">
                            <img className="profile_photo_comment col-1  align-items-center"
                                 style={{aspectRatio:'1'}}
                                 src="https://image.hurimg.com/i/hurriyet/75/750x422/596730b4c03c0e32bc3e59a2.jpg"
                                 alt="profile_photo"/>
                            <div className="row col-11">
                                <div className="comment-name col-12">test</div>
                                <div className="comment-text col-12">dwadğondoawndopawndpoawndpoawndpowdaddwadğondoawndopawndpoawnddwadğondoawndopawndpoawndpoawndpowdaddwadğondoawndopawndpoawndpoawndpowdadawdawdawanwodnawodwadğondoawndopawndpoawndpoawndpowdadawdawdawanwodnawoawdawdawanwodnawopoawndpowdadawdawdawanwodnawodwadğondoawndopawndpoawndpoawndpowdadawdawdawanwodnawoawdawdawanwodnawo</div>
                            </div>

                        </div>


                        <div className="comment-card w-100 row">
                            <img className="profile_photo_comment col-1  align-items-center"
                                 style={{aspectRatio:'1'}}
                                 src="https://image.hurimg.com/i/hurriyet/75/750x422/596730b4c03c0e32bc3e59a2.jpg"
                                 alt="profile_photo"/>
                            <div className="row col-11">
                                <div className="comment-name col-12">test</div>
                                <div className="comment-text col-12">dwadğondoawndopawndpoawndpoawndpowdaddwadğondoawndopawndpoawnddwadğondoawndopawndpoawndpoawndpowdaddwadğondoawndopawndpoawndpoawndpowdadawdawdawanwodnawodwadğondoawndopawndpoawndpoawndpowdadawdawdawanwodnawoawdawdawanwodnawopoawndpowdadawdawdawanwodnawodwadğondoawndopawndpoawndpoawndpowdadawdawdawanwodnawoawdawdawanwodnawo</div>
                            </div>

                        </div>

                        <div className="comment-card w-100 row">
                            <img className="profile_photo_comment col-1  align-items-center"
                                 style={{aspectRatio:'1'}}
                                 src="https://image.hurimg.com/i/hurriyet/75/750x422/596730b4c03c0e32bc3e59a2.jpg"
                                 alt="profile_photo"/>
                            <div className="row col-11">
                                <div className="comment-name col-12">test</div>
                                <div className="comment-text col-12">dwadğondoawndopawndpoawndpoawndpowdaddwadğondoawndopawndpoawnddwadğondoawndopawndpoawndpoawndpowdaddwadğondoawndopawndpoawndpoawndpowdadawdawdawanwodnawodwadğondoawndopawndpoawndpoawndpowdadawdawdawanwodnawoawdawdawanwodnawopoawndpowdadawdawdawanwodnawodwadğondoawndopawndpoawndpoawndpowdadawdawdawanwodnawoawdawdawanwodnawo</div>
                            </div>

                        </div>

                        <div className="comment-card w-100 row">
                            <img className="profile_photo_comment col-1  align-items-center"
                                 style={{aspectRatio:'1'}}
                                 src="https://image.hurimg.com/i/hurriyet/75/750x422/596730b4c03c0e32bc3e59a2.jpg"
                                 alt="profile_photo"/>
                            <div className="row col-11">
                                <div className="comment-name col-12">test</div>
                                <div className="comment-text col-12">dwadğondoawndopawndpoawndpoawndpowdaddwadğondoawndopawndpoawnddwadğondoawndopawndpoawndpoawndpowdaddwadğondoawndopawndpoawndpoawndpowdadawdawdawanwodnawodwadğondoawndopawndpoawndpoawndpowdadawdawdawanwodnawoawdawdawanwodnawopoawndpowdadawdawdawanwodnawodwadğondoawndopawndpoawndpoawndpowdadawdawdawanwodnawoawdawdawanwodnawo</div>
                            </div>

                        </div>
                        <div className="comment-card w-100 row">
                            <img className="profile_photo_comment col-1  align-items-center"
                                 style={{aspectRatio:'1'}}
                                 src="https://image.hurimg.com/i/hurriyet/75/750x422/596730b4c03c0e32bc3e59a2.jpg"
                                 alt="profile_photo"/>
                            <div className="row col-11">
                                <div className="comment-name col-12">test</div>
                                <div className="comment-text col-12">dwadğondoawndopawndpoawndpoawndpowdaddwadğondoawndopawndpoawnddwadğondoawndopawndpoawndpoawndpowdaddwadğondoawndopawndpoawndpoawndpowdadawdawdawanwodnawodwadğondoawndopawndpoawndpoawndpowdadawdawdawanwodnawoawdawdawanwodnawopoawndpowdadawdawdawanwodnawodwadğondoawndopawndpoawndpoawndpowdadawdawdawanwodnawoawdawdawanwodnawo</div>
                            </div>

                        </div>
                        <div className="comment-card w-100 row">
                            <img className="profile_photo_comment col-1  align-items-center"
                                 style={{aspectRatio:'1'}}
                                 src="https://image.hurimg.com/i/hurriyet/75/750x422/596730b4c03c0e32bc3e59a2.jpg"
                                 alt="profile_photo"/>
                            <div className="row col-11">
                                <div className="comment-name col-12">test</div>
                                <div className="comment-text col-12">dwadğondoawndopawndpoawndpoawndpowdaddwadğondoawndopawndpoawnddwadğondoawndopawndpoawndpoawndpowdaddwadğondoawndopawndpoawndpoawndpowdadawdawdawanwodnawodwadğondoawndopawndpoawndpoawndpowdadawdawdawanwodnawoawdawdawanwodnawopoawndpowdadawdawdawanwodnawodwadğondoawndopawndpoawndpoawndpowdadawdawdawanwodnawoawdawdawanwodnawo</div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default CommnetsPopup;