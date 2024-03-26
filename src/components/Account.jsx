import React, { useEffect, useState } from 'react';
import Login from './Login';
import { useAuth } from './AuthContext';

const Account = () => {

    const isAuthenticated = useAuth();

    const renderAccount = () => {
        return (
            <div className="container">
                <h2>Account page</h2>
                <p>This section will allow users to update their account.</p>
            </div>
        );
    };

        return renderAccount();
}

export default Account;