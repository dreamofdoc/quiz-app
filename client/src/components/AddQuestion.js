import React, { useState } from 'react';
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addQuestionApi } from "../actions/question";

const AddQuestion = () => {
    const [title, setTitle] = useState('');
    const [option1, setOption1] = useState({});
    const [option2, setOption2] = useState({});
    const [option3, setOption3] = useState({});
    const [option4, setOption4] = useState({});
    const [options, setOptions] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div>
            <h2>Add a question</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                dispatch(addQuestionApi(title, options));
                setTitle('');
                navigate('/dashboard');
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
                        type="checkbox"
                        name="isTrue"
                        onChange={(e) => setOption1({...option1, isCorrect: e.target.checked})}
                    />
                    <label htmlFor="isTrue">True</label>
                    <input
                        type="checkbox"
                        name="isFalse"
                        onChange={(e) => setOption1({...option1, isCorrect: !e.target.checked})}
                    />
                    <label htmlFor="isFalse">False</label><br/>
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
                        type="checkbox"
                        name="isTrue2"
                        onChange={(e) => setOption2({...option2, isCorrect: e.target.checked})}
                    />
                    <label htmlFor="isTrue2">True</label>
                    <input
                        type="checkbox"
                        name="isFalse2"
                        onChange={(e) => setOption2({...option2, isCorrect: !e.target.checked})}
                    />
                    <label htmlFor="isFalse2">False</label><br/>
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
                        type="checkbox"
                        name="isTrue"
                        onChange={(e) => setOption3({...option3, isCorrect: e.target.checked})}
                    />
                    <label htmlFor="isTrue">True</label>
                    <input
                        type="checkbox"
                        name="isFalse"
                        onChange={(e) => setOption3({...option3, isCorrect: !e.target.checked})}
                    />
                    <label htmlFor="isFalse">False</label><br/>
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
                        type="checkbox"
                        name="isTrue"
                        onChange={(e) => setOption4({...option4, isCorrect: e.target.checked})}
                    />
                    <label htmlFor="isTrue">True</label>
                    <input
                        type="checkbox"
                        name="isFalse"
                        onChange={(e) => setOption4({...option4, isCorrect: !e.target.checked})}
                    />
                    <label htmlFor="isFalse">False</label>
                </div><br/><br/>
                <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => setOptions([...options, option1, option2, option3, option4])}
                >
                    Add Question
                </Button>
            </form>
        </div>
    );
};

export default AddQuestion;