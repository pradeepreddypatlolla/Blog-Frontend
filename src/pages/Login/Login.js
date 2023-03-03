import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginAction, loginSuccessAction } from '../../context/action'
import { useAuthDispatch, useAuthState } from '../../context/context'

const Login = (props) => {
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
    <div>
        {errorMessage? <p> {errorMessage} </p>:"" }
      <h1>Login Page</h1>
      <div>
        <div>
           <div>
           Email Id : 
            </div> 
            <div>
                <input type="email" name="emailId" onChange={handleEmailChange} disabled={loading} />
            </div>
        </div>

        <div>
           <div>
           Password : 
            </div> 
            <div>
                <input type="password" name="password" onChange={handlePasswordChange} disabled={loading} />
            </div>
        </div>
        <div>
            <button type="submit" onClick={handleSubmit} disabled={loading} >Submit</button>
        </div>
      </div>
    </div>
  )
}

export default Login
