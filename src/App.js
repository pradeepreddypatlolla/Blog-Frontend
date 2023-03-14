
import './App.css';
import Navbar from './Navbar/Navbar';
import {  Outlet, Route,Routes } from 'react-router-dom';

import Home from './pages/Home/Home'

import Blogs from './pages/Blogs/Blogs';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import BlogEditor from './pages/BlogEditor/BlogEditor';
import SingleBlogPage from './pages/SingleBlogPage/SingleBlogPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import Loader from './components/Loader/Loader';
import Footer from './components/Footer/Footer';
function App() {
  return (
   <div className='app'>
    <Loader/>
    <Navbar/>

    <div className='main' >
    <Routes>

    <Route exact path='/' element ={<Home/>}  />

    <Route path="/editor/:blogId" element={ <ProtectedRoute> <BlogEditor/> </ProtectedRoute> }/>
    
    <Route path='/blogs' element={ <ProtectedRoute> <Blogs/> </ProtectedRoute> } />
    <Route path='/blog/:blogId' element={<ProtectedRoute> <SingleBlogPage/> </ProtectedRoute>} />
    <Route path='/user/profile' element={<ProtectedRoute> <ProfilePage/> </ProtectedRoute>} />
    <Route path='/user/login' element={<Login/>}/>

    <Route path="/user/register" element={<Register/>} />
    </Routes>
   </div> 
    <Footer/>
   </div>
  );
}

export default App;
