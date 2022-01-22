import axios from "axios";
import {setError, setRole, setUser} from "../reducers/userReducer";

export const registration = (email, password, callback) => async dispatch => {
    try {
        const response = await axios.post(`http://localhost:8000/api/auth/register`, {
            email,
            password
        });
        callback(response.data.user);
    } catch (error) {
        dispatch(setError(error.response.data.message));
        console.log(error.response.data);
    }
}

export const login = (email, password, callback) => async dispatch => {
    try {
        const response = await axios.post(`http://localhost:8000/api/auth/login`, {
            email,
            password
        });
        dispatch(setUser(response.data.user, response.data.isAdmin));
        localStorage.setItem('token', response.data.token);
        callback(response.data.isAdmin, response.data.user);
    } catch (error) {
        dispatch(setError(error.response.data.message));
        console.log(error.response.data.message);
    }
}

export const auth = () => async dispatch => {
    try {
        const response = await axios.get('http://localhost:8000/api/auth/auth', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        dispatch(setUser(response.data.user, response.data.user.isAdmin));
        localStorage.setItem('token', response.data.token);
    } catch (error) {
        console.log(error.response.data.message);
        dispatch(setRole(false));
        localStorage.removeItem('token');
    }
}
