import React from "react";
import { Link } from "react-router-dom";
import { useContext } from 'react'
import { UserContext } from '../context/UserContext';


export interface IUserProps {};


const Userpanel: React.FunctionComponent<IUserProps> =(props) => {

  const { currentUser} = useContext(UserContext);
  //console.log('currentUser userpan',currentUser);


        return (
            <div>
           Userpanel

      <div className="siteLink">  
  
    <ul>
      <li> <Link to="/adminpanel" className="adminpanel">adminpanel</Link></li>
   </ul>

   </div>
            </div>
        );
    }


export default Userpanel;