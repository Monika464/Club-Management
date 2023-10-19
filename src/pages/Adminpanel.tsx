// @flow
//https://www.youtube.com/watch?v=tMpn7oUsNGA
//https://www.youtube.com/watch?v=4-GAobpDyXU

import React, { useState } from "react";
import {Link, NavLink, Outlet, RouterProvider} from "react-router-dom";
import AuthRoute from "../components/AuthRoute"; 
import {useFetchDates} from "../hooks/useFetchDates.tsx";
import { DatePickerTrainings } from "../components/DatePickerTrainings.tsx";
import { collection } from "firebase/firestore";
import { db } from "../App.tsx";
//import { useSearchDates } from "../hooks/useSearchDatesPlusN.tsx";
import { ShowDays } from "../components/ShowDays.tsx";
import { useSearchIndexToday } from "../hooks/useSearchIndexToday.tsx";
import { WriteUsersInfo } from "../components/WriteUsersInfo.tsx";
import { ManagingUsers } from "../components/ManagingUsers.tsx";
import { ChooseStartDate } from "../components/ChooseStartDate";
import { SelectDatePicker } from "../components/SelectDatePicker.tsx";
import { useSearchDatesPlusN } from "../hooks/useSearchDatesPlusN.tsx";
import { useFetchUsers } from "../hooks/useFetchUsers.tsx";
import { Test } from "../components/Test.tsx";
import { Test2 } from "../components/Test2.tsx";
import { ReportInjury} from "../components/ReportInjuryAdmin.tsx";
import { BackAfterInjury } from "../components/BackAfterInjuryAdmin.tsx";
import { UsersPayments } from "../components/UserPayments.tsx";
import StopMembershipUser from "../components/StopMembershipUser.tsx";
import StopMembershipAdmin from "../components/StopMembershipAdmin.tsx";
import { RestoreMembershipAdmin } from "../components/RestoreMembershipAdmin.tsx";

export interface IAdminProps {};         


const Adminpanel: React.FunctionComponent<IAdminProps> =(props) => {  

 const {usersInfo} = useFetchUsers();
 //console.log("usersInfoAdmin",usersInfo)

  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [isEditedPayment, setIsEditedPayment] = useState<boolean>(false);
  const [isEditedInjury, setIsEditedInjury] = useState<boolean>(false);
  const [isEditedBackAfterInjury, setIsEditedBackAfterInjury] = useState<boolean>(false);
  const [isEditedStopMembership, setIsEditedStopMembership] = useState<boolean>(false);

  //console.log('isEdited',isEdited) 
  const handleEdit =()=>{
    setIsEdited(!isEdited)
  }

  const handleEditPayment =()=>{
    setIsEditedPayment(!isEditedPayment)
  }
  const handleEditInjury =()=>{
    setIsEditedInjury(!isEditedInjury)
  }

  const handleEditBackAfterInjury=()=>{
    setIsEditedBackAfterInjury(!isEditedBackAfterInjury)
  }

  const handleEditStopMembership=()=>{
    setIsEditedStopMembership(!isEditedStopMembership)
  }

  //const wynik = useSearchDatesPlusN(3); 
  //console.log("wynik",wynik)

    const dataFromBase = useFetchDates();

    //useSearchDates(0);

    const dzisIndex = useSearchIndexToday()
    
   dataFromBase?.map((el,ind)=>{
   // console.log("dzisIndex ",dzisIndex )
   })

    //link do usera 

    return (
        <div>
            adminpanel   
            <br></br>
            <button onClick={handleEdit}>Edit training dates</button>
            <br></br>  
            
           
            {isEdited &&  
           <div>
            <DatePickerTrainings/>   
            <br></br>
            <ShowDays/>
            </div> 
            } 
           <br></br>
           {/* <div> <ManagingUsers/></div> */}
   
           {/*< SelectDatePicker/> */}
           <br></br>
            <button onClick={handleEditPayment}>Edit users payment</button>
            <br></br>  
           {isEditedPayment &&  
          <UsersPayments/>
            }
       
            <br></br><br></br>
            <button onClick={handleEditInjury}>Edit users injury</button>
            {isEditedInjury && 
            <ReportInjury/>
            }
            <br></br>
            <br></br>

           <button onClick={handleEditBackAfterInjury}>Edit users back after injury</button>
           {isEditedBackAfterInjury &&  
           <BackAfterInjury/>
            }
            <br></br>
            <br></br>

            <button onClick={handleEditStopMembership}>Handlemembership</button>
            { isEditedStopMembership && 
            <div>
            <StopMembershipAdmin/>
            <br></br>
            <br></br>
            <RestoreMembershipAdmin/>
            </div>}

            <div className="siteLink"> 
              <ul>
                <li> <Link to="/userpanel" className="userpanel">userpanel</Link></li>
              </ul>
            </div>
         
        </div>
    );
}


export default Adminpanel;


