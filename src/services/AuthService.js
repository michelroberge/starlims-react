import api from './Api';
import { runAction, authenticate} from './Starlims';
import { jwtDecode } from 'jwt-decode';

let authCallback = null;
const starlimsTokenKey = 'starlims-token';
const starlimsRefreshTokenKey = `${starlimsTokenKey}-refresh`;

const AuthService = {

  isTokenExpired: () => {
    
    const token = AuthService.getAccessToken();
    if (!token) {
      return true; // Token is considered expired if it's not present
    }
  
    try {
      const decodedToken = jwtDecode(token);
      const expirationTimestamp = decodedToken.exp * 1000; // Convert expiration time to milliseconds
    
      // Get the current time in milliseconds
      const currentTime = Date.now();
    
      // Compare the current time with the token's expiration time
      return currentTime >= expirationTimestamp;
    }catch (error){
      // console.error('Error decoding token:', error);
      return true; // Treat token as expired if there's an error decoding it
    }
  },
  

  getAccessToken: () => {
    // Split the document.cookie string into an array of individual cookies
    return sessionStorage.getItem(starlimsTokenKey);
  },

  getRefreshToken: () => {
    return sessionStorage.getItem(starlimsTokenKey);
  },

  setAccessToken: (token) => {
    sessionStorage.setItem(starlimsTokenKey, token);
  },

  setRefreshToken: (refreshToken) => {
    sessionStorage.setItem(starlimsRefreshTokenKey, refreshToken);
    // document.cookie = `refresh-token=${refreshToken}; path=/; secure; HttpOnly`;
  },

  clearTokens: () => {
    sessionStorage.setItem(starlimsTokenKey, null);
    sessionStorage.setItem(starlimsRefreshTokenKey, null);
  },

  setAuthCallback: (callback) => {
    authCallback = callback;
  },

  hasRole: (role) => {
    const serializedUser = localStorage.getItem('user');
    if (serializedUser) {
      const user = JSON.parse(serializedUser);
      if (user && user.roles) {
        const found = user.roles.some((userRole) => userRole.name === role);
        return found;
      }
    }
    return false;
  },

  login: async (username, password) => {
    try {
      const token = await authenticate( username, password );
      if (token) {

        AuthService.setAccessToken(token);
        AuthService.setUser(username);

        if (authCallback) {
          authCallback(true);
        }
        return token;
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      throw error;
    }
  },


  setUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    AuthService.user = user;
  },

  logout: () => {
    if (authCallback) {
      authCallback(false);
    }
    AuthService.clearTokens();
    AuthService.setUser(null);
  },

  isAuthenticated: async () => {
    const authToken = AuthService.getAccessToken();
    const refreshToken = AuthService.getRefreshToken();

    if (!authToken) {
      return false;
    }

    const isAccessTokenExpired = AuthService.isTokenExpired(authToken);

    if (isAccessTokenExpired && refreshToken) {
      // await AuthService.refreshToken();
      return false;
    }

    const isLoggedIn = !!AuthService.user;

    return isLoggedIn;
  },

  refreshToken: async () => {
    try {
      const refreshToken = AuthService.getRefreshToken();
      if (!refreshToken) {
        AuthService.logout();
        return;
      }

      const response = await api.post('/api/auth/refresh-token', { refreshToken });
      const newAccessToken = response.data.accessToken;

      AuthService.setAccessToken(newAccessToken);

      // Optionally handle refreshing user data if necessary
      // AuthService.refreshUserData();

      // Optionally set a timer to refresh the token again before it expires
      // AuthService.setAccessTokenExpirationTimer(AuthService.getTokenLife());
    } catch (error) {
      AuthService.logout();
    }
  },

  // Other methods like registration can be refactored here
};

export default AuthService;
