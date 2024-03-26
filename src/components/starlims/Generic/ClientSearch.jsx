import React, { createContext, useState, useContext, useEffect } from 'react';
import DynamicTable from '../../core/DynamicTable';

const ClientSearchContext = createContext();

export const ClientSearchProvider = ({ children }) => {

    const [clientSearchOptions, setClientSearchOptions] = useState({clientType: 'applicant', isClientSearchVisible: false, selectCallback: null});

    const selectClient = () => {
        console.log(`searchProvider.selectClient`);
        if ( clientSearchOptions.selectCallback ) {
            clientSearchOptions.selectCallback(clientSearchOptions.clientType);
        }
        const newOptions = {
            clientType: clientSearchOptions.clientType,
            isClientSearchVisible: false,
            selectCallback: clientSearchOptions.selectCallback
        }
        setClientSearchOptions(newOptions);
    };

    return (
        <ClientSearchContext.Provider value={{ setClientSearchOptions }}>
            {children}

            {clientSearchOptions.isClientSearchVisible && (
                <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header text-center">
                                <h5 className="modal-title">Search {clientSearchOptions.clientType}</h5>
                                <button type="button" className="btn-close bg-danger" aria-label="Close" onClick={selectClient}></button>
                            </div>
                            <div className="modal-body">
                                {/* <DynamicTable></DynamicTable> */}
                                <p className='lead'>place holder for client search {clientSearchOptions.clientType}</p>
                                <button type='button' className='btn btn-primary' name='select' onClick={selectClient}>Select</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </ClientSearchContext.Provider>
    );
};

export const useClientSearch = () => useContext(ClientSearchContext);
