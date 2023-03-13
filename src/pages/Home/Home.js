import React from 'react'
import { Link } from 'react-router-dom'
import homeImg from '../../assets/istockphoto-1253922154-612x612.jpeg'
import './Home.css'
const Home = () => {
  return (
    <div>
      
<div className="section flex">
    
    <div className="homepage-text">
    <h1 className="text-center my-3 ">
        Welcome To Blogspot
    </h1>
    <h2 className="text-center text-light"> Create awesome Blogposts and publish them online. <Link style={{color:'blue'}} to="/editor/0">Get Started</Link> </h2>
    
    </div>
    
    <div className="homepage-img">
       <img src={homeImg} alt=""/>
    </div>
    
    </div>
    
    
    </div>
  )
}

export default Home
