import React, {useEffect, useState} from 'react';
import {GetWritersDocumentRequest, WriterGetAllRequest} from "../../API/AdminApi.js";


const RoleRequests = ({ toggleProcessPopup, refresh, setRefresh }) => {
    const [writers, setWriters] = useState([]);
    const [pageNum, setPageNum] = useState(1);
    const [lastPageNum, setLastPageNum] = useState(null);

    const GetWriters = async () => {
        const writersObj = await WriterGetAllRequest(pageNum, 5);
        setLastPageNum(writersObj.data.data.totalPages);
        console.log(writersObj.data.data.totalPages)
        setWriters(writersObj.data.data.items);
    }

    useEffect(() => {
        GetWriters();
        console.log(pageNum)
    }, [refresh, pageNum]);

    const DownloadwriterDoc = async (id) => {
        try {
            const response = await GetWritersDocumentRequest(id);
            const base64Data = response.data.data.base64Pdf;
            if (!base64Data) return;
            const byteCharacters = atob(base64Data);
            const byteNumbers = new Uint8Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const blob = new Blob([byteNumbers], { type: "application/pdf" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `writer_document_${id}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Dosya indirilirken hata oluştu:", error);
        }
    };

    return (
        <div className="col-lg-6 col-12 px-3 mt-5 row justify-content-center" data-aos="fade-up" style={{ height: 'fit-content' }}>
            <div className="titles text-center mb-3">Role Requests</div>
            <table className="table table-striped table-dark text-center">
                <thead>
                <tr>
                    <th>Writer Name</th>
                    <th>File</th>
                    <th>Process</th>
                </tr>
                </thead>
                <tbody>
                {writers.length > 0 ? (
                    writers.map((writer, index) => (
                        <tr key={index}>
                            <td>{writer.name}</td>
                            <td className="row justify-content-center">
                                <button onClick={() => DownloadwriterDoc(writer.id)} className="my-notes-process-see w-auto px-3">
                                    <svg width="24" height="24" fill="white" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
                                        <path d="M22 0h-20v24h14l6-6v-18zm-6 18h4.36l-4.36 4.385v-4.385zm-3 1h-8v1h8v-1zm0-3h-8v1h8v-1zm6-2v-1h-14v1h14zm-7.059-4.968c-1.147-.265-2.214-.497-1.697-1.473 1.573-2.97.417-4.559-1.244-4.559-1.694 0-2.821 1.65-1.244 4.559.532.982-.575 1.214-1.697 1.473-1.024.237-1.062.745-1.059 1.635l.001.333h7.997l.001-.323c.004-.896-.03-1.407-1.058-1.645zm7.059.968h-4v1h4v-1zm0-2v-1h-4v1h4zm0-4h-4v1h4v-1z" />
                                    </svg>
                                </button>
                            </td>
                            <td>
                                <div className="my-notes-process-flex">
                                    <button
                                        className="my-notes-process-see"
                                        onClick={() => toggleProcessPopup("approve_user", writer.id, "Accept role request?", "Transaction successful")}
                                        style={{ background: "green" }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="24" height="24" viewBox="0 0 24 24">
                                            <path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => toggleProcessPopup("role_reject", writer.id, "Reject role request?", "Transaction successful")}
                                        className="my-notes-process-bin"
                                        style={{ background: "red" }}
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
                        <td colSpan="3">There are no writers yet.</td>
                    </tr>
                )}
                </tbody>
            </table>
            <div className="my-notes-process-flex">
                {pageNum > 1 && (
                    <button onClick={() => setPageNum(pageNum - 1)} className="my-notes-process-see">
                        <svg fill="white" width="34" height="36" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="m13.789 7.155c.141-.108.3-.157.456-.157.389 0 .755.306.755.749v8.501c0 .445-.367.75-.755.75-.157 0-.316-.05-.457-.159-1.554-1.203-4.199-3.252-5.498-4.258-.184-.142-.29-.36-.29-.592 0-.23.107-.449.291-.591 1.299-1.002 3.945-3.044 5.498-4.243z" />
                        </svg>
                    </button>
                )}
                <div className="my-notes-process-see text-center" style={{ width: '40px', lineHeight: '40px' }}>{pageNum}</div>
                {(lastPageNum !== pageNum && lastPageNum !== 0) && (
                    <button onClick={() => setPageNum(pageNum + 1)} className="my-notes-process-see">
                        <svg fill="white" width="34" height="36" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="m10.211 7.155c-.141-.108-.3-.157-.456-.157-.389 0-.755.306-.755.749v8.501c0 .445.367.75.755.75.157 0 .316-.05.457-.159 1.554-1.203 4.199-3.252 5.498-4.258.184-.142.29-.36.29-.592 0-.23-.107-.449-.291-.591-1.299-1.002-3.945-3.044-5.498-4.243z" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
};

export default RoleRequests;