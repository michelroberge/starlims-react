import React, { useRef, useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import DynamicTable from '../core/DynamicTable';
import { runAction } from '../../services/Starlims';
import { json, useNavigate } from 'react-router-dom';
import { useWaitIndicator } from '../../context/WaitIndicatorContext';

const FolderList = () => {

    const isAuthenticated = useAuth();
    const navigate = useNavigate();
    const { setWaitStatus } = useWaitIndicator();


    const effectRan = useRef(false);
    const [jsonData, setJsonData] = useState(null); // State to store fetched JSON data
    const [reload, setReload] = useState(true);
    const [paging, setPaging] = useState({ start: 0, page: 1, limit: 20 });
    const [totalRecords, setTotalRecords] = useState(0);

    const fieldList = [
        { FieldName: "FOLDERNO", Caption: "Folder #", ReadOnly: true },
        { FieldName: "DRAWDATE", Caption: "Created Date", ReadOnly: true },
        { FieldName: "FOLDERNAME", Caption: "Description", ReadOnly: true },
        { FieldName: "SUBMIT_COMPNAME", Caption: "Applicant", ReadOnly: true },
        { FieldName: "BUYER_CLIENT", Caption: "Buyer", ReadOnly: true },
        { FieldName: "DISPSTS", Caption: "Status", ReadOnly: true },
        { FieldName: "ASSIGNED_TO", Caption: "Assigned To", ReadOnly: true },
        { FieldName: "DUEDATE", Caption: "Due Date", ReadOnly: true },
    ];

    useEffect(() => {
        // Function to fetch JSON data from API
        const fetchJsonData = async () => {
            try {
                setWaitStatus({ waiting: true, caption: "Loading..." });

                const respData = await runAction("FolderListHtml.getFolders", ["", null, paging], "script");
                if (respData && respData.data) {
                    // the getFolders script is built to return JSON in text format. Just parse it to use it as another datasource.
                    respData.data = JSON.parse(respData.data);
                    setTotalRecords(respData.data.total);
                    setJsonData(respData);
                }
            } catch (error) {
                console.error('Error fetching JSON data:', error);
            }
            finally {
                setTimeout(() => {
                    setWaitStatus({ waiting: false, message: "Loading..." });
                }, 500);
            }
        };

        // Call the fetchJsonData function when the component mounts
        if (!effectRan.current || import.meta.env.NODE_ENV !== "development") {
            effectRan.current = true;

            if (!isAuthenticated) {
                navigate('/login');
            }
            else if (reload) {
                //  reload only when flag set to true
                setReload(false);
                fetchJsonData();
            }
        }

    }, [jsonData, paging]); // if jsonData is changed for whatever reason, update UI

    // Function to handle page change
    const handlePageChange = (page) => {
        setReload(true);
        setPaging({ ...paging, start: (page - 1) * paging.limit, page });
    };

    const handleDataUpdate = (updatedData) => {
        setJsonData(updatedData);
    };

    return (
        <div className="container">
            <h2 className="mb-4">{"Folders"}</h2>
            <DynamicTable jsonData={jsonData} fieldList={fieldList} table='DEPARTMENTS' idfield='ORIGREC' onDataUpdate={handleDataUpdate} allowEdit={false} selectable={false} />
            <nav aria-label="Page navigation">
                <ul className="pagination">
                    {[...Array(Math.ceil(totalRecords / paging.limit)).keys()].map((page) => (
                        <li key={page + 1} className={`page-item ${page + 1 === paging.page ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(page + 1)}>{page + 1}</button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );

};

export default FolderList;


