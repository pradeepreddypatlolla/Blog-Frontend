import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Blog from '../../components/Blog/Blog'
import { URL } from '../../constants'
import { useAuthDispatch, useAuthState } from '../../context/context'
import './Blogs.css'
const Blogs = () => {
    const [blogs,setBlogs] = useState([])
    const authState = useAuthState()
    const dispatch = useAuthDispatch()
    const navigate = useNavigate()
    useEffect(()=>{
        getBlogs()
    },[])

    const getBlogs = async()=>{
        try {
          dispatch({type:"REQUEST_INITIATED"})

           const reqOptions= {
                method: 'GET', // or 'PUT'
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${authState.token}`
                },
                
                
              }

             let res = await fetch(URL+'blogs/all',reqOptions)
             
            
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
    <div className='blogs-main-container'>
      <div className='subnav'> <Link to="/">Home/</Link> <Link to="/blogs">Blogs</Link> </div>
      <h2 className='blog-count'>Blogs - {blogs.length} </h2>
      { blogs&& blogs.map((blog,i)=>{
        return <div key={i}>
        <Blog blog={blog} index={i}  />
        </div> 
      })}
    </div>
  )
}

export default Blogs
