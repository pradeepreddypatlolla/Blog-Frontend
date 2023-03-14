import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useAuthDispatch, useAuthState } from "../../context/context"
import { URL } from "../../constants"
import "./SingleBlogPage.css"
const HtmlToReactParser = require('html-to-react').Parser;
const SingleBlogPage = () => {
  const [blog,setBlog] = useState()
  const {blogId} = useParams()
  const authState = useAuthState()
  const dispatch = useAuthDispatch()
  const htmlToReactParser = new HtmlToReactParser();
  useEffect(()=>{
    getBlog()
  },[])
  const getBlog = async()=>{
    try {
      dispatch({type:"REQUEST_INITIATED"})
       const reqOptions= {
            method: 'GET', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authState.token}`
            },
            
            
          }
         
         let res = await fetch(`${URL}blogs/${blogId}`,reqOptions)
         res = await res.json()
         if(res.success){
          setBlog(res.blog)
          
          dispatch({type:"REQUEST_SUCCESS"})
          
         }
         else{
          dispatch({type:"REQUEST_FAIL",payload:res.message})
         }
    } catch (error) {
    
       dispatch({type:"REQUEST_FAIL",payload:error.message})
    }
  }

  return (
  <>
  {blog && <div className="blog-page-container">
      <div > <Link to="/">Home</Link> / <Link to='/blogs'>Blogs</Link> /{blog.title.substring(0,30)}  </div> 
      <h1>{  blog.title}</h1>
      <br />
    
     { htmlToReactParser.parse(blog.content)}
     
    </div>
  }
   </>
  )
}

export default SingleBlogPage
