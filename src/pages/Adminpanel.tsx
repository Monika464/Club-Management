// @flow
//https://www.youtube.com/watch?v=tMpn7oUsNGA
//https://www.youtube.com/watch?v=4-GAobpDyXU

import React, { useState } from "react";
import {NavLink, useNavigate} from "react-router-dom";
//import AuthRoute from "../components/AuthRoute"; 
import {useFetchDates} from "../hooks/useFetchDates.tsx";
// import { DatePickerTrainings } from "../components/DatePickerTrainings.tsx";
// import { collection } from "firebase/firestore";
// import { db } from "../App.tsx";
//import { useSearchDates } from "../hooks/useSearchDatesPlusN.tsx";
//import { ShowDays } from "../components/ShowDays.tsx";
import { useSearchIndexToday } from "../hooks/useSearchIndexToday.tsx";
// import { WriteUsersInfo } from "../components/WriteUsersInfo.tsx";
// import { ManagingUsers } from "../components/ManagingUsers.tsx";
// import { ChooseStartDate } from "../components/ChooseStartDate";
// import { SelectDatePicker } from "../components/SelectDatePicker.tsx";
// import { useSearchDatesPlusN } from "../hooks/useSearchDatesPlusN.tsx";
import { useFetchUsers } from "../hooks/useFetchUsers.tsx";
// import { Test } from "../components/Test.tsx";
// import { Test2 } from "../components/Test2.tsx";
// import { ReportInjury} from "../components/ReportInjuryAdmin.tsx";
// import { BackAfterInjury } from "../components/stop/BackAfterInjuryAdmin.tsx";
// import { UsersPayments } from "../components/UserPayments.tsx";
// import StopMembershipUser from "../components/stop/StopMembershipUser.tsx";
// import StopMembershipAdmin from "../components/StopMembershipAdmin.tsx";
// import { RestoreMembershipAdmin } from "../components/stop/RestoreMembershipAdmin.tsx";
// import ReportInjuryAdmin2 from "../components/stop/ReportInjuryAdmin2.tsx";
// import { BackAfterInjuryAdmin2 } from "../components/stop/BackAfterInjuryAdmin2.tsx";
// import SwithPassToMulti from "../components/SwithPassToMulti.tsx";
// import SwitchButtonTest from "../components/SwitchButtonTest.tsx";
// import SwitchMultiToPass from "../components/SwitchMultiToPass.tsx";
// import AttendanceList from "../components/AttendanceList.tsx";
//import { AdminRole } from "../components/AdminRole.tsx";
//import SidebarAdmin from "../components/SidebarAdmin.tsx";
// import DashboardIcon from '../assets/dashboard_icon.svg';
// import AddIcon from '../assets/add_icon.svg';
// import Create from "./Create.tsx";
// import StopMembershipAdmin2 from "../components/stop/StopMembershipAdmin2.tsx";
import './userpanel.css'
// import MailboxToUserSend from "../components/mail/MailBoxToUserSend.tsx";
// import { MailToAdminReceive } from "../components/mail/MailToAdminReceive.tsx";
// import mail from '../assets/mail.png'
import EmailComponent from "../components/mail/EmailComponent.tsx";
export interface IAdminProps {};         


const Adminpanel: React.FunctionComponent<IAdminProps> =(props) => {  

 //const {usersInfo} = useFetchUsers();
 //console.log("usersInfoAdmin",usersInfo)
 const navigate = useNavigate();
 
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [isEditedPayment, setIsEditedPayment] = useState<boolean>(false);
  const [isEditedInjury, setIsEditedInjury] = useState<boolean>(false);
  //const [isEditedBackAfterInjury, setIsEditedBackAfterInjury] = useState<boolean>(false);
  const [isEditedStopMembership, setIsEditedStopMembership] = useState<boolean>(false);
  //const [isEditedMembership, setIsEditedMembership] = useState<boolean>(false);
  const [isEditedMultiPass, setIsEditedMultiPass] = useState<boolean>(false);
  const [isEditedAttendance, setIsEditedAttendance] = useState<boolean>(false);
  const [isMouseOver, setIsMouseOver] = useState(false);
  //console.log('isEdited',isEdited) 
  const handleEdit =()=>{
    setIsEdited(!isEdited)
  }

  const handleEditPayment =()=>{
    setIsEditedPayment(!isEditedPayment)
  }
  //const handleEditInjury =()=>{
    //setIsEditedInjury(!isEditedInjury)
  //}

  //const handleEditBackAfterInjury=()=>{
   // setIsEditedBackAfterInjury(!isEditedBackAfterInjury)
  //}

  const handleEditStopMembership=()=>{
    setIsEditedStopMembership(!isEditedStopMembership)
  }


  //const handleEditmembership =()=>{
  //  setIsEditedMembership(!isEditedMembership)
 //  }

   const handlemanageInjury =()=>{
    setIsEditedInjury(!isEditedInjury)

   }

   const handlemanageMultiPass =()=>{
    setIsEditedMultiPass(!isEditedMultiPass)

   }


   const handlemanageAttendance =()=>{
    setIsEditedAttendance(!isEditedAttendance)

   }

  //const wynik = useSearchDatesPlusN(3); 
  //console.log("wynik",wynik)

    const dataFromBase = useFetchDates();

    //useSearchDates(0);

    const dzisIndex = useSearchIndexToday()
    
   dataFromBase?.map((el,ind)=>{
   // console.log("dzisIndex ",dzisIndex )
   })

   const handelonmouseover =()=>{
    setIsMouseOver(!isMouseOver);
  }
    return (<>
        <div className="main">
            <div className='box'>

              <div className='zero'>
                     <div className="profile">
                      <p>Witaj adminie  </p> 
                      <br></br><br></br>
                    {/* <img src={mail} onClick={() => navigate('/mailboxadmin')}/>  */}
                    </div>

                    <div className="mail">
                       <EmailComponent 
                         collectionName={"usersmessages"} 
                         currentId = {"empty"} 
                         onClick ={() => navigate('/mailboxadmin')}  
                         onmouseover={()=> handelonmouseover()}
                         isMO ={isMouseOver}
                         />
                    </div>
             </div>
             <div className='content'>
<div className='linkowisko'>
            <ul className="linkshape">
                <li>              
                    <NavLink to="/home"  >Aktualności
               
                    </NavLink>
                </li>
                <li>              
                    <NavLink  to="/create"  >Stwórz
               
                    </NavLink>
                </li>
                <li>              
                    <NavLink  to="/membershipadmin"  >Zatrzymaj
                
                    </NavLink>
                </li>
                <li>              
                    <NavLink  to="/paymentadmin"  >Płatnośc
                 
                    </NavLink>
                </li>
                <li>              
                    <NavLink  to="/injuryadmin"  >Kontuzja
                  
                    </NavLink>
                </li>
                <li>              
                    <NavLink  to="/report"  >Księgowość
             
                    </NavLink>
                </li>
                <li>              
                    <NavLink  to="/usersreport"  >Użytkownicy
             
                    </NavLink>
                </li>
             

                <li>              
                    <NavLink  to="/datespicker"  >Treningi
             
                    </NavLink>
                </li>
                <li>              
                    <NavLink  to="/attendancelist"  >Obecność
                 
                    </NavLink>
                </li>
                <li>              
                    <NavLink  to="/archiveadmin"  >Archiwum
            
                    </NavLink>
                </li>
                <li>              
                    <NavLink  to="/signup"  >Nowy
                
                    </NavLink>
                </li>

            
            </ul>


        
        <br></br><br></br>     
      {/* <MailToAdminReceive/> */}
            <br></br><br></br>
            {/* <MailboxToUserSend/> */}

            </div>
        </div>
       
        </div>
        </div>
        
        </> );
}


export default Adminpanel;


