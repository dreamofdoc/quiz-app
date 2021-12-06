import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Landing = () => {
    const isAuth = useSelector(state => state.user.isAuth);

    return (
        <div>
            <h2 style={{marginLeft: '40px'}}>Welcome to Quiz App</h2>
            <h4>Please <Link to="/register">register</Link> or <Link to="/login">sign in</Link> to play the quiz</h4>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            {isAuth && <Link to="/dashboard">Go to Quiz</Link>}
        </div>
    );
};

export default Landing;