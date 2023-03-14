import React, { useRef } from 'react'
import './navbar.css'
import { NavLink } from 'react-router-dom'
import { useAuthDispatch, useAuthState } from '../context/context'
import { URL } from '../constants'
const Navbar = () => {
   const activeRef = useRef(null)
    const userState = useAuthState()
    const dispatchState = useAuthDispatch()
    const handleMenuIconClick = ()=>{
       if (activeRef.current.className==="navlinks active-icon"){
        activeRef.current.className="navlinks"
       }
       else{
        activeRef.current.className="navlinks active-icon"
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
        if(res.success){
          localStorage.clear()
        }
        console.log((res));
      } catch (error) {
        console.log(error.log);
      }
      
    }
  return (
    <div>
  <nav className="navbar">
      <div className="brand-title">
        <NavLink  to="/">Home </NavLink>
      </div>

      <div ref={activeRef} className="navlinks">
        <ul>
          <div className="nav-left">
            <li><NavLink  to="/blogs/" >Blogs </NavLink> </li>
            <li><NavLink to="/editor/0"> Editor </NavLink> </li>
          </div>

          {userState.user?<div  className="nav-right">
          <li  className="navitem mr-1">
            <NavLink to="/user/profile" >{userState.user.name}  </NavLink>
          </li>
          <li id="logout" className="navitem mr-1">
            <button className='btn' onClick={handleLogOut}>Logout </button>
          </li>
        </div>: <div  className="nav-right">
           
          <li className="navitem mr-1"><NavLink  to="/user/login">Login </NavLink> </li>
          <li className="navitem mr-1"><NavLink  to="/user/register">Register </NavLink> </li>
         
        </div>
          }  
        </ul>
      </div>
      <div id="menuicon" className="menu-icon">
        <NavLink  onClick={handleMenuIconClick} > <i className="fa fa-bars icon"></i></NavLink>
        
      </div>
    </nav>

    </div>
  )
}

export default Navbar
