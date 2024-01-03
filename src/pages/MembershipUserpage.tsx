import { Link } from "react-router-dom"
import { BackAfterInjuryUser } from "../components/BackAfterInjuryUser"
import { RestoreMembershipUser } from "../components/stop/RestoreMembershipUser"
import StopMembershipUser from "../components/stop/StopMembershipUser"



const MembershiUserpage: React.FunctionComponent =() => {

    return(

        <div>
         
            <StopMembershipUser/>

            <br></br>


            <RestoreMembershipUser/>
            <br></br>
            
        

        </div>
    )

}

export default MembershiUserpage