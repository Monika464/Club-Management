import { getAuth, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate,NavLink, Navigate, redirect } from 'react-router-dom';
import Temple from './../assets/temple.svg'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext';
  import './navbar.css';  
  import AdminRoute from '../components/AdminRoute.tsx';
import { useRegisteringUsers } from '../hooks/useIsUserRegistered.tsx';

export interface INavbarProps {};


const Navbar: React.FunctionComponent<INavbarProps> =(props) => {
    const auth = getAuth();
    const [authing, setAuthing] = useState(false);
    const [isAdmin,setIsAdmin] = useState(false);
    
    const navigate = useNavigate();
    const { currentUser} = useContext(UserContext);
    const [rendered, setRendered] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        setRendered(true);
      }, 1000); // 1000 milisekund = 1 sekunda
    
      return () => {
        clearTimeout(timer); // W przypadku odmontowania komponentu przed zakończeniem opóźnienia
      };
    }, []);


    // useEffect(()=>{
    //   if(currentUser?.uid === "Y19J2pywqfd2YKN3zVVGlzYEWR82"){
    //     setIsAdmin(true);
    //   }

    // },[currentUser])

  

    const logout=()=> {
      navigate('/login');
        return signOut(auth);
        }

     const isUserRegistered = useRegisteringUsers()
     //console.log("isss", isUserRegistered)


    //  const handlePrzenies =()=>{
    //   console.log("czy wciska sie")
    //   navigate('/login');
    //   //redirect("/login");
    //  }

    return (
      
            <nav className="navbar">
   
   <ul>
   <li className="logo">
     <img src={Temple} alt="logo" />
     <span className="title"> Krakowskie Stowarzyszenie Bokserskie</span> 
   </li>
   
   
 
   {/* <li>
   {isAdmin &&  <Link to="/signup" className="navlink">Register user</Link >}
   </li> */}
   <li> 
   {currentUser && !isUserRegistered && <NavLink to="/signup2" className="navlink">Fill form</NavLink>} 
    </li>
    <li>
    {!currentUser &&    <NavLink to="/login" className="navlink">Login</NavLink>} 
    </li>
     
    <li> 
   {currentUser && <button className="btn" onClick={logout}  >Logout</button>}
    </li> 
    {/* <button onClick={handlePrzenies}>przenies</button> */}
 
   </ul>
 </nav> 
        
       
    )

}

export default Navbar;
