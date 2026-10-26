import React from 'react';

const Loading = () => {
    return (
        <div className="app-loading row justify-content-center align-items-center w-100 m-0 p-0">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>

    );
};

export default Loading;