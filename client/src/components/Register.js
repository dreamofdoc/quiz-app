import React, { useState } from "react";
import { registration } from "../actions/user";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";
import { setError } from "../reducers/userReducer";

const Register = () => {
    const error = useSelector(state => state.user.error);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div>
            <h2 className="nav-head">Register</h2>
            <div className="reg-login">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    dispatch(registration(email, password, user => {
                        if (!user) {
                            navigate('/register');
                        } else {
                            setEmail('');
                            setPassword('');
                            dispatch(setError(''));
                            navigate('/login');
                        }
                    }));
                }}>
                    <div>
                        <TextField
                            className="auth-inputs"
                            variant="standard"
                            type="email"
                            label="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div><br/>
                    <div>
                        <TextField
                            className="auth-inputs"
                            variant="standard"
                            type="password"
                            label="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div><br/>
                    {error && <p className="errors">{error}</p>}
                    <div style={{textAlign: 'center'}}><Button size="medium" variant="contained" type="submit">Register</Button></div>
                </form>
            </div>
        </div>
    );
}

export default Register;