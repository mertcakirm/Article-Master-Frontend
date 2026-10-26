import React, {useEffect, useState} from 'react';
import {GetUsersRequests} from "../../API/AdminApi.js";
import Pagination from "../other/Pagination.jsx";

const User = ({toggleProcessPopup, refresh, setRefresh}) => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [lastPage, setLastPage] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [searchTimeout, setSearchTimeout] = useState(null);

    const GetUsers = async () => {
        const userObj = await GetUsersRequests(pageNum, 5, search);
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

    const searchTextChanged = (searchStr) => {
        if (searchTimeout !== null) {
            clearTimeout(searchTimeout);
        }
        const newTimeout = setTimeout(() => {
            setSearch(searchStr);
            GetUsers();
        }, 800);
        setSearchTimeout(newTimeout);
    };

    return (
        <section className="admin-panel" data-aos="fade-up">
            <div className="admin-panel-head">
                <div className="admin-panel-heading">
                    <span className="admin-panel-kicker">COMMUNITY / 03</span>
                    <h2 className="admin-panel-title">Users</h2>
                    <p className="admin-panel-description">Find and manage reader accounts.</p>
                </div>
                <span className="admin-panel-count">{users.length} on page</span>
            </div>
            <div className="admin-panel-toolbar">
                <input
                    type="search"
                    className="admin-search"
                    aria-label="Search users"
                    onChange={(e) => searchTextChanged(e.target.value)}
                    placeholder="Search users..."
                />
            </div>
            <div className="admin-table-wrap">
            <table className="table table-striped table-dark text-center admin-table">
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
                            <th scope="row">{user.username}</th>
                            <td>{user.email}</td>
                            <td>
                                <div className="my-notes-process-flex">
                                    <button
                                        onClick={() => toggleProcessPopup('delete_user', user.id, "Should the user be deleted?", "Transaction successful")}
                                        className="admin-action admin-action-delete"
                                        aria-label={`Delete user ${user.username}`}
                                        title="Delete user"
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
                        <td colSpan="3" className="admin-empty-state">
                            There are no users yet.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
            </div>
            <div className="admin-pagination">
                <Pagination pageNum={pageNum} setPageNum={setPageNum} lastPage={lastPage}/>
            </div>
        </section>
    );
};

export default User;