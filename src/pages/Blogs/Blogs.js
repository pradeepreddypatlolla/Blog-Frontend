import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Blog from '../../components/Blog/Blog'
import { URL } from '../../constants'
import { useAuthState } from '../../context/context'
import './Blogs.css'
const Blogs = () => {
    const [blogs,setBlogs] = useState([])
    const authState = useAuthState()
    useEffect(()=>{
        getBlogs()
    },[])

    const getBlogs = async()=>{
        try {
           const reqOptions= {
                method: 'GET', // or 'PUT'
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${authState.token}`
                },
                
                
              }

             let blogs = await fetch(URL+'blogs/all',reqOptions)
             blogs = await blogs.json()
             setBlogs(blogs.blogs)
             console.log(blogs.blogs); 
        } catch (error) {
            console.log(error);
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
