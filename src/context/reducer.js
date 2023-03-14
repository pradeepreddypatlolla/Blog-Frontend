const user = localStorage.getItem("user")?JSON.parse(localStorage.getItem('user')):""
const token = localStorage.getItem('token')?localStorage.getItem('token'):""
const blogs= sessionStorage.getItem('blogs')?JSON.parse(sessionStorage.getItem('blogs')):[]
export const initialState = {
    user : user,
    loading:false,
    errorMessage:"",
    token:token,
    blogs:blogs
}
export  const AuthReducer = (initialState,action)=>{
    switch(action.type){
        case 'REQUEST_INITIATED':
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
        case 'BLOG_SUBMIT_SUCCESS':
            return {...initialState,loading:false}
        case 'BLOG_SUBMIT_FAIL':
            return {...initialState,loading:false,errorMessage:action.payload}
        case 'START_LOADING':
            return {...initialState,loading:true}
        case 'STOP_LOADING':
            return {...initialState,loading:false}
        case 'REQUEST_FAIL':
            return {...initialState,loading:false,errorMessage:action.payload}
        case 'REQUEST_SUCCESS':
            return {...initialState,loading:false,errorMessage:""}
        case "CLEAR_STATE":
            return { user : null,
                loading:false,
                errorMessage:"",
                token:null,
                blogs:[]}
        default:
            return{...initialState}
    }
}



