import { useState } from "react"
import { URL } from "../../constants"
import { useAuthDispatch, useAuthState } from "../../context/context"
import './Comments.css'
import profileImg from "../../assets/profile_img.jpeg"
const Comments = (props) => {
  const [comments,setComments] = useState(props.blog.comments)
  const [comment,setComment] = useState("")
  const dispatch = useAuthDispatch()
  const authState = useAuthState()
  const submitComment=async (e)=>{
    e.preventDefault()
    try {
      dispatch({type:"REQUEST_INITIATED"})
       const reqOptions= {
            method: 'POST', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authState.token}`
            },
            
            body:JSON.stringify({blogId:props.blog._id,comment:comment})
            
          }
         
         let res = await fetch(`${URL}blogs/commentsubmit`,reqOptions)
         res = await res.json()
         if(res.success){
          let commentsTemp = [...comments]
          commentsTemp.push({comment:comment,user:authState.user.emailId})
          setComments(commentsTemp)
          console.log(comments);
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
    
    <div className="comments-container">
      <div className="newcomment">
        <h4>Add a new comment</h4>
      <textarea placeholder="Enter a comment" rows={4} cols={40} type="text" onChange={(e)=>{setComment(e.target.value)}} /> 
     <div className="comment-submit"><button className="btn" onClick={submitComment} >Post Comment</button></div> 
      </div>
    <br />
      <h3>Comments:</h3>

      <hr />
    <br />
      <div className="comment-container">
      {comments.map((comment)=>{
            return <div className="comment-content-main"><img className="comment-profile-img" src={profileImg} alt="" /><div className="comment-content">
             <div className="comment-content-head">  <h3>{comment.user}</h3> </div> 
             <p className="comment-content-value"> {comment.comment} </p> 
            </div>
            </div> 
        })}
      </div>
       
        <br />
     
    </div> 
   
  )
}

export default Comments
