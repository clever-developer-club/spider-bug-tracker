import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';
import loginImage from "../../Assets/Images/test5.svg";
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import axios from 'axios';
// import { setAuthDetails } from "../../Redux/Helpers/authHelper";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useSelector } from "react-redux";
import queryString from 'query-string';
import {setAuthDetails,setJWTToken,setUser} from '../../Redux/Helpers/authHelper'

const Login = (props) => {

    const [email, setEmail] = useState("fkzinr@midiharmonica.com");
    const [password, setPassword] = useState("abcd1234");

    const cookies = new Cookies();
    const navigate = new useNavigate();
    const user = useSelector((state) => state.authReducer);

    const submitButton = async (e) => {
        e.preventDefault();
        await axios({
            method: "POST",
            url: "http://localhost:4000/api/v1/auth/login",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: {
                email,
                password
            }
        }).then((res) => {
            if (res.data.auth) {
                setAuthDetails(res.data);
                cookies.set('jwt', res.data.token, { path: '/' });
                navigate("/", { replace: true });
            } else {
                toast.error(res.data.message);
            }
        }).catch((err) => {
            toast.error(err.response.data.message);
        })
    }

    const showPassword = () => {
        var x = document.getElementById("password");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }
    console.log(user);

    // useEffect(() => {
    //     if (user.jwtToken !== "") {
    //         navigate("/", { replace: true })
    //     }
    // }, [])
    useEffect(() => {

        // if (user.jwtToken !== "") {
        //             navigate("/", { replace: true })
        //         }

		let asyncFunction = async () => {
			let queryObj = queryString.parse(window.location.search)
    		if(queryObj.activation){
      			toast.success("Activation successful.");
    		}else if(queryObj.reset){
      			toast.success("Password Reset Successful.");
    		}else if(queryObj.error){
      			toast.error(queryObj.error);
    		}else if(queryObj.token){
      			setJWTToken(queryObj.token)
				const {data} = await axios({
					method : "GET",
					url : `${process.env.REACT_APP_API_URL}/auth/user`,
					headers : {
						Authorization: `Bearer ${queryObj.token}`
					}
				})
				setUser(data.data)
     	 		// history.push("/");
                  navigate("/", { replace: true })
    		}
	}
	asyncFunction()
  },[])

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
                            <div className='button-div'>
                                <input
                                    type="submit"
                                    value="Login"
                                    className="btn btn-dark mb-4 login-button"
                                />
                            </div>
                        </form>
                        <div className='text-center'>
                            <p>
                                Don't have an account ?{" "}
                                <Link to="/signup" className="register-login text-dark font-weight-bold">
                                    Register
                                </Link>
                            </p>
                        </div>
                        <div className='text-center'>
                            <a href={`${process.env.REACT_APP_API_URL}/auth/google`} className='font-weight-bold text-dark'> Login with Google </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>;
}

export default Login;
