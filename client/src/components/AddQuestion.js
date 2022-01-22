import React, { useState } from 'react';
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addQuestionApi } from "../actions/question";
import { setQError } from "../reducers/questionReducer";

const AddQuestion = () => {
    const error = useSelector(state => state.question.error);
    const [title, setTitle] = useState('');
    const [option1, setOption1] = useState({answer: '', isCorrect: false});
    const [option2, setOption2] = useState({answer: '', isCorrect: false});
    const [option3, setOption3] = useState({answer: '', isCorrect: false});
    const [option4, setOption4] = useState({answer: '', isCorrect: false});
    const [options, setOptions] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div>
            <h2>Add a question</h2>
            {error && <p className="errors">{error}</p>}
            <form onSubmit={(e) => {
                e.preventDefault();
                dispatch(addQuestionApi(title, options, (question, err) => {
                    if (!question) {
                        navigate('/admin/add_question');
                        if (err) {
                            setOptions([])
                        }
                    } else {
                        navigate('/admin');
                        dispatch(setQError(''));
                        setTitle('');
                    }
                }));
            }}>
                <TextField
                    variant="standard"
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                /><br/><br/>
                <div>
                    <TextField
                        variant="standard"
                        label="Answer 1"
                        onChange={(e) => {
                            setOption1({...option1, answer: e.target.value});
                        }}
                    />
                    <input
                        name="option"
                        type="radio"
                        id="isTrue"
                        onChange={(e) => setOption1({...option1, isCorrect: e.target.checked})}
                    />
                    <label htmlFor="isTrue">Is Right</label>
                </div><br/>
                <div>
                    <TextField
                        variant="standard"
                        label="Answer 2"
                        onChange={(e) => {
                            setOption2({...option2, answer: e.target.value});
                        }}
                    />
                    <input
                        name="option"
                        type="radio"
                        id="isTrue2"
                        onChange={(e) => setOption2({...option2, isCorrect: e.target.checked})}
                    />
                    <label htmlFor="isTrue2">Is Right</label>
                </div><br/>
                <div>
                    <TextField
                        variant="standard"
                        label="Answer 3"
                        onChange={(e) => {
                            setOption3({...option3, answer: e.target.value});
                        }}
                    />
                    <input
                        name="option"
                        type="radio"
                        id="isTrue3"
                        onChange={(e) => setOption3({...option3, isCorrect: e.target.checked})}
                    />
                    <label htmlFor="isTrue3">Is Right</label>
                </div><br/>
                <div>
                    <TextField
                        variant="standard"
                        label="Answer 4"
                        onChange={(e) => {
                            setOption4({...option4, answer: e.target.value});
                        }}
                    />
                    <input
                        name="option"
                        type="radio"
                        id="isTrue4"
                        onChange={(e) => setOption4({...option4, isCorrect: e.target.checked})}
                    />
                    <label htmlFor="isTrue4">Is Right</label>
                </div><br/>
                <br/>
                <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => {
                        setOptions([...options, option1, option2, option3, option4]);
                    }}
                >
                    Add Question
                </Button>
            </form>
        </div>
    );
};

export default AddQuestion;