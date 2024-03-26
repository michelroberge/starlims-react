import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const UserLabProfile = ({ onSiteChange, onRoleChange, onLangChange }) => {
    const [sites, setSites] = useState([]);
    const [roles, setRoles] = useState([]);
    const [langs, setLangs] = useState([]);

    // Simulate loading data (replace with your actual API calls)
    useEffect(() => {
        const fetchSites = async () => {
            //   const response = await fetch('/api/sites');
            //   const data = await response.json();
            const data = [
                { id: 1, name: "Dhaka" },
                { id: 2, name: "Changzhou" },
                { id: 3, name: "Varna" },
            ]
            setSites(data);
        };

        const fetchRoles = async () => {
            //   const response = await fetch('/api/roles');
            //   const data = await response.json();

            const data = [
                { id: "L", name: "Lims_Admin" },
                { id: "A", name: "Analyst" },
            ]

            setRoles(data);
        };

        const fetchLanguages = async () => {
            //   const response = await fetch('/api/roles');
            //   const data = await response.json();
        
            const data = [
                {id: "ENG", name: "English"},
                {id: "FRE", name: "French"},
            ]
        
              setLangs(data);
            };

        fetchSites();
        fetchRoles();
        fetchLanguages();
    }, []);

    return (
        <li className="nav-item dropdown mx-4 dropstart">
            <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenu"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
            >
                 <FontAwesomeIcon icon={faUser} />
            </a>
            <ul className="dropdown-menu bg-primary" aria-labelledby="navbarDropdownMenu">
                <li className='d-flex justify-content-center align-items-center'>
                    <span className='lead text-light'>User Profile</span>
                    <hr />
                </li>
                <li className='m-2'>
                    <select
                        id="siteSelect"
                        className="form-select"
                        onChange={(e) => onSiteChange(e.target.value)}
                    >
                        <option value="">Select Site</option>
                        {sites.map((site) => (
                            <option key={site.id} value={site.id}>
                                {site.name}
                            </option>
                        ))}
                    </select>
                </li>
                <li className='m-2'>
                    <select
                        id="roleSelect"
                        className="form-select"
                        onChange={(e) => onRoleChange(e.target.value)}
                    >
                        <option value="">Select Role</option>
                        {roles.map((role) => (
                            <option key={role.id} value={role.id}>
                                {role.name}
                            </option>
                        ))}
                    </select>
                </li>
                <li className='m-2'>
                    <select
                        id="langSelect"
                        className="form-select"
                        onChange={(e) => onLangChange(e.target.value)}
                    >
                        <option value="">Select Language</option>
                        {langs.map((lang) => (
                            <option key={lang.id} value={lang.id}>
                                {lang.name}
                            </option>
                        ))}
                    </select>
                </li>
            </ul>
        </li>
    );
};

export default UserLabProfile;
