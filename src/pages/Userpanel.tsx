import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
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
import { DisplayUserDataUser, DisplayUserTrainings } from "../components/DisplayUserDataUser";
import Sidebar from "../components/Sidebar";
import ShowAvatar from "../components/ShowAvatar";
import ChoosingAvatar from "../components/ChoosingAvatar";
import Project from "./Project";
import AddIcon from '../assets/add_icon.svg';
import ArchiveUserPayment from "../components/ArchiveUserPayment";

export interface IUserProps {};     


const Userpanel: React.FunctionComponent<IUserProps> =(props) => {  
  
  const [isEditedInjury, setIsEditedInjury] = useState<boolean>(false);
  const [isEditedInjury2, setIsEditedInjury2] = useState<boolean>(false);
  const [isEditedMembership, setIsEditedMembership] = useState<boolean>(false);

  const [isAdmin,setIsAdmin] = useState(false);

  const { currentUser} = useContext(UserContext); 
  //console.log('currentUser userpan',currentUser);


  useEffect(()=>{
    if(currentUser?.uid === "Y19J2pywqfd2YKN3zVVGlzYEWR82"){
      setIsAdmin(true);
    }

  },[currentUser])

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
            
             < UserProfile/>

             {/* <ChoosingAvatar/> */}
             <br></br>

{/* <button onClick ={handleEditmembership} style={{color: "green"}}>membership  managing</button>
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
     </div>} */}


<ul>
  <li>
  <NavLink  to="/membershipuser" className="navlink">Członkostwo w klubie
      <img src={AddIcon} alt="add project icon"></img>
   </NavLink>
  </li>
  <li>              
    <NavLink  to="/injuryuser" className="navlink">Zgłaszanie kontuzji
    <img src={AddIcon} alt="add project icon"></img>
      </NavLink>
   </li>
   <li>              
    <NavLink  to="/home" className="navlink">Home
    <img src={AddIcon} alt="add project icon"></img>
      </NavLink>
   </li>
   <li>
   <NavLink  to="/archiveuser" className="navlink">Archive
    <img src={AddIcon} alt="add project icon"></img>
      </NavLink>
   </li>


</ul>

        

<br></br><br></br>
     <DisplayUserDataUser/>


     <br></br><br></br>

            <div className="siteLink">  
  
             <ul>

              <li> {isAdmin &&<Link to="/adminpanel" className="adminpanel">adminpanel</Link>}</li>
            </ul>

          </div>

               
</>);
    }


export default Userpanel;