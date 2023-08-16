import axios from "axios";
const API_URL = 'http://localhost:3000/api/user/'



// Register user 
const register = async (userData) => {
    const response = await axios.post(API_URL + 'register', userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
}


// Login user 
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
}


// Logout user 
const logout = () => {
    localStorage.removeItem('user');
}


// general Info user 
const generalInfo = async (userData) => {
    const user = JSON.parse(localStorage.getItem('user'))
    const response = await axios.get(API_URL + 'general', {
        headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json',
        },
    })
    return response.data;
}



const authService = {
    register,
    logout,
    login,
    generalInfo
}


export default authService;