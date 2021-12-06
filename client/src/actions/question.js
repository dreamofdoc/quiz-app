import axios from "axios";
import { getQuestions, addQuestion, deleteQuestion, updateQuestion } from "../reducers/questionReducer";

export const getQuestionsApi = () => async dispatch => {
    try {
        const response = await axios.get("http://localhost:8000/api/questions");
        dispatch(getQuestions(response.data.questions));
        console.log(response);
    } catch (error) {
        console.log(error.response);
    }
};

export const addQuestionApi = (title, options) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:8000/api/questions', {
            title,
            options
        });
        dispatch(addQuestion(response.data.question));
        console.log(response.data.message);
    } catch (error) {
        console.log(error.response.data);
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

export const updateQuestionApi = (id, data) => async dispatch => {
    try {
        const response = await axios.patch(`http://localhost:8000/api/questions/${id}`, {
            title: data.title,
            options: data.options
        });
        dispatch(updateQuestion(id, data));
        console.log(response.data.message);
    } catch (error) {
        console.log(error.response.data);
    }
}