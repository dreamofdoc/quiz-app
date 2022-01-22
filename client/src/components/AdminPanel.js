import React, { useEffect } from 'react';
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    Paper,
    TableBody,
    Button,
    ButtonGroup
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteQuestionApi, getQuestionsApi } from "../actions/question";
import { setID } from "../reducers/questionReducer";
import {useNavigate} from "react-router-dom";

const AdminPanel = () => {
    const questions = useSelector(state => state.question.questions);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getQuestionsApi());
    }, [dispatch]);

    function RenderControlPanel({ currentQuestion }) {
        return (
            <div className="control-panel">
                <ButtonGroup disableelevation>
                    <div>
                        <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={(e) => {
                                e.preventDefault();
                                dispatch(deleteQuestionApi(questions[currentQuestion]._id));
                            }}
                        >
                            Delete
                        </Button>
                    </div><br/>
                    <div>
                        <Button
                            size="small"
                            variant="outlined"
                            color="primary"
                            onClick={(e) => {
                                e.preventDefault();
                                dispatch(setID(questions[currentQuestion]._id));
                                navigate(`/admin/${questions[currentQuestion]._id}`);
                            }}
                        >
                            Update
                        </Button>
                    </div>
                </ButtonGroup>
            </div>
        )
    }

    return (
        <div>
            <div className="table-container">
                <TableContainer className="table" sx={{width: 700}} component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{textAlign: 'center', fontWeight: 'bold'}} className="table-cell">Title</TableCell>
                                <TableCell style={{textAlign: 'center', fontWeight: 'bold'}} className="table-cell">Answer 1</TableCell>
                                <TableCell style={{textAlign: 'center', fontWeight: 'bold'}} className="table-cell">Answer 2</TableCell>
                                <TableCell style={{textAlign: 'center', fontWeight: 'bold'}} className="table-cell">Answer 3</TableCell>
                                <TableCell style={{textAlign: 'center', fontWeight: 'bold'}} className="table-cell">Answer 4</TableCell>
                                <TableCell style={{textAlign: 'center', fontWeight: 'bold'}} className="table-cell">Panel</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {questions.map((question, index) => {
                                return (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell><span style={{fontWeight: 'bold'}}>{index + 1}. </span>{question.title}</TableCell>
                                        {question.options.map((option, index) => (
                                            <>
                                                <TableCell key={index + 1}>{option.answer} <br/> {option.isCorrect ? (
                                                    <span style={{color: 'green'}}>right</span>
                                                ) : (
                                                    <span style={{color: 'red'}}>wrong</span>
                                                )}</TableCell>
                                            </>
                                        ))}
                                        <TableCell><RenderControlPanel currentQuestion={questions.indexOf(question)}/></TableCell>
                                    </TableRow>
                                )})}
                        </TableBody>
                    </Table>
                </TableContainer><br/>
                <div className="table-btns">
                    <div className="table-btn">
                        <Button
                            size="small"
                            variant="contained"
                            color="secondary"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate(`/admin/add_question`);
                            }}
                        >
                            Add Question
                        </Button>
                    </div>
                    <div className="table-btn">
                        <Button
                            size="small"
                            variant="contained"
                            color="secondary"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate(`/dashboard`);
                            }}
                        >
                            View
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;