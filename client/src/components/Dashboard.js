import React, { useEffect, useState }  from 'react';
import ProgressBar from "./ProgressBar";
import { Button } from "@mui/material";
import { useDispatch, useSelector}  from "react-redux";
import { getQuestionsApi } from "../actions/question";
import {Link} from "react-router-dom";

const Dashboard = () => {
    const questions = useSelector(state => state.question.questions);
    const { isAdmin } = useSelector(state => state.user);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getQuestionsApi());
    }, [dispatch]);

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
                            completed={currentQuestion * (100 / questions.length).toFixed(2)}
                        />
                        <div>
                            <h3 className="questionth">Question {currentQuestion + 1}/{questions.length}</h3>
                        </div><br/>
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
                        </div><br/>
                    </>
                )}
                {isAdmin && <Link to="/admin">Go Back to Admin Panel</Link>}
            </div>
        )
    );
};

export default Dashboard;