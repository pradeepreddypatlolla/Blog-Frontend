import { useEffect, useState } from "react"
import BlogWithIcon from "../../components/BlogWithIcon/BlogWithIcon"
import { useAuthDispatch, useAuthState } from "../../context/context"
import { URL } from "../../constants"
import { Link, useNavigate } from "react-router-dom"

const ProfilePage = () => {
    const [blogs,setBlogs] = useState([])
    const authState = useAuthState()
    const dispatch = useAuthDispatch()
    const navigate = useNavigate()
    useEffect(()=>{
        getMyBlogs()
    },[])

    const getMyBlogs = async()=>{
        try {
          dispatch({type:"REQUEST_INITIATED"})
           const reqOptions= {
                method: 'GET', // or 'PUT'
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${authState.token}`
                },
                
                
              }
             
             let res = await fetch(URL+'user/blogs',reqOptions)
            
             if(res.status===200){
              res = await res.json()
               setBlogs(res.blogs)
               
               dispatch({type:"REQUEST_SUCCESS"})
             }
             else{
              if(res.status===401){
                dispatch({type:"REQUEST_FAIL",payload:res.message})
                localStorage.clear()
                sessionStorage.clear()
                dispatch({type:"CLEAR_STATE"})
                navigate("/user/login")
              }
              
             }
        } catch (error) {
          dispatch({type:"REQUEST_FAIL",payload:error.message})
           
        }
    }
  return (
    <div>
        <div className='subnav'> <Link>Home</Link> {"/"} <Link>Profile</Link> </div>
      <h2 className='blog-count'>Blogs - {blogs.length} </h2>
 { blogs&& blogs.map((blog,i)=>{
        return <div key={i}>
            <BlogWithIcon blog={blog} />
        </div> 
      })}
      
    </div>
  )
}

export default ProfilePage
