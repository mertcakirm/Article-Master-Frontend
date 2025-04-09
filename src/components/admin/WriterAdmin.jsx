import React, { useEffect, useState } from 'react';
import { GetUsersRequests } from "../../API/AdminApi.js";
import {WriterGetAll} from "../../API/UserApi.js";

const WriterAdmin = ({ toggleProcessPopup, refresh, setRefresh }) => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [lastPageNum, setLastPageNum] = useState(null);
    const [pageNumUser, setPageNumUser] = useState(1);

    const GetUsers = async () => {
        const userObj = await WriterGetAll(pageNumUser, 5, search);
        setLastPageNum(userObj.data.data.totalPages);
        setUsers(userObj.data.data.items);
    };

    useEffect(() => {
        GetUsers();
    }, []);

    useEffect(() => {
        GetUsers();
    }, [pageNumUser]);

    useEffect(() => {
        GetUsers();
    }, [refresh]);


    return (
        <div className="col-lg-6 col-12 px-3 mt-5 row justify-content-center" data-aos="fade-up" style={{ height: 'fit-content' }}>
                <div className="titles text-center admin-title mb-3 col-12">WRITER</div>
            <table className="table table-striped col-12 table-dark text-center" style={{ borderRadius: '10px', overflow: 'hidden' }}>
                <thead>
                <tr>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Process</th>
                </tr>
                </thead>
                <tbody>
                {users.length > 0 ? (
                    users.map((user, index) => (
                        <tr key={index}>
                            <th scope="row">{user.writerName}</th>
                            <td>{user.rating}</td>
                            <td>
                                <div className="my-notes-process-flex">
                                    <button
                                        onClick={() => toggleProcessPopup('delete_user', user.id, "Should the user be deleted?", "Transaction successful")}
                                        className="my-notes-process-bin px-3 py-1"
                                        style={{ background: 'red' }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="24" height="24" viewBox="0 0 24 24">
                                            <path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z" />
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="3" className="text-center my-4">
                            There are no users yet.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>

            <div className="my-notes-process-flex">
                {pageNumUser > 1 && (
                    <button onClick={() => setPageNumUser(pageNumUser - 1)} className="my-notes-process-see">
                        <svg fill="white" width="34" height="36" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="m13.789 7.155c.141-.108.3-.157.456-.157.389 0 .755.306.755.749v8.501c0 .445-.367.75-.755.75-.157 0-.316-.05-.457-.159-1.554-1.203-4.199-3.252-5.498-4.258-.184-.142-.29-.36-.29-.592 0-.23.107-.449.291-.591 1.299-1.002 3.945-3.044 5.498-4.243z" />
                        </svg>
                    </button>
                )}
                <div className="my-notes-process-see text-center" style={{ width: '40px', lineHeight: '40px' }}>{pageNumUser}</div>
                {(lastPageNum !== pageNumUser && lastPageNum !== 0) && (
                    <button onClick={() => setPageNumUser(pageNumUser + 1)} className="my-notes-process-see">
                        <svg fill="white" width="34" height="36" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="m10.211 7.155c-.141-.108-.3-.157-.456-.157-.389 0-.755.306-.755.749v8.501c0 .445.367.75.755.75.157 0 .316-.05.457-.159 1.554-1.203 4.199-3.252 5.498-4.258.184-.142.29-.36.29-.592 0-.23-.107-.449-.291-.591-1.299-1.002-3.945-3.044-5.498-4.243z" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
};

export default WriterAdmin;