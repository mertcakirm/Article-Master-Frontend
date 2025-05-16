import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./css/Login.css";
import {LoginRequest, SignRequest, WriterSignRequest} from "../API/AuthApi.js";
import AOS from "aos";
import "aos/dist/aos.css";
import {convertToBase64} from "../Helper/ConverterBase64.js";
import { ToastContainer, toast } from 'react-toastify';


const Login = () => {
    const { type } = useParams();
    const [authType, setAuthType] = useState("in");

    const [loginObj, setLoginObj] = useState({
        email: "",
        password: ""
    });

    const [signObj, setSignObj] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [writerObj, setWriterObj] = useState({
        username: "",
        email: "",
        password: "",
        pdfBase64: ""
    });

    const handleInputChange = (event, setState) => {
        const { name, value } = event.target;
        setState(prevState => ({ ...prevState, [name]: value }));
    };

    const handleFileChange = async (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            try {
                const base64String = await convertToBase64(selectedFile);
                setWriterObj(prev => ({ ...prev, pdfBase64: base64String }));
            } catch (error) {
                console.error("File conversion error:", error);
            }
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = async (event) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        if (droppedFile) {
            try {
                const base64String = await convertToBase64(droppedFile);
                setWriterObj(prev => ({ ...prev, pdfBase64: base64String }));
            } catch (error) {
                console.error("File conversion error:", error);
            }
        }
    };
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);


    useEffect(() => {
        if (["in", "up", "writer-up"].includes(type)) {
            setAuthType(type);
        } else {
            setAuthType("in");
        }
    }, [type]);

    const handleLogin = async () => {
        if (!loginObj.email || !loginObj.password) {
            toast.error("Please fill in all fields.");
            return;
        }
        try {
            await LoginRequest(loginObj);
            window.location.href = "/";
        } catch (error) {
            const errorMessage = error?.response?.data?.errorMessage || "Login failed.";
            toast.error(errorMessage || "Login failed.");

        }
    };

    const handleSignUp = async () => {
        if (!signObj.username || !signObj.email || !signObj.password) {
            toast.error("Please fill in all fields.");
            return;
        }
        try {
            await SignRequest(signObj);
            window.location.href = "/sign/in";
        } catch (error) {
            const errorMessage = error?.response?.data?.errorMessage || "Registration failed.";
            toast.error(errorMessage || "Registration failed.");
        }
    };

    const handleWriterSignIn = async () => {
        if (!writerObj.username || !writerObj.email || !writerObj.password || !writerObj.pdfBase64) {
            toast.error("Please fill in all fields and upload the file.");
            return;
        }
        try {
            await WriterSignRequest(writerObj);
            window.location.href = "/sign/in";
        } catch (error) {
            const errorMessage = error?.response?.data?.errorMessage || "Writer registration failed.";
            toast.error(errorMessage || "Writer registration failed.");
        }
    };
    return (
        <div className="page-container">
            <div className="row p-0 m-0">

                <div className="col-lg-8 d-none d-lg-block p-0 m-0" data-aos="fade-in">
                    <img src="https://images.pexels.com/photos/1438190/pexels-photo-1438190.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                         className="img-fluid w-100"
                         style={{ height: "100vh", objectFit: "cover" }}
                         alt="Login Banner"
                    />
                </div>

                <div className="col-lg-4 col-12 p-0 m-0 row justify-content-center align-items-center" data-aos="fade-in" style={{ height: "100vh",position: "relative" }}>
                    {authType === "in" && (
                        <div className="col-12 login-flex text-center">
                            <h3>Log In</h3>
                            <input
                                className="profile_inp"
                                type="text"
                                name="email"
                                placeholder="Email Address"
                                value={loginObj.email}
                                onChange={(e) => handleInputChange(e, setLoginObj)}
                            />
                            <input
                                className="profile_inp"
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={loginObj.password}
                                onChange={(e) => handleInputChange(e, setLoginObj)}
                            />
                            <button className="profile_btn" onClick={handleLogin}>Sign In</button>
                            <button className="login-btn-switch" onClick={() => setAuthType("up")}>User Sign Up</button>
                        </div>
                    )}

                    {authType === "up" && (
                        <div className="col-12 login-flex text-center">
                            <h3>User Sign Up</h3>
                            <input
                                className="profile_inp"
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={signObj.username}
                                onChange={(e) => handleInputChange(e, setSignObj)}
                            />
                            <input
                                className="profile_inp"
                                type="text"
                                name="email"
                                placeholder="Email Address"
                                value={signObj.email}
                                onChange={(e) => handleInputChange(e, setSignObj)}
                            />
                            <input
                                className="profile_inp"
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={signObj.password}
                                onChange={(e) => handleInputChange(e, setSignObj)}
                            />
                            <button className="profile_btn" onClick={handleSignUp}>Sign Up</button>
                            <button className="login-btn-switch" onClick={() => setAuthType("in")}>Log In</button>
                            <button className="login-btn-switch" onClick={() => setAuthType("writer-up")}>Writer Sign Up</button>
                        </div>
                    )}

                    {authType === "writer-up" && (
                        <div className="col-12 login-flex text-center">
                            <h3>Writer Sign Up</h3>
                            <input
                                className="profile_inp"
                                type="text"
                                name="username"
                                placeholder="Pen Name"
                                value={writerObj.username}
                                onChange={(e) => handleInputChange(e, setWriterObj)}
                            />
                            <input
                                className="profile_inp"
                                type="text"
                                name="email"
                                placeholder="Email Address"
                                value={writerObj.email}
                                onChange={(e) => handleInputChange(e, setWriterObj)}
                            />
                            <input
                                className="profile_inp"
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={writerObj.password}
                                onChange={(e) => handleInputChange(e, setWriterObj)}
                            />
                            <div
                                className="dropzone"
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                                onClick={() => document.getElementById("fileInput").click()}
                            >
                                {writerObj.file ? (
                                    <p className="dropzone-p">File uploaded</p>
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
                            <button className="profile_btn" onClick={handleWriterSignIn}>Sign Up</button>
                            <button className="login-btn-switch" onClick={() => setAuthType("in")}>Log In</button>
                        </div>
                    )}


                    <a href="/" className="login-home-btn"><svg xmlns="http://www.w3.org/2000/svg" fill="white" width="34" height="34" viewBox="0 0 24 24"><path d="M20 7.093v-5.093h-3v2.093l3 3zm4 5.907l-12-12-12 12h3v10h7v-5h4v5h7v-10h3zm-5 8h-3v-5h-8v5h-3v-10.26l7-6.912 7 6.99v10.182z"/></svg></a>

                </div>
            </div>
        </div>
    );
};

export default Login;