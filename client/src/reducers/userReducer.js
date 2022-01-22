const REGISTER = 'REGISTER';
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const ADMIN = 'ADMIN';
const SET_ERROR = 'SET_ERROR';

const initialState = {
    currentUser: {},
    isAuth: false,
    isAdmin: false,
    error: ''
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case REGISTER:
            return {
                ...state,
                currentUser: {},
            }
        case LOGIN:
            return {
                ...state,
                currentUser: action.payload.user,
                isAuth: true,
                isAdmin: action.payload.role
            }
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                currentUser: {},
                isAuth: false,
                isAdmin: false,
                error: ''
            }
        case ADMIN:
            return {
                ...state,
                isAdmin: action.payload
            }
        case SET_ERROR:
            return {
                ...state,
                currentUser: {},
                isAdmin: false,
                isAuth: false,
                error: action.payload
            }

        default:
            return state;
    }
}

export const setRole = userRole => ({ type: ADMIN, payload: userRole });
export const setUser = (user, role) => ({ type: LOGIN, payload: { user, role }});
export const logout = () => ({ type: LOGOUT });
export const setError = message => ({ type: SET_ERROR, payload: message });