import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/user";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";

const Login = () => {
    const error = useSelector(state => state.user.error);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div>
            <h2 className="nav-head">Login</h2>
            <div className="reg-login">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    dispatch(login(email, password, (isAdmin, user) => {
                        if (!user) {
                            navigate('/login');
                        } else {
                            setEmail('');
                            setPassword('');
                            isAdmin ? navigate('/admin') : navigate('/');
                        }
                    }));
                }}>
                    <div>
                        <TextField
                            style={{width: '350px'}}
                            variant="standard"
                            type="email"
                            label="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div><br/>
                    <div>
                        <TextField
                            style={{width: '350px'}}
                            variant="standard"
                            type="password"
                            label="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div><br/>
                    {error && <p className="errors">{error}</p>}
                    <div style={{textAlign: 'center'}}>
                        <Button
                            size="medium"
                            variant="contained"
                            type="submit"
                        >
                            Login
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;