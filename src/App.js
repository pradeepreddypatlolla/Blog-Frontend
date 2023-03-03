
import './App.css';
import Navbar from './Navbar/Navbar';
import {  Route,Routes } from 'react-router-dom';

import Home from './pages/Home/Home'
import Editor from './pages/Editor/Editor'
import Blogs from './pages/Blogs/Blogs';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
function App() {
  return (
   <div>
    <Navbar/>


    <Routes>

    <Route exact path='/' element ={<Home/>}  />

    <Route path="/editor" element={ <ProtectedRoute> <Editor/> </ProtectedRoute> }/>
    
    <Route path='/blogs' element={ <ProtectedRoute> <Blogs/> </ProtectedRoute> } />
    <Route path='/user/login' element={<Login/>}/>
    <Route path="/user/register" element={<Register/>} />
    </Routes>

   </div>
  );
}

export default App;
