import api from './api';

const authService = {

    // Register user
    signup: async (userData) => {
        try{
            const response = await api.post('/users/signup', userData);
            return response.data;
        }catch(error){
            throw error.response?.data || error.message;
        }
    },

    // Login user
    login: async (credentials) => {
        try{
            const response = await api.post('/auth/login', credentials);
            const {data} = response.data;

            if(data.token){
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify({
                    userId: data.userId,
                    username: data.username,
                    email: data.email,
                }));
            }
            return data;
        }catch(error){
            throw error.response?.data || error.message;
        }
    },

    // Logout user
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = `${window.location.origin}/login`;
    },

    // Get current user from local storage
    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        if(userStr){
            JSON.parse(userStr);
        }
        return null;
    },

    // Check if user is authenticated
    isAuthenticated: () => {
        const token = localStorage.getItem('token');
        return !!token;
    },

    validateToken: async () => {
        try{
            const response = await api.get('/auth/validate');
            return response.data;
        }catch(error){
            return false;
        }
    }
}

export default authService;