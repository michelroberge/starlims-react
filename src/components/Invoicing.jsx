import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const Invoicing = () => {

    const isAuthenticated = useAuth();

    const renderInvoicing = () => {
        return (
            <div className="container">
                <h2>Invoicing page</h2>
                <p>This section will allow administrators to manage invoicing & subscriptions.</p>
            </div>
        );
    };

        return renderInvoicing();
}

export default Invoicing;