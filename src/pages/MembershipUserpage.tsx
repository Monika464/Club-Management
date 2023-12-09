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


        </div>
    )

}

export default MembershiUserpage