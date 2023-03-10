import { URL } from "../constants"

export const loginAction = async (dispatch,data)=>{

    try {
        const reqOptions= {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
             
            },
            body:JSON.stringify(data)
          }
          dispatch({type:"REQUEST_INITIATED"})
          let res = await fetch(URL+"user/login",reqOptions)
          res= await res.json()
          if(res.success){
            localStorage.setItem('user',JSON.stringify(res.user))
            localStorage.setItem('token',res.token)
           dispatch({type:"LOGIN_SUCCESS",payload:{user:res.user,token:res.token}})
            
           return res.success

          }

          else{
            dispatch({type:"LOGIN_FAIL",payload:res.message})
           return res.success
          }

    } catch (error) {
        dispatch({type:"LOGIN_FAIL",payload:error.message})
        
       return false
    }


}

export const registerAction = async(dispatch,data)=>{
    try {
        const reqOptions= {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body:JSON.stringify(data)
          }
          dispatch({type:"REQUEST_INITIATED"})
          let res = await fetch(URL+"user/register",reqOptions)
          res= await res.json()
          if(res.success){
           dispatch({type:"LOGIN_SUCCESS",payload:res.user})
            
           return res.success

          }

          else{
            dispatch({type:"LOGIN_FAIL",payload:res.message})
           return res.success
          }

    } catch (error) {
        dispatch({type:"LOGIN_FAIL",payload:error.message})
        
       return false
    }

}




