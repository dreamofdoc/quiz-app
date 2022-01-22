import React, { useEffect, useState } from 'react';
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateQuestionApi } from "../actions/question";
import {setID, setQError} from "../reducers/questionReducer";

const UpdateQuestion = () => {
    const id = useSelector(state => state.question.currentID);
    const question = useSelector(state => state.question.questions.find(q => q._id === id));
    const error = useSelector(state => state.question.error)
    const [title, setTitle] = useState('');
    const [option1, setOption1] = useState({ answer: '', isCorrect: false });
    const [option2, setOption2] = useState({ answer: '', isCorrect: false });
    const [option3, setOption3] = useState({ answer: '', isCorrect: false });
    const [option4, setOption4] = useState({ answer: '', isCorrect: false });
    const [options, setOptions] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setID(question._id));
        setTitle(question.title);
        setOption1({ answer: question.options[0].answer, isCorrect: question.options[0].isCorrect });
        setOption2({ answer: question.options[1].answer, isCorrect: question.options[1].isCorrect });
        setOption3({ answer: question.options[2].answer, isCorrect: question.options[2].isCorrect });
        setOption4({ answer: question.options[3].answer, isCorrect: question.options[3].isCorrect });
    }, [dispatch]);

    return (
        <div>
            <h2>Update the question</h2>
            {error && <p className="errors">{error}</p>}
            <form onSubmit={(e) => {
                e.preventDefault();
                dispatch(updateQuestionApi(id, { title, options }, (question, err) => {
                    if (!question && err) {
                        navigate(`/admin/${id}`);
                        setOptions([])
                        dispatch(setQError(err))
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
                <div className="upd-group">
                    <TextField
                        variant="standard"
                        label="Answer 1"
                        value={option1.answer}
                        onChange={(e) => {
                            setOption1({...option1, answer: e.target.value});
                        }}
                    />
                    <label className="opt-field">
                        <input
                            className="opt-check"
                            name="option"
                            type="radio"
                            id="isTrue"
                            checked={option1.isCorrect}
                            onChange={(e) => setOption1({...option1, isCorrect: e.target.checked})}
                        />
                            Is Right
                    </label>
                </div><br/>
                <div>
                    <TextField
                        variant="standard"
                        label="Answer 2"
                        value={option2.answer}
                        onChange={(e) => {
                            setOption2({...option2, answer: e.target.value});
                        }}
                    />
                    <input
                        name="option"
                        type="radio"
                        id="isTrue2"
                        checked={option2.isCorrect}
                        onChange={(e) => setOption2({...option2, isCorrect: e.target.checked})}
                    />
                    <label htmlFor="isTrue2">Is Right</label>
                </div><br/>
                <div>
                    <TextField
                        variant="standard"
                        label="Answer 3"
                        value={option3.answer}
                        onChange={(e) => {
                            setOption3({...option3, answer: e.target.value});
                        }}
                    />
                    <input
                        name="option"
                        type="radio"
                        id="isTrue3"
                        checked={option3.isCorrect}
                        onChange={(e) => setOption3({...option3, isCorrect: e.target.checked})}
                    />
                    <label htmlFor="isTrue3">Is Right</label>
                </div><br/>
                <div>
                    <TextField
                        variant="standard"
                        label="Answer 4"
                        value={option4.answer}
                        onChange={(e) => {
                            setOption4({...option4, answer: e.target.value});
                        }}
                    />
                    <input
                        name="option"
                        type="radio"
                        id="isTrue4"
                        checked={option4.isCorrect}
                        onChange={(e) => setOption4({...option4, isCorrect: e.target.checked})}
                    />
                    <label htmlFor="isTrue4">Is Right</label>
                </div><br/><br/>
                <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => setOptions([...options, option1, option2, option3, option4])}
                >
                    Update Question
                </Button>
            </form>
        </div>
    );
};

export default UpdateQuestion;