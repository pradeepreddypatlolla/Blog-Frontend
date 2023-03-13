import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginAction, loginSuccessAction } from '../../context/action'
import { useAuthDispatch, useAuthState } from '../../context/context'
import './Login.css'
const Login = () => {
    const navigate = useNavigate()
    const [emailId,setEmailId] = useState("")
    const [password,setPassword]=useState("")
    
    const dispatch = useAuthDispatch()
    const {loading,errorMessage} = useAuthState()
    const handleEmailChange = (e)=>{
        setEmailId(e.target.value)
    }

    const handlePasswordChange=(e)=>{
        setPassword(e.target.value)
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {

          let isLoginSuccess = await loginAction(dispatch,{emailId,password})
          alert(isLoginSuccess)
          if(!isLoginSuccess)return
          navigate("/blogs")
         
          
        } catch (error) {
          alert(error)
          console.log(error)
        }
    }
  return (
    <div className='login-main-container'>
        {errorMessage? <p> {errorMessage} </p>:"" }
      <h3>Login</h3>
      <div className='login-content' >
        <div className='login-inputs' >
           <div>
           Email Id : 
            </div> 
            <div>
                <input type="email" name="emailId" onChange={handleEmailChange} disabled={loading} />
            </div>
        </div>

        <div className='login-inputs'>
           <div>
           Password : 
            </div> 
            <div>
                <input type="password" name="password" onChange={handlePasswordChange} disabled={loading} />
            </div>
        </div>
        <div className='login-submit' >
            <button className='btn' type="submit" onClick={handleSubmit} disabled={loading} >Submit</button>
        </div>
      </div>
    </div>
  )
}

export default Login
