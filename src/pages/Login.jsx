import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./css/Login.css";

const Login = () => {
    const { type } = useParams();
    const [authType, setAuthType] = useState("in");
    const [file, setFile] = useState(null);

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        setFile(droppedFile);
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    useEffect(() => {
        if (type === "in" || type === "up" || type === "writer-up") {
            setAuthType(type);
        } else {
            setAuthType("in");
        }
    }, [type]);

    return (
        <div className="page-container">
            <div className="row p-0 m-0">
                <div className="col-lg-8 d-none d-lg-block p-0 m-0">
                    <img src="https://images.pexels.com/photos/1438190/pexels-photo-1438190.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                         className="img-fluid w-100"
                         style={{ height: "100vh", objectFit: "cover" }}
                         alt="Login Banner"
                    />
                </div>
                <div className="col-lg-4 col-12 p-0 m-0 row justify-content-center align-items-center" style={{ height: "100vh",position: "relative" }}>
                    {authType === "in" && (
                        <div className="col-12 login-flex text-center">
                            <h3>Log In</h3>
                            <input className="profile_inp" type="text" placeholder="Email Address" />
                            <input className="profile_inp" type="password" placeholder="Password" />
                            <button className="profile_btn">Sign In</button>
                            <button className="login-btn-switch" onClick={() => setAuthType("up")}>User Sign Up</button>
                        </div>
                    )}

                    {authType === "up" && (
                        <div className="col-12 login-flex text-center">
                            <h3>User Sign Up</h3>
                            <input className="profile_inp" type="text" placeholder="Username" />
                            <input className="profile_inp" type="text" placeholder="Email Address" />
                            <input className="profile_inp" type="password" placeholder="Password" />
                            <button className="profile_btn">Sign Up</button>
                            <button className="login-btn-switch" onClick={() => setAuthType("in")}>User Sign In</button>
                            <button className="login-btn-switch" onClick={() => setAuthType("writer-up")}>Writer Sign In</button>
                        </div>
                    )}

                    {authType === "writer-up" && (
                        <div className="col-12 login-flex text-center">
                            <h3>Writer Sign Up</h3>
                            <input className="profile_inp" type="text" placeholder="Pen Name" />
                            <input className="profile_inp" type="text" placeholder="Email Address" />
                            <input className="profile_inp" type="password" placeholder="Password" />
                            <div
                                className="dropzone"
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                                onClick={() => document.getElementById("fileInput").click()}
                            >
                                {file ? (
                                    <p className="dropzone-p">{file.name}</p>
                                ) : (
                                    <p className="dropzone-p">Drag your file here or click to select it</p>
                                )}
                                <input
                                    id="fileInput"
                                    type="file"
                                    onChange={handleFileChange}
                                    style={{ display: "none" }}
                                />
                            </div>
                            <button className="profile_btn">Sign Up</button>
                            <button className="login-btn-switch" onClick={() => setAuthType("in")}>User Sign In</button>
                        </div>
                    )}


                    <a href="/" className="login-home-btn"><svg xmlns="http://www.w3.org/2000/svg" fill="white" width="34" height="34" viewBox="0 0 24 24"><path d="M20 7.093v-5.093h-3v2.093l3 3zm4 5.907l-12-12-12 12h3v10h7v-5h4v5h7v-10h3zm-5 8h-3v-5h-8v5h-3v-10.26l7-6.912 7 6.99v10.182z"/></svg></a>

                </div>
            </div>
        </div>
    );
};

export default Login;