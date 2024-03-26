import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import getRoutes from './routesConfig';
import Navigation from './components/Navigation';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './components/AuthContext';
import Login from './components/Login';
import { useWaitIndicator } from './context/WaitIndicatorContext';
import WaitOverlay from './components/core/WaitOverlay'
import { KeyboardHandlerProvider } from './context/KeyboardHandlerContext';

const AppContent = () => {
    const { isAuthenticated } = useAuth();
    const isProduction = import.meta.env.PROD === true;
    const { waitStatus } = useWaitIndicator();

    const [routes, setRoutes] = React.useState([]);

    React.useEffect(() => {
        const fetchRoutes = async () => {
            const generatedRoutes = await getRoutes();
            setRoutes(generatedRoutes);
        };

        fetchRoutes();
    }, [waitStatus]);

    return (
        <div className="d-flex flex-column min-vh-100">
            <Router>
                <KeyboardHandlerProvider>
                    <Navigation />

                    <main className="flex-grow-1 d-flex"> {/* Use Bootstrap classes for flexbox and overflow */}
                        <div className='container-fluid'>
                            {(isProduction) && (
                                <p>&nbsp;</p>)
                            }
                            {(!isProduction) && (
                                <p className="text-danger mb3 fw-bold text-center">
                                    DEVELOPMENT ENVIRONMENT
                                </p>)
                            }


                            <Routes>
                                {routes.map((route, index) => (
                                    <Route key={index} path={route.path} element={route.isPrivate && !isAuthenticated ? <Login goHome={false} /> : route.element} />
                                ))}
                            </Routes>
                        </div>
                    </main>
                    <footer className="bg-primary text-center py-3 mt-3"> {/* Use Bootstrap classes for footer */}
                        <a href="https://michel-roberge.com">&copy; 2024 SOME NORTHEN DEVELOPER</a>
                        <WaitOverlay caption={waitStatus.caption} />
                    </footer>
                </KeyboardHandlerProvider>
            </Router>
        </div>
    );
};

export default AppContent;
