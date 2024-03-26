import React, { useRef } from 'react';
import { useAuth } from '../AuthContext';

const FolderReport = () => {

    const isAuthenticated = useAuth();
    const effectRan = useRef(false);

    return (
        <div className="container">
            <h2 className="mb-4">{"Folder Reports"}</h2>
            <p className='lead'>Placeholder for folder reports.</p>   
        </div>
    );

};

export default FolderReport;


