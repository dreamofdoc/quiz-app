import React, { useEffect, useState}  from 'react';
import ProgressBar from "./ProgressBar";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector}  from "react-redux";
import { deleteQuestionApi, getQuestionsApi } from "../actions/question";
import { setID } from "../reducers/questionReducer";

const Dashboard = () => {
    const questions = useSelector(state => state.question.questions);
    const role = useSelector(state => state.user.role);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getQuestionsApi());
    }, []);

    const handleAnswer = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setLoading(true);
            setTimeout(() => {
                setCurrentQuestion(nextQuestion);
                setLoading(false);
            }, 1000);
        } else {
            setShowScore(true);
        }
    };

    function RenderRole() {
        return role === 'admin' ? (<div>
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
                            navigate(`/dashboard/${questions[currentQuestion]._id}`);
                        }}
                    >
                        Update
                    </Button>
                </div><br/>
                <div>
                    <Button
                        size="small"
                        variant="outlined"
                        color="primary"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(`/dashboard/add_question`);
                        }}
                    >
                        Add Question
                    </Button>
            </div>
        </div>) : null
    }

    return (
        loading ? (<p>Loading...</p>) : (
            <div className="App">
                <h1 className="head">Quiz App</h1>
                {showScore ? (
                    <div className="scoreboard">
                        You scored <span style={{color: "#FFA0C8"}}>{score}</span> out of {questions.length}<br/><br/>
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => window.location.reload(true)}
                        >
                            Play Again
                        </Button>
                    </div>
                ) : (
                    <>
                        <ProgressBar
                            bgcolor={'#FBBCEF'}
                            completed={currentQuestion * (100 / questions.length)}
                        />
                        <div>
                            <div className="questionth">Question {currentQuestion + 1}/{questions.length}</div>
                        </div>
                        <RenderRole />
                        <div className="question-title">{questions[currentQuestion].title}</div>
                        <div className="variant-container">
                            {questions[currentQuestion].options.map((answerOption, index) => (
                                <div key={index} className="variant">
                                    <button
                                        className="variant-button"
                                        onClick={() => handleAnswer(answerOption.isCorrect)}
                                    >
                                        {answerOption.answer}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        )
    );
};

export default Dashboard;