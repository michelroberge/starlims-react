import api from './Api';
import AuthService from './AuthService';

const runAction = async (action, parameters, type = "script") => {
    try {
        // Construct request body
        const subparams = [action, Object.values(parameters), type];

        // use starlims-proxy script and pass the actual action / parameters / type as parameters to proxy.
        const requestBody = {
            action: "_MichelTestScripts.React_Proxy",
            parameters: Object.values(subparams),
            "email": "michel.roberge@sgs.com"
        };

        const token = AuthService.getAccessToken();
        const config = {
            headers: {
                'Authorization': `Bearer ${token}` // Include the token in the 'Authorization' header
            }
        };

        // console.log(`config`, config);

        const response = await api.post(`${import.meta.env.VITE_APP_STARLIMS_ENDPOINT}/proxy`, requestBody, config);


        return response.data;
    } catch (error) {
        if (error != 'Request canceled'){
            console.error(error);
            throw new Error('RunAction failed'); // Handle error appropriately
        }
    }
};

const authenticate = async (username, password) => {
    try {
        // use starlims-proxy script and pass the actual action / parameters / type as parameters to proxy.
        const requestBody = { username, password };

        const response = await api.post(`${import.meta.env.VITE_APP_STARLIMS_ENDPOINT}/authenticate`, requestBody);
        const { token } = response.data;
        return token;

    } catch (error) {
        console.error(error);
        throw new Error('RunAction failed'); // Handle error appropriately
    }
};

export { runAction, authenticate };

export default { runAction, authenticate };