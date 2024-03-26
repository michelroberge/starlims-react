import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import { useAuth } from './AuthContext';
import navigationConfig from '../../navigation-config.json';
import UserLabProfile from './starlims/UserLabProfile';

const Navigation = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuth().isAuthenticated;
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    AuthService.logout();
    navigate('/');
  };

  const generateMenu = (items) => {
    return items.reduce((menu, item, index) => {
      if ((isAuthenticated || !item.isPrivate) && item.caption) {
        if (item.children) {
          const dropdownMenu = (
            <ul key={index} className="dropdown-menu bg-primary" aria-labelledby="navbarDropdown">
              {generateMenu(item.children)}
            </ul>
          );
          menu.push(
            <li key={index} className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {item.caption}
              </a>
              {dropdownMenu}
            </li>
          );
        } else {
          if (item.caption) {
            menu.push(
              <li key={index} className="nav-item">
                <Link to={item.path} className="nav-link">{item.caption}</Link>
              </li>
            );
          }
        }
      }
      return menu;
    }, []);
  };

  const simulateF1KeyPress = () => {
    // Create a new KeyboardEvent object with F1 key
    const event = new KeyboardEvent('keydown', {
      key: 'F1',
    });

    // Dispatch the event to simulate F1 key press
    window.dispatchEvent(event);
  };



  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src="/logo.svg" alt="Logo" className="navbar-brand" style={{ maxWidth: 48 }} />
          <span className="ms-2 navbar-brand">{import.meta.env.VITE_APP_TITLE}</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav flex-grow-1">
            {generateMenu(navigationConfig)}
          </ul>
          <ul className="navbar-nav">

          {isAuthenticated && (
                <UserLabProfile // Integrate the new component
                  onSiteChange={(siteId) => console.log(`Selected site: ${siteId}`)}
                  onRoleChange={(roleId) => console.log(`Selected role: ${roleId}`)}
                  onLangChange={(langId) => console.log(`Selected lang: ${langId}`)}
                  className='mx-4' />
            )}

            <li className="nav-item" style={{marginRight: '8px'}}>
              <span className="btn btn-outline-secondary" name="help" onClick={simulateF1KeyPress}>
                F1 for help
              </span>
            </li>
            {!isAuthenticated && (
              <li className="nav-item">
                <Link className="btn btn-outline-secondary" to="/login" name="login">
                  Login
                </Link>
              </li>
            )}
            {isAuthenticated && (
                <li className="nav-item">
                  <button className="btn btn-outline-warning" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
            )}
          </ul>
        </div>
      </div>
    </nav >
  );
};

export default Navigation;
