import React, { useState, useEffect } from 'react';
import { useWaitIndicator } from '../../context/WaitIndicatorContext';

const WaitOverlay = ({ caption = 'Please wait...', duration = 500 }) => {
  const { waitStatus } = useWaitIndicator();
  const [showOverlay, setShowOverlay] = useState(waitStatus.waiting);

  useEffect(() => {
    setShowOverlay(waitStatus.waiting);

    if (!waitStatus.waiting) {
      // Delay hiding the overlay to allow the fade-out transition
      const timeoutId = setTimeout(() => {
        setShowOverlay(false);
      }, duration);

      return () => clearTimeout(timeoutId);
    }
  }, [waitStatus.waiting, duration]);

  // Define fade-in and fade-out styles
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'opacity 0.5s ease-in-out',
    opacity: showOverlay ? 1 : 0,
  };

  if (!showOverlay) return null;

  return (
    <div className="overlay" style={overlayStyle}>
      <div className="overlay-content d-flex flex-column justify-content-center align-items-center">
        <div className="spinner-border spinner-border-lg text-success mb-3 shadow" role="status">
          <span className="visually-hidden">{caption}</span>
        </div>
        <p className='lead text-success fw-bold fs-4'>{waitStatus.caption || caption}</p>
      </div>
    </div>
  );
};

export default WaitOverlay;
