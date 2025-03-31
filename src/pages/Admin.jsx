import React, {useState} from 'react';
import Navbar from "../components/Navbar.jsx";
import ProcessPopup from "../components/popups/processPopup.jsx";

const Admin = () => {
    const [isProcessPopupOpen, setProcessIsPopupOpen] = useState(false);
    const [pageNumRole, setPageNumRole] = useState(1);
    const [pageNumUser, setPageNumUser] = useState(1);
    const [processtype, setProcesstype] = useState(null);
    const [text, setText] = useState("");
    const [acceptedText, setAcceptedText] = useState("");
    const [Id,setId] = useState("");

    const toggleProcessPopup = (type,id,text,acceptedText) => {
        setProcessIsPopupOpen(!isProcessPopupOpen);
        setText(text);
        setAcceptedText(acceptedText);
        setProcesstype(type);
        setId(id);
    };
    return (
        <div>
            <Navbar />
            <div className="page-container mb-5 container-fluid">
                <div className="row justify-content-between row-gap-5 popular-row ">

                    <div className="col-lg-6 col-12 px-3 mt-5 row justify-content-center" style={{height:'fit-content'}}>
                        <div className="titles text-center mb-3">Role Requests</div>
                        <table className="table table-striped table-dark text-center" style={{borderRadius: '10px',overflow: 'hidden'}} >
                            <thead>
                            <tr>
                                <th scope="col">Writer Name</th>
                                <th scope="col">File</th>
                                <th scope="col">Process</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th scope="row">Article 1</th>
                                <td>Alan Abel</td>
                                <td>
                                    <div className="my-notes-process-flex">
                                        <button className="my-notes-process-see" onClick={()=>toggleProcessPopup('role_Kabul',1,"Role talebi Kabul","işlem başarılı")} style={{background:'green'}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="24" height="24" viewBox="0 0 24 24"><path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"/></svg>
                                        </button>
                                        <button onClick={()=>toggleProcessPopup('role_reject',1,"Role talebi reddi","işlem başarılı")} className="my-notes-process-bin" style={{background:'red'}}>
                                            <svg xmlns="http://www.w3.org/2000/svg"  fill="white" width="24" height="24" viewBox="0 0 24 24"><path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z"/></svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            </tbody>
                        </table>

                        <div  className="my-notes-process-flex">
                            {pageNumRole > 1 && (
                                <button onClick={() => setPageNumRole(pageNumRole - 1)} className="my-notes-process-see">
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

                            <div className="my-notes-process-see text-center" style={{width:'40px',lineHeight:'40px'}}>{pageNumRole}</div>
                            <button onClick={()=>setPageNumRole(pageNumRole+1)} className="my-notes-process-see">
                                <svg  fill="white" width="34" height="36" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m10.211 7.155c-.141-.108-.3-.157-.456-.157-.389 0-.755.306-.755.749v8.501c0 .445.367.75.755.75.157 0 .316-.05.457-.159 1.554-1.203 4.199-3.252 5.498-4.258.184-.142.29-.36.29-.592 0-.23-.107-.449-.291-.591-1.299-1.002-3.945-3.044-5.498-4.243z"/></svg>
                            </button>
                        </div>
                    </div>



                    <div className="col-lg-6 col-12 px-3 mt-5 row justify-content-center" style={{height:'fit-content'}}>
                        <div className="titles text-center mb-3">users</div>
                        <table className="table table-striped table-dark text-center" style={{borderRadius: '10px',overflow: 'hidden'}} >
                            <thead>
                            <tr>
                                <th scope="col">Writer Name</th>
                                <th scope="col">File</th>
                                <th scope="col">Process</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th scope="row">Article 1</th>
                                <td>Alan Abel</td>
                                <td>
                                    <div className="my-notes-process-flex">
                                        <button  onClick={()=>toggleProcessPopup('delete_user',1,"user talebi reddi","user  işlem başarılı")} className="my-notes-process-bin px-3 py-1" style={{background:'red'}}>
                                            <svg xmlns="http://www.w3.org/2000/svg"  fill="white" width="24" height="24" viewBox="0 0 24 24"><path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z"/></svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            </tbody>
                        </table>

                        <div  className="my-notes-process-flex">
                            {pageNumUser > 1 && (
                                <button onClick={() => setPageNumUser(pageNumUser - 1)} className="my-notes-process-see">
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

                            <div className="my-notes-process-see text-center" style={{width:'40px',lineHeight:'40px'}}>{pageNumUser}</div>
                            <button onClick={()=>setPageNumUser(pageNumUser+1)} className="my-notes-process-see">
                                <svg  fill="white" width="34" height="36" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m10.211 7.155c-.141-.108-.3-.157-.456-.157-.389 0-.755.306-.755.749v8.501c0 .445.367.75.755.75.157 0 .316-.05.457-.159 1.554-1.203 4.199-3.252 5.498-4.258.184-.142.29-.36.29-.592 0-.23-.107-.449-.291-.591-1.299-1.002-3.945-3.044-5.498-4.243z"/></svg>
                            </button>
                        </div>
                    </div>


                    <div className="col-12 px-3 mt-5 row justify-content-center" style={{height:'fit-content'}}>
                        <div className="titles text-center mb-3">artIcles</div>
                        <table className="table table-striped table-dark text-center" style={{borderRadius: '10px',overflow: 'hidden'}} >
                            <thead>
                            <tr>
                                <th scope="col">Article Name</th>
                                <th scope="col">Writer Name</th>
                                <th scope="col">File</th>
                                <th scope="col">Process</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th scope="row">Article 1</th>
                                <th>Writer 1</th>
                                <td>Alan Abel</td>
                                <td>
                                    <div className="my-notes-process-flex">
                                        <button onClick={()=>toggleProcessPopup('article_delete',1,"article talebi reddi","article başarılı")} className="my-notes-process-bin px-3 py-1" style={{background:'red'}}>
                                            <svg xmlns="http://www.w3.org/2000/svg"  fill="white" width="24" height="24" viewBox="0 0 24 24"><path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z"/></svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>


                            </tbody>
                        </table>

                        <div  className="my-notes-process-flex">
                            {pageNumUser > 1 && (
                                <button onClick={() => setPageNumUser(pageNumUser - 1)} className="my-notes-process-see">
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

                            <div className="my-notes-process-see text-center" style={{width:'40px',lineHeight:'40px'}}>{pageNumUser}</div>
                            <button onClick={()=>setPageNumUser(pageNumUser+1)} className="my-notes-process-see">
                                <svg  fill="white" width="34" height="36" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m10.211 7.155c-.141-.108-.3-.157-.456-.157-.389 0-.755.306-.755.749v8.501c0 .445.367.75.755.75.157 0 .316-.05.457-.159 1.554-1.203 4.199-3.252 5.498-4.258.184-.142.29-.36.29-.592 0-.23-.107-.449-.291-.591-1.299-1.002-3.945-3.044-5.498-4.243z"/></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {isProcessPopupOpen && (
                <ProcessPopup
                    onClose={(b) => {
                        if (b === false) setProcessIsPopupOpen(b);
                    }}
                    text={text}
                    acceptedText={acceptedText}
                    type={processtype}
                    id={Id}
                />
            )}
        </div>
    );
};

export default Admin;