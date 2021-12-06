import axios from "axios";
import { setRole, setUser } from "../reducers/userReducer";

export const registration = (role, email, password) => async dispatch => {
    try {
        const response = await axios.post(`http://localhost:8000/api/auth/register`, {
            role,
            email,
            password
        });
        dispatch(setRole(response.data.role));     // Data comes from backend "register" request
        alert(response.data.message);
    } catch (error) {
        alert(error.response.data.message);
    }
}

export const login = (email, password) => async dispatch => {
    try {
        const response = await axios.post(`http://localhost:8000/api/auth/login`, {
            email,
            password
        });
        console.log(response.data.user);
        dispatch(setUser(response.data.user, response.data.role));
        localStorage.setItem('token', response.data.token);
    } catch (error) {
        alert(error.response.data.message);
    }
}

export const auth = () => async dispatch => {
    try {
        const response = await axios.get('http://localhost:8000/api/auth/auth', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        dispatch(setUser(response.data.user));
        localStorage.setItem('token', response.data.token);
    } catch (error) {
        console.log(error.response.data.message);
        localStorage.removeItem('token');
    }
}
