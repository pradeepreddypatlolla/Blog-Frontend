import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthState } from '../context/context'
const ProtectedRoute = ({children}) => {
    const userState = useAuthState()
   
    if(userState.user!==''){
        return children
    }
    else {
        return  <Navigate to="/user/login"  />
    }
}

export default ProtectedRoute
