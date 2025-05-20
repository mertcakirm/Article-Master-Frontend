import RoleRequests from "../components/admin/RoleRequests.jsx";
import User from "../components/admin/User.jsx";
import ArticleAdmin from "../components/admin/ArticleAdmin.jsx";
import ProcessPopup from "../components/popups/processPopup.jsx";
import React, {useState} from "react";
import './css/Admin.css'
import WriterAdmin from "../components/admin/WriterAdmin.jsx";

const Admin = () => {
    const [refresh, setRefresh] = useState(false);
    const [isProcessPopupOpen, setProcessIsPopupOpen] = useState(false);
    const [processState, setProcessState] = useState({
        processtype: null,
        text: "",
        id: null,
    });

    const handleToggleProcessPopup = (type, id, text) => {
        setProcessIsPopupOpen(true);
        setProcessState({processtype: type, text, id});
    };

    return (
        <div className="page-container mb-5 container-fluid">
            <div className="row justify-content-between row-gap-5 popular-row">
                <RoleRequests
                    toggleProcessPopup={handleToggleProcessPopup}
                    refresh={refresh}
                    setRefresh={setRefresh}
                />

                <WriterAdmin
                    toggleProcessPopup={handleToggleProcessPopup}
                    refresh={refresh}
                    setRefresh={setRefresh}
                />

                <User
                    toggleProcessPopup={handleToggleProcessPopup}
                    refresh={refresh}
                    setRefresh={setRefresh}
                />

                <ArticleAdmin
                    toggleProcessPopup={handleToggleProcessPopup}
                    refresh={refresh}
                    setRefresh={setRefresh}
                />
            </div>
            {isProcessPopupOpen && (
                <ProcessPopup
                    onClose={(b) => {
                        if (b === false) {
                            setProcessIsPopupOpen(b);
                            setRefresh(!refresh);
                        }
                    }}
                    text={processState.text}
                    type={processState.processtype}
                    id={processState.id}
                />
            )}
        </div>

    );
};

export default Admin;