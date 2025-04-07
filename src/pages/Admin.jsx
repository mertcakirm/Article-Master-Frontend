import Navbar from "../components/Navbar.jsx";
import RoleRequests from "../components/admin/RoleRequests.jsx";
import User from "../components/admin/User.jsx";
import ArticleAdmin from "../components/admin/ArticleAdmin.jsx";
import ProcessPopup from "../components/popups/processPopup.jsx";
import React , { useState } from "react";

const Admin = () => {
    const [refresh, setRefresh] = useState(false);
    const [isProcessPopupOpen, setProcessIsPopupOpen] = useState(false);
    const [processState, setProcessState] = useState({
        processtype: null,
        text: "",
        acceptedText: "",
        id: null,
    });

    return (
        <div>
            <Navbar />
            <div className="page-container mb-5 container-fluid">
                <div className="row justify-content-between row-gap-5 popular-row">
                    <RoleRequests
                        toggleProcessPopup={(type, id, text, acceptedText) => {
                            setProcessIsPopupOpen(true);
                            setProcessState({
                                processtype: type,
                                text: text,
                                acceptedText: acceptedText,
                                id: id
                            });
                        }}
                        refresh={refresh}
                        setRefresh={setRefresh}
                    />
                    <User
                        toggleProcessPopup={(type, id, text, acceptedText) => {
                        setProcessIsPopupOpen(true);
                        setProcessState({
                            processtype: type,
                            text: text,
                            acceptedText: acceptedText,
                            id: id
                        });
                    }}
                        refresh={refresh}
                        setRefresh={setRefresh}
                    />
                    <ArticleAdmin
                        toggleProcessPopup={(type, id, text, acceptedText) => {
                            setProcessIsPopupOpen(true);
                            setProcessState({
                                processtype: type,
                                text: text,
                                acceptedText: acceptedText,
                                id: id
                            });
                        }}
                        refresh={refresh}
                        setRefresh={setRefresh}
                    />
                </div>
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
                    acceptedText={processState.acceptedText}
                    type={processState.processtype}
                    id={processState.id}
                />
            )}
        </div>
    );
};

export default Admin;