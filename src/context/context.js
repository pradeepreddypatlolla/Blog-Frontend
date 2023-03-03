import { createContext, useContext, useReducer } from "react"
import { AuthReducer, initialState } from "./reducer"

const AuthStateContext = createContext()
const AuthDispatchContext = createContext()

export const useAuthState = ()=>{
    const context = useContext(AuthStateContext)
    console.log("Auth State Context - ",context);
    if(context ===undefined){
       throw new Error("useAuthState must be used in AuthProvider")
    }
    return context
}

export const useAuthDispatch =()=>{
    const context = useContext(AuthDispatchContext)
    console.log("Auth dispatch Context - ",context);
    if(context ===undefined){
       throw new Error("useAuthDispatch must be used in AuthProvider")
    }
    return context
} 

export const AuthProvider = ({children})=>{
    const [user,dispatch] = useReducer(AuthReducer,initialState)
    return(
        <AuthStateContext.Provider value={user} >
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    )

}
