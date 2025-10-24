import axios from 'axios';

const API_BASE_URL = 'https://api.fieldday.com'; // Replace with your actual API base URL

export const fetchActivities = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/activities`);
        return response.data;
    } catch (error) {
        console.error('Error fetching activities:', error);
        throw error;
    }
};

export const createActivity = async (activityData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/activities`, activityData);
        return response.data;
    } catch (error) {
        console.error('Error creating activity:', error);
        throw error;
    }
};

export const fetchUserProfile = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
};

export const updateUserProfile = async (userId, profileData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/users/${userId}`, profileData);
        return response.data;
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }
};