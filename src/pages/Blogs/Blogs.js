import React, { useEffect, useState } from 'react'
import { URL } from '../../constants'
import { useAuthState } from '../../context/context'

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
                
                credentials:"include"
              }

             let blogs = await fetch(URL+'blogs/all',reqOptions)
             blogs = await blogs.json()
             console.log(blogs); 
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div>
      Blogs
    </div>
  )
}

export default Blogs
