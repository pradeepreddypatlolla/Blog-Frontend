const user = localStorage.getItem("user")?JSON.parse(localStorage.getItem('user')):""
const token = localStorage.getItem('token')?localStorage.getItem('token'):""
export const initialState = {
    user : user,
    loading:false,
    errorMessage:"",
    token:token
}
export  const AuthReducer = (initialState,action)=>{
    switch(action.type){
        case 'LOGIN_REQUEST':
            return {...initialState,loading:true}
        case 'LOGIN_SUCCESS':
            console.log("initial State - " ,initialState);
            return {...initialState,user:action.payload.user,loading:false,errorMessage:"",token:action.payload.token}
        case 'LOGIN_FAIL':
            return {...initialState,errorMessage:action.payload,loading:false}
        case 'LOGOUT':
            return {...initialState,user:"",loading:false,errorMessage:""}
        case 'RE_ENTERED_PASSWORD_MISSMATCH':
            return {...initialState,errorMessage:"Re entered Password mismatched"}
        default:
            return{...initialState}
    }
}



