import React, { useRef, useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import Spinner from '../core/Spinner';
import { useNavigate } from 'react-router-dom';
import FolderLoginNav from './FolderLogin-Components/FolderLoginNav';
import FolderLoginHeader from './FolderLogin-Components/FolderLoginHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { ClientSearchProvider } from './generic/ClientSearch';

const FolderLogin = () => {

    const isAuthenticated = useAuth();
    const navigate = useNavigate();

    const effectRan = useRef(false);
    const [jsonData, setJsonData] = useState(null); // State to store fetched JSON data
    const [loading, setLoading] = useState(true);

    const [isNavOpen, setIsNavOpen] = useState(true);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };


    useEffect(() => {
        // Function to fetch JSON data from API
        const fetchJsonData = async () => {
            try {
                // const data = await runAction("LABS.getSites", [], "DS");
                setLoading(false);
            } catch (error) {
                console.error('Error fetching JSON data:', error);
            }
        };

        // Call the fetchJsonData function when the component mounts
        if (!effectRan.current || import.meta.env.NODE_ENV !== "development") {
            effectRan.current = true;

            if (isAuthenticated) {
                fetchJsonData();
            }
            else {
                navigate('/login');
            }
        }

    }, []);

    return (
        <div className="container-fluid h-100">
            <div className="row h-100"> 
                <div id='drawer' className={`col-auto d-flex flex-column h-100 bg-primary${isNavOpen ? '' : ' col-0'} `}> {/* Left sidebar */}
                        <button className="btn btn-primary" onClick={toggleNav}>
                            <FontAwesomeIcon icon={faBars} />
                        </button>
                    <FolderLoginNav showLabels={isNavOpen} /> 

                </div>
                {
                    loading && <Spinner />
                }
                <div className="col flex-grow-1 border-start border-success border-5"> {/* Right content area */}
                    <ClientSearchProvider>
                        <FolderLoginHeader />
                    </ClientSearchProvider>
                </div>
            </div>
        </div>
    );
};

export default FolderLogin;


