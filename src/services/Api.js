import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_URL,
  withCredentials: true,
  exposedHeaders: ['authorization'],
});

const ongoingRequests = new Set();

// Add a request interceptor
api.interceptors.request.use(config => {
  // Get the token from localStorage for each request
  const token = sessionStorage.getItem(`starlims-token`);
  
  if (token) {
    // config.headers['x-access-token'] = token; // Set the header
    config.headers['authorization'] = `Bearer ${token}`; // Set the header
  }

  if (config.url && ongoingRequests.has(config.url)) {
    // Already an ongoing request for this URL, cancel this request
    return Promise.reject('Request canceled');
  }

  if (config.method && config.url) {
    if (import.meta.env.NODE_ENV === "development" || import.meta.env.VITE_APP_DEBUG_API === "Y") {
      console.log(`${config.method.toUpperCase()} ${config.url}`);
    }
    ongoingRequests.add(config.url);
  }

  return config;
}, error => {
  // If an error occurs, remove the URL from ongoingRequests
  if (error.config && error.config.url) {
    ongoingRequests.delete(error.config.url);
  }
  return Promise.reject(error);
});

// Add a response interceptor
api.interceptors.response.use(
  response => {
    if (response.config && response.config.url) {
      ongoingRequests.delete(response.config.url);
    }
    return response;
  },
  error => {
    if (error.config && error.config.url) {
      ongoingRequests.delete(error.config.url);
    }
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    // Log cookies from the response
    const cookies = response.headers['set-cookie'];
    if (cookies) {
      // console.log('Cookies in response:', cookies);
    }else{
      // console.log('NO Cookies in response');
    }

    // Return the response
    return response;
  },
  (error) => {
    // Handle errors
    return Promise.reject(error);
  }
);

export default api;
