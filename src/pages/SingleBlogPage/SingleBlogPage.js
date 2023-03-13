import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useAuthState } from "../../context/context"
import { URL } from "../../constants"
import "./SingleBlogPage.css"

const SingleBlogPage = () => {
  const [blog,setBlog] = useState()
  const {blogId} = useParams()
  const authState = useAuthState()
  useEffect(()=>{
    getBlog()
  },[])
  const getBlog = async()=>{
    try {
     
       const reqOptions= {
            method: 'GET', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authState.token}`
            },
            
            
          }
          console.log(`${URL}blogs/${blogId}`);
         let blog = await fetch(`${URL}blogs/${blogId}`,reqOptions)
         blog = await blog.json()
         setBlog(blog.blog)
         console.log(blog.blog); 
    } catch (error) {
       // console.log(error);
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
