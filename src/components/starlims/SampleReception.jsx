import React, { useRef } from 'react';
import { useAuth } from '../AuthContext';

const SampleReception = () => {

    const isAuthenticated = useAuth();
    const effectRan = useRef(false);

    return (
        <div className="container">
            <h2 className="mb-4">{"Sample Reception"}</h2>
            <p className='lead'>Placeholder for Sample Reception.</p>   
        </div>
    );

};

export default SampleReception;


