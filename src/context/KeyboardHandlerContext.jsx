import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// Create a context for Keyboard Handler
const KeyboardHandlerContext = createContext();

// Custom hook to use Keyboard Handler context
export const useKeyboardHandler = () => useContext(KeyboardHandlerContext);

// Keyboard Handler Provider Component
export const KeyboardHandlerProvider = ({ children }) => {
    const navigate = useNavigate();
    const defaultContent = <><p>At any time, press F1 to view contextual help.</p></>;
    const [modalContent, setModalContent] = useState(defaultContent);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [keyCallbacks, setKeyCallbacks] = useState([]);

    // Effect to handle keydown event
    useEffect(() => {
        const handleKeyDown = (event) => {
            const { key, ctrlKey } = event;

            if (key === 'Home' && ctrlKey) {
                event.preventDefault();
                navigate("/")                
            }else if (key === 'F1') {
                event.preventDefault();
                if (isModalOpen) {
                    closeModal();
                } else {
                    openModal();
                }
            }else if ( key === 'Escape' && isModalOpen){
                closeModal();
            }

            // Handle other key callbacks
            keyCallbacks.forEach(([keyValue, callback]) => {
                if (key === keyValue) {
                    event.preventDefault();
                    callback();
                }
            });
        };

        window.addEventListener('keydown', handleKeyDown);

        // Cleanup event listener
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isModalOpen]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <KeyboardHandlerContext.Provider value={{ setModalContent, setKeyCallbacks }}>
            {children}
            {isModalOpen && (
                <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header text-center">
                            <h5 className="modal-title">HELP - How to use the application</h5>
                            <button type="button" className="btn-close bg-danger" aria-label="Close" onClick={closeModal}></button>
                        </div>
                        <div className="modal-body">
                            {modalContent || defaultContent}
                            <hr></hr>
                            <p className="fw-lighter">F1: Close Help</p><p className="fw-lighter">CTRL+Home: Go to the home page.</p>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </KeyboardHandlerContext.Provider>
    );
};
