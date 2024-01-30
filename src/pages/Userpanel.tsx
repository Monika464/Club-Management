import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useContext } from 'react'
import { UserContext } from '../context/UserContext';
import { UserProfile } from "../components/UserProfile";
import { DisplayUserDataUser} from "../components/displayDetails/DisplayUserDataUser";
import { useNavigate } from "react-router-dom";
import EmailComponent from "../components/mail/EmailComponent";
export interface IUserProps {};     
import './userpanel.css'
import { DisplayNextTrainings } from "../components/displayDetails/DisplayNextTrainings";

const Userpanel: React.FunctionComponent<IUserProps> =() => {  
  
  // const [isEditedInjury, setIsEditedInjury] = useState<boolean>(false);
  // const [isEditedInjury2, setIsEditedInjury2] = useState<boolean>(false);
  // const [isEditedMembership, setIsEditedMembership] = useState<boolean>(false);
  // const [rendered, setRendered] =   useState(false);
  // const [isAdmin,setIsAdmin] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);

  const { currentUser} = useContext(UserContext); 
  //console.log('currentUser userpan',currentUser);
  const navigate = useNavigate();


  
const handelonmouseover =()=>{
  setIsMouseOver(!isMouseOver);
}




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
              collectionName={"usersmails"} 
              currentId = {currentUser?.uid}   
              onClick={() => navigate('/mailboxuser')}
              onmouseover={()=> handelonmouseover()}
              isMO ={isMouseOver}
       
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


              <li>
              <NavLink  to="/instruction">Instrukcja 
          
              </NavLink>
              </li>
             
              </ul>     
            
         
                          
         
             
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