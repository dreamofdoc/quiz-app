import React, { useState } from "react";
import { registration } from "../actions/user";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, TextField } from "@mui/material";

const Register = () => {
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div>
            <h2 className="nav-head">Register</h2>
            <div className="reg-login">
                <form onSubmit={(e) => {
                    dispatch(registration(role, email, password));
                    e.preventDefault();
                    setRole('');
                    setEmail('');
                    setPassword('');
                    navigate('/login');
                }}>
                    <div>
                        <TextField
                            className="auth-inputs"
                            variant="standard"
                            label="Role"
                            value={role}
                            onChange={e => setRole(e.target.value)}
                        />
                    </div><br/>
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
                    <div style={{textAlign: 'center'}}><Button size="medium" variant="contained" type="submit">Register</Button></div>
                </form>
            </div>
        </div>
    );
}

export default Register;