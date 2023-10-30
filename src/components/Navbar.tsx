import { getAuth, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Temple from './../assets/temple.svg'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext';
  import './navbar.css';  
  
export interface INavbarProps {};


const Navbar: React.FunctionComponent<INavbarProps> =(props) => {
    const auth = getAuth();
    const [authing, setAuthing] = useState(false);
    const navigate = useNavigate();
    const { currentUser} = useContext(UserContext);

    const logout= ()=> {
        return signOut(auth);
        }

     

    return (
        <div>
            <div className="navbar">
   
   <ul>
   <li className="logo">
     <img src={Temple} alt="logo" />
     <span className="title"> Krakowskie Stowarzyszenie Bokserskie</span> 
   </li>
   
   
   <>
   {!currentUser && <li> <Link to="/signup" className="navlink">Signup</Link></li>}
   {!currentUser && <li> <Link to="/signup2" className="navlink">Signup2</Link></li>}
    {!currentUser &&  <li>  <Link to="/login" className="navlink">Login</Link></li>}   
   </>  
  
   

    <li> 
   {currentUser && <button className="btn" onClick={logout}  >Logout</button>}
    </li> 
 
   </ul>
 </div> 
        
        </div>
    )

}

export default Navbar;
