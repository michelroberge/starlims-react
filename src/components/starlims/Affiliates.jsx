import React, { useRef } from 'react';
import { useAuth } from '../AuthContext';

const Affiliates = () => {

    const isAuthenticated = useAuth();
    const effectRan = useRef(false);

    return (
        <div className="container">
            <h2 className="mb-4">{"Affiliates"}</h2>
        </div>
    );

};

export default Affiliates;


