const GET_QUESTIONS = 'GET_QUESTIONS';
const ADD_QUESTION = 'ADD_QUESTION';
const UPDATE_QUESTION = 'UPDATE_QUESTION';
const DELETE_QUESTION = 'DELETE_QUESTION';
const SET_ID = 'SET_ID';
const SET_QERROR = 'SET_QERROR';

const initialState = {
    questions: [
        {
            title: '',
            options: []
        }
    ],
    currentID: '',
    error: ''
}

export default function questionReducer(state = initialState, action) {
    switch (action.type) {
        case GET_QUESTIONS:
            return {
                ...state,
                questions: [...action.payload]
            }

        case ADD_QUESTION:
            return {
                ...state,
                questions: [...state.questions, action.payload]
            }

        case DELETE_QUESTION:
            return {
                ...state,
                questions: state.questions.filter(question => question._id !== action.payload)
            }

        case UPDATE_QUESTION:
            return {
                ...state,
                questions: state.questions.map(question => question._id === action.payload.id ? action.payload.data : question)
            }

        case SET_ID:
            return {
                ...state,
                currentID: action.payload
            }

        case SET_QERROR:
            return {
                ...state,
                questions: [
                    {
                        title: '',
                        options: []
                    }
                ],
                error: action.payload
            }

        default:
            return state;
    }
}

export const getQuestions = questions => ({ type: GET_QUESTIONS, payload: questions });
export const addQuestion = question => ({ type: ADD_QUESTION, payload: question });
export const deleteQuestion = id => ({ type: DELETE_QUESTION, payload: id });
export const updateQuestion = (id, data) => ({ type: UPDATE_QUESTION, payload: { id, data } });
export const setID = id => ({ type: SET_ID, payload: id });
export const setQError = message => ({ type: SET_QERROR, payload: message });