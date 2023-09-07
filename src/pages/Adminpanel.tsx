// @flow
import React from "react";
import {Link, NavLink, Outlet, RouterProvider} from "react-router-dom";
import AuthRoute from "../components/AuthRoute";
import {DatesTrainings} from "../components/DatesTrainings.tsx";
import { DatePickerTrainings } from "../components/DatePickerTrainings.tsx";


export interface IAdminProps {};


const Adminpanel: React.FunctionComponent<IAdminProps> =(props) => {

//console.log("AuthRoute",AuthRoute)

    //link do usera

    return (
        <div>
            adminpanel
            <br></br>
            <DatesTrainings/>
            <br></br>
            <DatePickerTrainings/>
    

            <div className="siteLink"> 
  
  <ul>
    <li> <Link to="/userpanel" className="userpanel">userpanel</Link></li>
 </ul>

 </div>

        </div>
    );
}


export default Adminpanel;


