import { getAuth, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Temple from './../assets/temple.svg'
  import './navbar.css';  
  
export interface INavbarProps {};


const Navbar: React.FunctionComponent<INavbarProps> =(props) => {
    const auth = getAuth();
    const [authing, setAuthing] = useState(false);
    const navigate = useNavigate();

    const logout= ()=> {
        return signOut(auth);
        }

     

    return (
        <div>
            <div className="navbar">
   
   <ul>
   <li className="logo">
     <img src={Temple} alt="logo" />
     <span className="title"> The club</span> 
   </li>
   
   
   <>
     <li> <Link to="/signup" className="navlink">Signup</Link></li>
     <li>  <Link to="/login" className="navlink">Login</Link></li>    
   </>  
  
   

    <li> 
   { <button className="btn" onClick={logout}  >Logout</button>}
    </li> 
 
   </ul>
 </div> 
        
        </div>
    )

}

export default Navbar;
