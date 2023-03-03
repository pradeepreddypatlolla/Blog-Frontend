import React, { useRef } from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'
import { useAuthDispatch, useAuthState } from '../context/context'
import { URL } from '../constants'
const Navbar = () => {
   const activeRef = useRef(null)
    const userState = useAuthState()
    const dispatchState = useAuthDispatch()
    const handleMenuIconClick = ()=>{
       if (activeRef.current.className==="navlinks active"){
        activeRef.current.className="navlinks"
       }
       else{
        activeRef.current.className="navlinks active"
       }
    }

    const handleLogOut = async()=>{
      dispatchState({type:"LOGOUT"})
      try {
        console.log();
       let res= await fetch(`${URL}user/logout` ,{
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json',
          },
          
        })
        res=await res.json()
        console.log((res));
      } catch (error) {
        console.log(error.log);
      }
      
    }
  return (
    <div>
  <nav className="navbar">
      <div className="brand-title">
        <Link to="/">Home </Link>
      </div>

      <div ref={activeRef} className="navlinks">
        <ul>
          <div className="nav-left">
            <li><Link to="/blogs/" >Blogs </Link> </li>
            <li><Link to="/editor">Blog editor </Link> </li>
          </div>

          {userState.user?<div  className="nav-right">
          <li  className="navitem mr-1">
            <Link to="/user/profile" id="username">Username  </Link>
          </li>
          <li id="logout" className="navitem mr-1">
            <button onClick={handleLogOut}>Logout </button>
          </li>
        </div>:
          <div  className="nav-right">
          <li className="navitem mr-1"><Link to="/user/login">Login </Link> </li>
          <li className="navitem mr-1"><Link to="/user/register">Register </Link> </li>
        </div>


          
          }
        
          

          
        </ul>
      </div>
      <div id="menuicon" className="menu-icon">
        <Link to="/" onClick={handleMenuIconClick} > <i className="fa fa-bars icon"></i></Link>
        
      </div>
    </nav>

    </div>
  )
}

export default Navbar
