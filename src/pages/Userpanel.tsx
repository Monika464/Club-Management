import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from 'react'
import { UserContext } from '../context/UserContext';
import { UserProfile } from "../components/UserProfile";
import { ManagingUsers } from "../components/ManagingUsers";
import { WriteUsersInfo } from "../components/WriteUsersInfo";
import { Test } from "../components/Test";
import { TestingFnsLib } from "../components/testingFnsLib";
import { ReportInjuryUser } from "../components/ReportInjuryUser";


export interface IUserProps {};  


const Userpanel: React.FunctionComponent<IUserProps> =(props) => {
  
  const [isEditedInjury, setIsEditedInjury] = useState<boolean>(false);

  const { currentUser} = useContext(UserContext); 
  //console.log('currentUser userpan',currentUser);

  const handleEditInjury =()=>{
    setIsEditedInjury(!isEditedInjury)
  }


        return (
            <>
           Userpanel  
               <br></br>
              < UserProfile/>
      
             <WriteUsersInfo/>

            {isEditedInjury &&
             <ReportInjuryUser/>
            }
         <button onClick={handleEditInjury}>Zgłos kontuzje</button>


         <Test/>

            <div className="siteLink">  
  
             <ul>
              <li> <Link to="/adminpanel" className="adminpanel">adminpanel</Link></li>
            </ul>

          </div>

          
</>);
    }


export default Userpanel;