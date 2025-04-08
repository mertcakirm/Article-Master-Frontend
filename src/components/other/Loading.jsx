import React from 'react';

const Loading = () => {
    return (
        <div className="row justify-content-center align-items-center w-100" style={{ height: "100vh",background:'#1c1c1c'}} >
            <div className="spinner-border text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>

    );
};

export default Loading;