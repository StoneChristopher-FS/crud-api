import axios from 'axios';

const API_BASE = process.env.NODE_ENV === 'development'
        ? `http://localhost:8000/api/v1`
        : process.env.REACT_APP_BASE_URL;
const API_URL = '/auth'

const signup = (email, password) => {
    return axios.post(`${API_BASE}${API_URL}/`, {
        email, password
    })
    .then(res => {
        if(res.data.token) {
            localStorage.setItem('user', JSON.stringify(res.data))
        }
        return res.data
    })
}

const login = (email, password) => {
    return axios.post(`${API_BASE}${API_URL}/signin`, {
        email, password
    })
    .then(res => {
        if(res.data.token) {
            localStorage.setItem('user', JSON.stringify(res.data))
        }
        return res.data
    })
}

const logout = () => {
    localStorage.remoteItem('user');
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'))
}

const AuthService = {
    signup,
    login,
    logout,
    getCurrentUser
}

export default AuthService;