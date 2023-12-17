import { Link } from "react-router-dom"
import { BackAfterInjuryUser } from "../components/BackAfterInjuryUser"
import { RestoreMembershipUser } from "../components/RestoreMembershipUser"
import StopMembershipUser from "../components/StopMembershipUser"



const MembershiUserpage: React.FunctionComponent =() => {

    return(

        <div>
         
            <StopMembershipUser/>

            <br></br>


            <RestoreMembershipUser/>
            <br></br>
            
            <div className="siteLink"> 
              <ul>
                <li> <Link to="/userpanel" className="userpanel">userpanel</Link></li>
              </ul>
            </div>

        </div>
    )

}

export default MembershiUserpage