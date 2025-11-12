import api from './api';

const userService = {

    // Get user by id
    getUserById: async (userId) => {
        try{
            const response = await api.get(`/users/${userId}`);
            return response.data;
        }catch(error){
            throw error.response?.data || error.message;
        }
    },
}

export default userService;