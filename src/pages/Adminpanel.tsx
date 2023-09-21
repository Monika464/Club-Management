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
import { useSearchDates } from "../hooks/useSearchDatesPlusN.tsx";
import { ShowDays } from "../components/ShowDays.tsx";
import { useSearchIndexToday } from "../hooks/useSearchIndexToday.tsx";
import { WriteUsersInfo } from "../components/WriteUsersInfo.tsx";
import { ManagingUsers } from "../components/ManagingUsers.tsx";
import { ChooseStartDate } from "../components/ChooseStartDate";
import { SelectDatePicker } from "../components/SelectDatePicker.tsx";

export interface IAdminProps {};         


const Adminpanel: React.FunctionComponent<IAdminProps> =(props) => {  

  const [isEdited, setIsEdited] = useState<boolean>(false);

  //console.log('isEdited',isEdited)
  const handleEdit =()=>{
    setIsEdited(!isEdited)

  }
    //useFetchDates();

    const dataFromBase = useFetchDates();

    useSearchDates(0);

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
            <div> <ManagingUsers/></div>
   
           < SelectDatePicker/>
            
     
            

            <div className="siteLink"> 
              <ul>
                <li> <Link to="/userpanel" className="userpanel">userpanel</Link></li>
              </ul>
            </div>
         
        </div>
    );
}


export default Adminpanel;


