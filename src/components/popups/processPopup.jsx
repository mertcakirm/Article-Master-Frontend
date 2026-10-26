import '../css/accepted.css';
import AOS from "aos";
import "aos/dist/aos.css";
import {useEffect} from "react";
import {ApproveRequest, DeleteUsersRequest, RejectRoleRequest} from "../../API/AdminApi.js";
import {DeleteArticleRequest} from "../../API/ArticleApi.js";
import {AddFavoriteRequest} from "../../API/FavoriteApi.js";
import {DeleteFolderRequest, DeleteNoteRequest, DeleteNotesRequest} from "../../API/NoteApi.js";
import {toast} from 'react-toastify';

const ProcessPopup = ({type, text, id, onClose,}) => {

    const HandleSubmit = async () => {
        try {
            switch (type) {
                case "approve_user":
                    await ApproveRequest(id);
                    toast.success("Role request has been approved.");
                    break;
                case "role_reject":
                    await RejectRoleRequest(id);
                    toast.success("Role request has been rejected.");
                    break;
                case "delete_article":
                    await DeleteArticleRequest(id);
                    toast.success("Article deleted successfully.");
                    break;
                case "delete_user":
                    await DeleteUsersRequest(id);
                    toast.success("User deleted successfully.");
                    break;
                case "note_delete":
                    await DeleteNoteRequest(id);
                    toast.success("Note deleted successfully.");
                    break;
                case "folder_delete":
                    await DeleteFolderRequest(id);
                    toast.success("Folder deleted successfully.");
                    break;
                case "article_favorite": {
                    const FavoriteObj = {
                        articleId: id,
                    };
                    await AddFavoriteRequest(FavoriteObj);
                    toast.success("Article added to favorites.");
                    break;
                }
                default:
                    toast.error("Unknown action type.");
                    console.error("Unknown type");
                    return;
            }
            onClose(false);
        } catch (error) {
            console.error("An error occurred during the process:", error);
            toast.error("An error occurred while processing your request.");
            onClose(false);
        }
    };

    useEffect(() => {
        AOS.init({duration: 500});
    }, []);

    return (
        <div className="popup-overlay">
            <div className="popup-content process-popup" data-aos="zoom-in">
                <p className="process-popup-message">{text}</p>
                <div className="delete-popup-buttons">
                    <button
                        type="button"
                        className="process-popup-button process-popup-cancel"
                        onClick={() => onClose(false)}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="process-popup-button process-popup-confirm"
                        onClick={HandleSubmit}
                    >
                        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                            <path d="m5 12 4.5 4.5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProcessPopup;
