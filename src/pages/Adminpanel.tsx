// @flow
import React from "react";
import {Link, NavLink, Outlet, RouterProvider} from "react-router-dom";
import AuthRoute from "../components/AuthRoute";
import { db } from "../App";

export interface IAdminProps {};


const Adminpanel: React.FunctionComponent<IAdminProps> =(props) => {

console.log("AuthRoute",AuthRoute)

    //link do usera

    return (
        <div>
            adminpanel

            <div className="siteLink"> 
  
  <ul>
    <li> <Link to="/userpanel" className="userpanel">userpanel</Link></li>
 </ul>

 </div>

        </div>
    );
}


export default Adminpanel;


