import React, { useRef, useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import DynamicTable from '../core/DynamicTable';
import {runAction} from '../../services/Starlims';
import { json, useNavigate } from 'react-router-dom';
import { useWaitIndicator } from '../../context/WaitIndicatorContext';

const Labs = () => {

    const isAuthenticated = useAuth();
    const navigate = useNavigate();
    const { setWaitStatus } = useWaitIndicator();


    const effectRan = useRef(false);
    const [jsonData, setJsonData] = useState(null); // State to store fetched JSON data
    const [reload, setReload] = useState(true);

    const fieldList = [
        { FieldName: "DEPTCODE", Caption: "Code", ReadOnly: true },
        { FieldName: "DEPT", Caption: "Lab", ReadOnly: true },
        { FieldName: "INSTANCE_NAME", Caption: "Instance Name", ReadOnly: false },
        { FieldName: "SHARESDB", Caption: "Type", ReadOnly: false },
    ];

    useEffect(() => {
        // Function to fetch JSON data from API
        const fetchJsonData = async () => {
            try {
                setWaitStatus({ waiting: true, caption: "Loading..." });

                const data = await runAction("LABS.getSites", [], "DS");
                setJsonData(data);
            } catch (error) {
                console.error('Error fetching JSON data:', error);
            }
            finally {
                setTimeout(() => {
                    setWaitStatus({ waiting: false, message: "Loading..." });
                }
                    , 1000);
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

    }, [jsonData]); // if jsonData is changed for whatever reason, update UI

    const handleDataUpdate = (updatedData) => {
        setJsonData(updatedData);
    }

    return (
        <div className="container">
            <h2 className="mb-4">{"Laboratories"}</h2>
            <DynamicTable jsonData={jsonData} fieldList={fieldList} table='DEPARTMENTS' idfield='ORIGREC' onDataUpdate={handleDataUpdate} />
        </div>
    );

};

export default Labs;


