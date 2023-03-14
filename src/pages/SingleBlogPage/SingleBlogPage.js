import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useAuthDispatch, useAuthState } from "../../context/context"
import { URL } from "../../constants"
import "./SingleBlogPage.css"

const SingleBlogPage = () => {
  const [blog,setBlog] = useState()
  const {blogId} = useParams()
  const authState = useAuthState()
  const dispatch = useAuthDispatch()
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
          console.log(`${URL}blogs/${blogId}`);
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
       // console.log(error);
       dispatch({type:"REQUEST_FAIL",payload:error.message})
    }
  }
  return (
    <div className="blog-page-container">
      <div > <Link to="/">Home/</Link> <Link to='/blogs'>Blogs/</Link>  </div> 
      <h1>{ blog && blog.title}</h1>
      <br />
     {blog &&  <div dangerouslySetInnerHTML={{ __html: blog.content }} /> } 
    </div>
  )
}

export default SingleBlogPage
