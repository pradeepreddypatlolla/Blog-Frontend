import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { URL } from "../../constants";
import { registerAction } from "../../context/action";
import { useAuthDispatch, useAuthState } from "../../context/context";
import './Register.css'
const Register = () => {
  const [name, setName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [reEnteredPassword, setReEnteredPassword] = useState("");
  const dispatch = useAuthDispatch()
  const {loading,errorMessage} = useAuthState()
  const navigate = useNavigate();
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmailId(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
const handleReEnteredPasswordChange=(e)=>{
    setReEnteredPassword(e.target.value)
}
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password!==reEnteredPassword){
        dispatch({type:"RE_ENTERED_PASSWORD_MISSMATCH"})
        return
    }
    
    try {
      let isRegistrationSuccess = await registerAction(dispatch,{name,emailId,password})
      if(!isRegistrationSuccess) return

      navigate("/blogs")
      
    } catch (error) {
       
    }
  };
  return (
    <div className="register-main-container">
      
      <h3>Create a New Account</h3>
      <div className="register-content card">
        <div className="register-inputs">
          <div>Name :</div>

          <div>
            <input type="text" name="name" onChange={handleNameChange} />
          </div>
        </div>
        <div className="register-inputs">
          <div>Email Id :</div>
          <div>
            <input type="email" name="emailId" onChange={handleEmailChange} />
          </div>
        </div>

        <div className="register-inputs">
          <div>Password :</div>
          <div>
            <input
              type="password"
              name="password"
              onChange={handlePasswordChange}
            />
          </div>
        </div>

        <div className="register-inputs">
          <div>Re enter password :</div>
          <div>
            <input
              type="password"
              name="password2"
              onChange={handleReEnteredPasswordChange}
            />
          </div>
        </div>

        <div className="register-submit">
          <button className="btn" type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
        <p >Existing User? <span > <Link style={{color:"blue"}}  to="/user/login" >Click Here to Login</Link> </span>   </p>
        {errorMessage? <p style={{color:'red'}}> *{errorMessage}* </p>:"" }
      </div>
    </div>
  );
};

export default Register;
