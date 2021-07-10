import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
import { signin } from '../actions/userActions';
import { useSelector } from 'react-redux';
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import "../signin.css";
export default function SigninScreen(props){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const redirect = props.location.search?props.location.search.split("=")[1]:'/';
    const userSignin = useSelector((state)=>state.userSignin);
  const {userInfo,loading,error} = userSignin;
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email,password));
    }
    useEffect(()=>{
        if(userInfo){
            props.history.push(redirect);
        }
    },[props.history,redirect,userInfo]);
    return (
        <div class="container">
            <div class="row">
               <div class="col-2">
                    <img src="./images/bgc.jpg" alt="leafimg"/>
                </div> 
                <div class="col-2" id="signin">
                     <div class="form-container">
                         <form className="form" onSubmit={submitHandler}>
                             <div>
                                 <h2>Sign In</h2>
                             </div>
                             {loading && <LoadingBox></LoadingBox>}{error && <MessageBox variant="danger">{error}</MessageBox>}
                             <div>
                                 <label htmlFor="email">Email Address :</label>
                                 <input 
                                    type="email" 
                                    id="email" 
                                    placeholder="Enter email"
                                    required
                                    onChange={(e) => setEmail(e.target.value)}>
                                </input>
                             </div>
                             <div>
                                 <label htmlFor="password">Password</label>
                                 <input
                                    type="password"
                                    id="password"
                                    placeholder="Enter Password"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}></input>
                             </div>
                             <div>
                                 <label/>
                                 <button className="primary" type="submit">Sign In</button>
                             </div>
                             <div>
                                 <label/>
                                 <div>
                                     New customer?{' '}<Link to={`/register?redirect=${redirect}`}>Create your account</Link>
                                 </div>
                             </div>
                         </form>
                     </div>
                </div>
            </div>
        </div>
    )
}