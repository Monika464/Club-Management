import React from "react";
import { Link } from "react-router-dom";
import { useContext } from 'react'
import { UserContext } from '../context/UserContext';
import { UserProfile } from "../components/UserProfile";
import { ManagingUsers } from "../components/ManagingUsers";
import { WriteUsersInfo } from "../components/WriteUsersInfo";


export interface IUserProps {}; 


const Userpanel: React.FunctionComponent<IUserProps> =(props) => {

  const { currentUser} = useContext(UserContext); 
  //console.log('currentUser userpan',currentUser);


        return (
            <div>
           Userpanel  
           <br></br>
        < UserProfile/>
      
        <WriteUsersInfo/>

      <div className="siteLink">  
  
    <ul>
      <li> <Link to="/adminpanel" className="adminpanel">adminpanel</Link></li>
   </ul>

   </div>
            </div>
        );
    }


export default Userpanel;