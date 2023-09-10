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
import { useSearchDates } from "../hooks/useSearchdates.tsx";
import { ShowDays } from "../components/ShowDays.tsx";


export interface IAdminProps {}; 


const Adminpanel: React.FunctionComponent<IAdminProps> =(props) => {
    //useFetchDates();

    const data =  useFetchDates();

    useSearchDates()

  // console.log("dataAdminPan",data)

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


