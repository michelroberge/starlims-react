import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import getRoutes from '../routesConfig';
import { useWaitIndicator } from '../context/WaitIndicatorContext';
import { useKeyboardHandler } from '../context/KeyboardHandlerContext';

const Login = ({ allowRegister = false, title = "Login", loggedIn = null, goHome = true }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setWaitStatus } = useWaitIndicator();  
  const { setModalContent } = useKeyboardHandler();

  useEffect(() => {
    setModalContent(<p>This help was initiated from the Login Screen. Enter your STARLIMS credentials and click Login.</p>);
    return () => {
      setModalContent(null);
    };
  }, [setModalContent]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setWaitStatus({waiting: true, caption: "Authenticating..."});
    setError(null);
    try {

      const token = await AuthService.login(username, password);
      const b = AuthService.isAuthenticated();
      if (b) {
        // reload routes with authenticated user
        await getRoutes();
      }
      // support loggedIn callback
      if (loggedIn) {
        loggedIn(b);
      }
      else if (goHome) {
        // if no callback, check the goHome prop to see if navigation should happen (clicked login button)
        navigate('/');
      }

    } catch (error) {
      console.error(error);
      setError('Authentication failed. Please check your credentials.');
    }finally{
      setWaitStatus({waiting: false, caption: "Loading..."});
    }
  };

  return (
    <section
      className="h-100 gradient-form"
    >
      <div className="container ">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card rounded-3 shadow">
              <div className="card-body p-md-5 bg-primary">
                <div className="text-center mb-4">
                  <img src="/logo.svg" alt="logo" style={{ width: "120px" }} />
                  <h2 className="mt-3 mb-4 text-light">{title}</h2>
                </div>
                <form onSubmit={handleLogin}>

                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      className="form-control rounded-5"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value.toUpperCase())}
                    />
                  </div>

                  <div className="mb-4">
                    <input
                      type="password"
                      className="form-control rounded-5"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>


                  {error && <div className="alert alert-danger mb-4">{error}</div>}

                  <div className="text-center pt-1 mb-5 pb-1">
                    <button className="btn btn-info btn-block rounded-5 mb-3 w-100" type="submit">
                      Login
                    </button>
                  </div>

                  {allowRegister && (
                    <div>
                      <Link to="/register" className="btn btn-outline-secondary btn-block rounded-5 w-100">
                        Register
                      </Link>
                    </div>
                  )}

                  <div className="mt-3">
                    <Link to="/forgot-password" className="btn btn-outline-secondary btn-block rounded-5 w-100">
                      Forgot Password?
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
