import { useEffect, useState } from "react"
import BlogWithIcon from "../../components/BlogWithIcon/BlogWithIcon"
import { useAuthState } from "../../context/context"
import { URL } from "../../constants"
import { Link } from "react-router-dom"

const ProfilePage = () => {
    const [blogs,setBlogs] = useState([])
    const authState = useAuthState()
    useEffect(()=>{
        getMyBlogs()
    },[])

    const getMyBlogs = async()=>{
        try {
           const reqOptions= {
                method: 'GET', // or 'PUT'
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${authState.token}`
                },
                
                
              }
              console.log(URL+'user/profile');
             let blogs = await fetch(URL+'user/profile',reqOptions)
             blogs = await blogs.json()
             setBlogs(blogs.blogs)
             console.log(blogs.blogs); 
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div>
        <div className='subnav'> <Link>Home/</Link> <Link>Profile</Link> </div>
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
