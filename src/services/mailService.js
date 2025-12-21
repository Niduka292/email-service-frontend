import api from './api';

const mailService = {

    // Send email
    sendMail: async (senderId, mailData) => {
        try{
            const response = await api.post(`/mails/send/${senderId}`,mailData);
            return response.data;
        }catch(error){
            throw error.response?.data || error.message;
        }
    },

    // Get inbox
    getInbox: async (userId) => {
        try{
            const response = await api.get(`/mails/inbox/${userId}`);
            return response.data;
        }catch(error){
            throw error.response?.data || error.message;
        }
    },

    // Get sent emails
    getSentMails: async (userId) => {
        try{
            const response = await api.get(`/mails/sent/${userId}`);
            return response.data;
        }catch(error){
            throw error.response?.data || error.message;
        }
    },

    // Get trash mails
    getTrash: async (userId) => {
        try{
            const response = await api.get(`/mails/trash/${userId}`);
            return response.data;
        }catch(error){
            throw error.response?.data || error.message;
        }
    },

    // Delete mail
    deleteMail: async (mailId, userId) => {
        try{
            const response = await api.delete(`/mails/${mailId}/user/${userId}`);
            return response.data;
        }catch(error){
            throw error.response?.data || error.message;
        }
    },

    // Mark as read
    markAsRead: async (mailId, userId) => {
        try{
            const response = await api.put(`/mails/${mailId}/user/${userId}/read`);
            return response.data;
        }catch(error){
            throw error.response?.data || error.message;
        }
    },

    // Mark as starred
    toggleStar: async (mailId, userId) => {
        try{
            const response = await api.put(`/mails/${mailId}/user/${userId}/star`);
            return response.data;
        }catch(error){
            throw error.response?.data || error.message;
        }
    },

    // Get unread count
    getUnreadCount: async(userId) => {
        try{
            const response = await api.get(`/mails/unread/${userId}`);
            return response.data;
        }catch(error){
            throw error.response?.data || error.message;
        }
    },

    // Get summary
    getSummary: async (mailId) => {
        try{
            const response = await api.get(`/mails/${mailId}/summary`);
            return response.data;
        }catch(error){
            const errMsg = error.response?.data || "Could not connect to summarization service.";
            throw new Error(errMsg);
        }
    },

    // Get reply suggestions
    getSuggestions: async (mailId) => {
        try{
            const response = await api.get(`/mails/${mailId}/suggestions`);
            return response.data;
        }catch(error){
            throw error.response?.data || error.message;
        }
    }

};

export default mailService;