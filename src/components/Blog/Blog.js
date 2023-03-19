import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../Blog/Blog.css'
const Blog = (props) => {
  const navigate = useNavigate()
  const handleSeeMore = ()=>{
    navigate("/blog/"+props.blog._id)
  }

  return (
    <div className='blog-container card'>
  
    <div className='blog' >
      <div> {props.blog.updatedAt.substring(0,10)} </div>
     <div> <h2>{props.blog.title}</h2></div> 

    
     <div dangerouslySetInnerHTML={{ __html: props.blog.content }} />

     
    </div>
    <button className='btn' onClick={handleSeeMore}>Click to see more</button>
    </div>
  )
}

export default Blog
