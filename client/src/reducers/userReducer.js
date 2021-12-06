const REGISTER = 'REGISTER';
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const initialState = {
    currentUser: {},
    isAuth: false,
    role: ''
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case REGISTER:
            return {
                ...state,
                currentUser: {},
                role: action.payload
            }
        case LOGIN:
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true,
                role: action.payload.role
            }
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                currentUser: {},
                isAuth: false,
                role: ''
            }

        default:
            return state;
    }
}

export const setRole = userRole => ({ type: REGISTER, payload: userRole });
export const setUser = (user, role) => ({ type: LOGIN, payload: { user, role }});
export const logout = () => ({ type: LOGOUT });