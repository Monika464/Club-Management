// @flow
//https://www.youtube.com/watch?v=tMpn7oUsNGA
//https://www.youtube.com/watch?v=4-GAobpDyXU

import React from "react";
import {Link, NavLink, Outlet, RouterProvider} from "react-router-dom";
import AuthRoute from "../components/AuthRoute"; 
import {useFetchDates} from "../hooks/useFetchDates.tsx";
import { DatePickerTrainings } from "../components/DatePickerTrainings.tsx";
import { collection } from "firebase/firestore";
import { db } from "../App.tsx";
import { useSearchDates } from "../hooks/useSearchDatesPlusN.tsx";
import { ShowDays } from "../components/ShowDays.tsx";
import { useSearchIndexToday } from "../hooks/useSearchIndexToday.tsx";


export interface IAdminProps {};  


const Adminpanel: React.FunctionComponent<IAdminProps> =(props) => {
    //useFetchDates();

    const dataFromBase = useFetchDates();

    useSearchDates(0);

    const dzisIndex = useSearchIndexToday()
    
   dataFromBase?.map((el,ind)=>{
    console.log("dzisIndex ",dzisIndex )
   })

    //link do usera

    return (
        <div>
            adminpanel
            <br></br>
  
            <br></br>
            <DatePickerTrainings/>
            <br></br>
            <ShowDays/>
            <div className="siteLink"> 
  
  <ul>
    <li> <Link to="/userpanel" className="userpanel">userpanel</Link></li>
 </ul>

 </div>

        </div>
    );
}


export default Adminpanel;


