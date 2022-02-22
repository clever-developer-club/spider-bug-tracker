import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';
import loginImage from "../../Assets/Images/test5.svg";
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import queryString from 'query-string';

const Register = (props) => {

    //const history = useHref();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();
    const user = useSelector((state) => state.authReducer);

    useEffect(() => {
        if (user.jwtToken !== "") {
            navigate("/", { replace: true })
        }
    }, []);

    const submitButton = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Both password must be same");
        } else {
            await axios({
                method: "POST",
                url: "http://localhost:4000/api/v1/auth/registration",
                headers: {
                    "Content-Type": "application/json"
                },
                data: {
                    name, email, password
                }
            }).then((res) => {
                toast.success(res.data.message);
            }).catch((err) => {
                toast.error(err.response.data.message);
            });
        }
    }

    const showPassword = () => {
        var x = document.getElementById("password");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    return <>
        <div>
            <ToastContainer />
            <div className="maindiv">
                <div className="innerdiv">
                    <div className="register">
                        <h3 className="register-heading text-center"></h3>
                        <div className='login-image'>
                            <img src={loginImage} className="m-auto login-image" height="100" width="100" />
                        </div>
                        <form onSubmit={submitButton} className="register-form">
                            <div className="form-group">
                                <div className='icon-label'><PersonIcon /><label>Username</label></div>
                                <input
                                    name="name"
                                    type="text"
                                    placeholder="Enter Your Name"
                                    className="form-control"
                                    onChange={(event) => {
                                        setName(event.target.value);
                                    }}
                                    value={name}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <div className='icon-label'><EmailIcon /><label>Email</label></div>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Enter Your Email"
                                    className="form-control"
                                    onChange={(event) => {
                                        setEmail(event.target.value);
                                    }}
                                    value={email}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <div className='icon-label'><LockIcon /><label>Password</label></div>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Enter Your Password"
                                    className="form-control"
                                    onChange={(event) => {
                                        setPassword(event.target.value);
                                    }}
                                    id="password"
                                    value={password}
                                    required
                                />
                                <div className="show-password">
                                    <div>
                                        <input type="checkbox" onClick={showPassword} />
                                        <span> Show Password</span>
                                    </div>
                                    {/* <div className='forgot-password'>
                                        <Link to='/forgot-password'>Forgot password ?</Link>
                                    </div> */}
                                </div>
                            </div>
                            <div className="form-group">
                                <div className='icon-label'><LockIcon /><label>Confirm Password</label></div>
                                <input
                                    name="cpassword"
                                    type="password"
                                    placeholder="Enter Confirm Password"
                                    className="form-control"
                                    onChange={(event) => {
                                        setConfirmPassword(event.target.value);
                                    }}
                                    id="cpassword"
                                    value={confirmPassword}
                                    required
                                />
                            </div>
                            <div className='button-div'>
                                <input
                                    type="submit"
                                    value="Register"
                                    className="btn btn-dark mb-4 login-button"
                                />
                            </div>
                        </form>
                        <div className='text-center'>
                            <p>
                                Already have an account ?{" "}
                                <Link to="/signin" className="register-login text-dark font-weight-bold">
                                    Login
                                </Link>
                            </p>
                        </div>
                        {/* <div className='text-center'>
                            <a href="https://ministore-backend.herokuapp.com/api/v1/auth/google" className='font-weight-bold text-dark'> Login with Google </a>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    </>;
}

export default Register;
