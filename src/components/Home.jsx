import React, { useRef, useEffect } from 'react';
import { useAuth } from './AuthContext';
import Dashboard from './Dashboard';
import { useKeyboardHandler } from '../context/KeyboardHandlerContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const effectRan = useRef(false);
  const { setModalContent, setKeyCallbacks } = useKeyboardHandler();
  const navigate = useNavigate();

  useEffect(() => {
    // Set modal content when the component mounts
    setModalContent(
      <div><p>Home Screen Help</p>
        <p className="fw-lighter">ENTER: Access Login Screen</p>
      </div>
    );

    // Clean up function to remove the modal content when the component unmounts
    return () => {
      setModalContent(null);
    };
  }, [setModalContent]);

  const handleEnter = () => {
    console.log(`custom keyboard handler`);
    navigate('/login');
  };

  useEffect(() => {
    const keyCallbacks = [['Enter', handleEnter]];
    setKeyCallbacks(keyCallbacks);
    return () => {
      setKeyCallbacks([]);
    };
  }, [setKeyCallbacks]);

  // Only render the component once, or when isAuthenticated changes
  if (!effectRan.current || import.meta.env.NODE_ENV !== "development") {
    effectRan.current = true;
    if (isAuthenticated) {
      return <Dashboard />;
    } else {
      return renderHome();
    }
  }
};

const renderHome = () => (
  <div className="container">
    <div className="jumbotron">
      <h1 className="display-4">Welcome to STARLIMS on React!</h1>
      <p className="lead">Revolutionizing laboratory management for enhanced efficiency and collaboration.</p>
      <hr className="my-4" />
      <p>STARLIMS on React is dedicated to simplifying laboratory operations and accelerating scientific discovery.</p>
      <p className="lead">
        <a className="btn btn-primary btn-lg" href="/login" role="button">Get Started</a>
      </p>
    </div>
    <div className="row">
      {/* Optional: Additional content sections can be added here */}
    </div>
  </div>
);

export default Home;
