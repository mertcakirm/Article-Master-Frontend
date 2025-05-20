import React, {useEffect, useState} from 'react';
import {WriterGetAll} from "../../API/UserApi.js";
import Pagination from "../other/Pagination.jsx";

const WriterAdmin = ({toggleProcessPopup, refresh, setRefresh}) => {
    const [users, setUsers] = useState([]);
    const [lastPage, setLastPage] = useState(null);
    const [pageNum, setPageNum] = useState(1);

    const GetUsers = async () => {
        const userObj = await WriterGetAll(pageNum, 5);
        setLastPage(userObj.data.data.totalPages);
        setUsers(userObj.data.data.items);
    };

    useEffect(() => {
        GetUsers();
    }, []);

    useEffect(() => {
        GetUsers();
    }, [pageNum]);

    useEffect(() => {
        GetUsers();
    }, [refresh]);

    return (
        <div className="col-lg-6 col-12 px-3 mt-5 row justify-content-center" data-aos="fade-up"
             style={{height: 'fit-content'}}>
            <div className="titles text-center mb-3 col-12">WRITERS</div>
            <table className="table table-striped col-12 table-dark text-center" style={{borderRadius: '10px', overflow: 'hidden'}}>
                <thead>
                <tr>
                    <th scope="col">Writer Name</th>
                    <th scope="col">Rating</th>
                    <th scope="col">Process</th>
                </tr>
                </thead>
                <tbody>
                {users.length > 0 ? (
                    users.map((user, index) => (
                        <tr key={index}>
                            <th scope="row">{user.writerName}</th>
                            <td>{Number.isInteger(user.rating) ? user.rating : user.rating.toFixed(1)}/10</td>
                            <td>
                                <div className="my-notes-process-flex">
                                    <button
                                        onClick={() => toggleProcessPopup('delete_user', user.id, "Should the user be deleted?", "Transaction successful")}
                                        className="my-notes-process-bin px-3 py-1"
                                        style={{background: 'red'}}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="24" height="24"
                                             viewBox="0 0 24 24">
                                            <path
                                                d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z"/>
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
            <Pagination pageNum={pageNum} setPageNum={setPageNum} lastPage={lastPage}/>
        </div>
    );
};

export default WriterAdmin;