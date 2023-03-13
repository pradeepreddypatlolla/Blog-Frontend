import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { URL } from "../../constants";
import { registerAction } from "../../context/action";
import { useAuthDispatch, useAuthState } from "../../context/context";
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
    console.log(URL);
    try {
      let isRegistrationSuccess = await registerAction(dispatch,{name,emailId,password})
      if(!isRegistrationSuccess) return

      navigate("/blogs")
      
    } catch (error) {
       console.log(error);
    }
  };
  return (
    <div>
       {errorMessage? <p>{errorMessage}</p>:"" }
      <h1>Register Page</h1>
      <div>
        <div>
          <div>Name :</div>

          <div>
            <input type="text" name="name" onChange={handleNameChange} />
          </div>
        </div>
        <div>
          <div>Email Id :</div>
          <div>
            <input type="email" name="emailId" onChange={handleEmailChange} />
          </div>
        </div>

        <div>
          <div>Password :</div>
          <div>
            <input
              type="password"
              name="password"
              onChange={handlePasswordChange}
            />
          </div>
        </div>

        <div>
          <div>Re enter password :</div>
          <div>
            <input
              type="password"
              name="password2"
              onChange={handleReEnteredPasswordChange}
            />
          </div>
        </div>

        <div>
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
