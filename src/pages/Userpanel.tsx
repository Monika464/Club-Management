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
import { BackAfterInjuryUser } from "../components/BackAfterInjuryUser";
import { ReportInjuryUser2 } from "../components/ReportInjuryUser2";
import  StopMembershipUser  from "../components/StopMembershipUser";
import { RestoreMembershipUser } from "../components/RestoreMembershipUser";


export interface IUserProps {};  


const Userpanel: React.FunctionComponent<IUserProps> =(props) => {
  
  const [isEditedInjury, setIsEditedInjury] = useState<boolean>(false);
  const [isEditedInjury2, setIsEditedInjury2] = useState<boolean>(false);
  const [isEditedMembership, setIsEditedMembership] = useState<boolean>(false);

  const { currentUser} = useContext(UserContext); 
  //console.log('currentUser userpan',currentUser);

  const handleEditInjury =()=>{
    setIsEditedInjury(!isEditedInjury)
  }

  const handleEditInjury2 =()=>{
    setIsEditedInjury2(!isEditedInjury2)
   }

   const handleEditmembership =()=>{
    setIsEditedMembership(!isEditedMembership)

   }


        return (
            <>
           Userpanel  
               <br></br>
              < UserProfile/>
      
             <WriteUsersInfo/>

{/*}
            {isEditedInjury &&
             <ReportInjuryUser/>
            }
         <button onClick={handleEditInjury}>Zgłos kontuzje handleEditInjury </button>
          */}

<button onClick ={handleEditmembership} style={{color: "green"}}>membership  managing</button>
{isEditedMembership && <div>
     <StopMembershipUser/>
     <br></br><br></br>
     <RestoreMembershipUser/>
     </div>}
     <br></br>
    
     <br></br>
     <button onClick ={handleEditInjury} style={{color: "red"}}>injury managing</button>
     <br></br>
     {isEditedInjury && <div>
     <ReportInjuryUser2/>
     <BackAfterInjuryUser/>
     </div>}
    


     <br></br><br></br>

            <div className="siteLink">  
  
             <ul>
              <li> <Link to="/adminpanel" className="adminpanel">adminpanel</Link></li>
            </ul>

          </div>

          
</>);
    }


export default Userpanel;