import React, { useRef } from 'react';
import { useAuth } from '../AuthContext';

const ResultEntry = () => {

    const isAuthenticated = useAuth();
    const effectRan = useRef(false);

    return (
        <div className="container">
            <h2 className="mb-4">{"Result Entry"}</h2>
            <p className='lead'>Placeholder for result entry.</p>   
        </div>
    );

};

export default ResultEntry;


