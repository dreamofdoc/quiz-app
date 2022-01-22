import axios from "axios";
import { getQuestions, addQuestion, deleteQuestion, updateQuestion, setQError } from "../reducers/questionReducer";

export const getQuestionsApi = () => async dispatch => {
    try {
        const response = await axios.get("http://localhost:8000/api/questions");
        dispatch(getQuestions(response.data.questions));
        // console.log(response);
    } catch (error) {
        console.log(error.response);
    }
};

export const addQuestionApi = (title, options, callback) => async dispatch => {
    try {
        console.log({title, options})
        const response = await axios.post('http://localhost:8000/api/questions', {
            title,
            options
        });
        dispatch(addQuestion(response.data.question));
        callback(response.data.question, null);
        console.log(response.data.message);
    } catch (error) {
        if (error.response.data.error.errors.options.message) {
            dispatch(setQError(error.response.data.error.errors.options.message))
        } else {
            dispatch(setQError('Fill all answers and at least one right option'))
        }
        callback(null, error.response)
        console.log(error.response.data.error.errors.options.message);
    }
}

export const updateQuestionApi = (id, data, callback) => async dispatch => {
    try {
        console.log(data)
        const response = await axios.patch(`http://localhost:8000/api/questions/${id}`, {
            title: data.title,
            options: data.options
        });
        dispatch(updateQuestion(id, data));
        callback(response.data.question, null);
        console.log(response.data.message);
    } catch (error) {
        dispatch(setQError('Fill in the data'))
        callback(null, 'Fill in all the answers and at least one right option')
        console.log(error);
    }
}

export const deleteQuestionApi = id => async dispatch => {
    try {
        const response = await axios.delete(`http://localhost:8000/api/questions/${id}`);
        dispatch(deleteQuestion(id));
        console.log(response.data.id);
    } catch (error) {
        console.log(error.response.data);
    }
}