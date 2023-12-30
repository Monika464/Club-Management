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
import { DisplayUserDataUser, DisplayUserTrainings } from "../components/displayDetails/DisplayUserDataUser";
import Sidebar from "../components/Sidebar";
import ShowAvatar from "../components/ShowAvatar";
import ChoosingAvatar from "../components/ChoosingAvatar";
import Project from "./Project";
import AddIcon from '../assets/add_icon.svg';
import ArchiveUserPayment from "../components/ArchiveUserPayment";
import MailboxToUserSend from "../components/mail/MailBoxToUserSend";
import MailboxToUserReceive from "../components/mail/MailBoxToUserReceive";
import mail from '../assets/mail.png'
import { useNavigate } from "react-router-dom";
import MailToAdminSend from "../components/mail/MailToAdminSend";
import EmailComponent from "../components/mail/EmailComponent";
export interface IUserProps {};     
import './userpanel.css'
import { DisplayNextTrainings } from "../components/displayDetails/DisplayNextTrainings";

const Userpanel: React.FunctionComponent<IUserProps> =(props) => {  
  
  const [isEditedInjury, setIsEditedInjury] = useState<boolean>(false);
  const [isEditedInjury2, setIsEditedInjury2] = useState<boolean>(false);
  const [isEditedMembership, setIsEditedMembership] = useState<boolean>(false);
  const [rendered, setRendered] =   useState(false);
  const [isAdmin,setIsAdmin] = useState(false);

  const { currentUser} = useContext(UserContext); 
  //console.log('currentUser userpan',currentUser);
  const navigate = useNavigate();


  useEffect(() => {
    const timer = setTimeout(() => {
      setRendered(true);
    }, 1000); // 1000 milisekund = 1 sekunda
  
    return () => {
      clearTimeout(timer); // W przypadku odmontowania komponentu przed zakończeniem opóźnienia
    };
  }, []);

  useEffect(()=>{
    if(currentUser?.uid === "Y19J2pywqfd2YKN3zVVGlzYEWR82"){
      setIsAdmin(true);
    }

  },[currentUser,rendered])

  const handleEditInjury =()=>{
    setIsEditedInjury(!isEditedInjury)
  }

  const handleEditInjury2 =()=>{
    setIsEditedInjury2(!isEditedInjury2)
   }

   const handleEditmembership =()=>{
    setIsEditedMembership(!isEditedMembership)  

   }
console.log("jakie tutaj id usera",currentUser?.uid)

        return ( 
        
            <> 
<div className='main'>
        <div className='box'>

        <div className='zero'>
            <div className="profile">        
             < UserProfile/>
             </div> 
             {/* <ChoosingAvatar/> */}

               {/* <img src={mail} onClick={() => navigate('/mailboxuser')}/>  */}
              <div className="mail">
              <EmailComponent 
              collectionName={"adminmessages"} 
              currentId = {currentUser?.uid}   
              onClick={() => navigate('/mailboxuser')}
              />
              </div>
              
</div>
<div className='content'>
<div className='linkowisko'>
            <ul className="linkshape">
            <li>              
                <NavLink  to="/home" >Aktualności
                  </NavLink>
              </li>

              <li>
              <NavLink  to="/archiveuser" >Archiwum
               </NavLink>
              </li>
              <li>              
                <NavLink  to="/injuryuser" >Kontuzja          
                </NavLink>
              </li>

              <li>
              <NavLink  to="/membershipuser">Członkostwo 
          
              </NavLink>
              </li>
             
            
            
         <br></br>   
               <li>
              <NavLink  to="/test" >test
            
                  </NavLink>
              </li>
              <li>
              {isAdmin &&<Link to="/adminpanel">Administracja</Link>}
              </li>
            </ul>
         
              <br></br><br></br>
            <br></br><br></br>
            {/* <MailToAdminSend/>      */}
</div>
<div className='glowna'>
           <DisplayNextTrainings
           userid={currentUser?.uid}       
           />
            <br></br><br></br>
          <DisplayUserDataUser/>
          <br></br><br></br>
</div>
            <div>  
  
             
               
           

          </div>
</div>
</div>
   </div>            
</>);
    }


export default Userpanel;