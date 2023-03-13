import React from 'react'
import { useNavigate } from 'react-router-dom'
import { URL } from '../../constants'
import { useAuthState } from '../../context/context'
import './BlogWithIcon.css'
const BlogWithIcon = (props) => {
  const navigate = useNavigate()
  const handleSeeMore = ()=>{
    navigate("/blog/"+props.blog._id)
  }
  const authState = useAuthState()
  const deleteBlog=async()=>{
    if( window.confirm("Are you sure?")){

            console.log(URL+"blogs/delete");
        let res=await fetch(URL+"blogs/delete",{
            method:"DELETE",
            headers: {
             "Content-Type": "application/json",
             "Authorization":`Bearer ${authState.token}`
             
    },
    body: JSON.stringify({blogId:props.blog._id } ),
        })
        res=await res.json()
       if(res.success){
        alert(res.message)
        navigate(0)
       }
    }
  }
  const editBlog=()=>{
    navigate("/editor/"+props.blog._id)
  }

  return (
    <div className='blog-container card'>
  
    <div className='blog' >
       {/* <div dangerouslySetInnerHTML={{ __html: props.blog.content }} /> */}
     <div className='blog-heading' > <h2>{props.blog.title}</h2><div className='edit-delete'>  <span> <i className='fa fa-trash' onClick={deleteBlog} ></i> </span>  <span> <i className='fa fa-edit' onClick={editBlog} ></i> </span> </div> </div>  
     {/* <div className='thumbnail'>{props.blog.imgUrls.length? <img src={`${props.blog.imgUrls[0]}`} alt="" />:""} </div>  */}

     <div dangerouslySetInnerHTML={{ __html: props.blog.content }} />

     
    </div>
    <button className='btn' onClick={handleSeeMore}>Click to see more</button>
    </div>
  )
}

export default BlogWithIcon
