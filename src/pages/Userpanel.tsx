import React from "react";
import { Link } from "react-router-dom";
import { useContext } from 'react'
import { UserContext } from '../context/UserContext';
import { UserProfile } from "../components/UserProfile";
import { ManagingUsers } from "../components/ManagingUsers";
import { WriteUsersInfo } from "../components/WriteUsersInfo";
import { Test } from "../components/Test";
import { TestingFnsLib } from "../components/testingFnsLib";


export interface IUserProps {};  


const Userpanel: React.FunctionComponent<IUserProps> =(props) => {

  const { currentUser} = useContext(UserContext); 
  //console.log('currentUser userpan',currentUser);


        return (
            <>
           Userpanel  
               <br></br>
              < UserProfile/>
      
             <WriteUsersInfo/>


             <Test/>
<br></br><br></br>
             <TestingFnsLib/>



            <div className="siteLink">  
  
             <ul>
              <li> <Link to="/adminpanel" className="adminpanel">adminpanel</Link></li>
            </ul>

          </div>

          
</>);
    }


export default Userpanel;