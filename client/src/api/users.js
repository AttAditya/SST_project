const { axiosInstance } = require('./index');

export const RegisterUser = async (value) => {
    try {
        const response = await axiosInstance.post('api/users/register', value);
        return response;
    }
    catch (error) {
        return error;
    }
}

export const LoginUser = async (value) => {
    try {
        const response = await axiosInstance.post('api/users/login', value);
        return response;
    }
    catch (error) {
        return error;
    }
}

export const GetCurrentUser = async () => {
    try {
        const response = await axiosInstance.get('api/users/get-current-user');
        return response;
    }
    catch (error) {
        return error;
    }
}

