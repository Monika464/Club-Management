import { Link } from "react-router-dom"
import { RestoreMembershipAdmin } from "../components/stop/RestoreMembershipAdmin"
import StopMembershipAdmin from "../components/StopMembershipAdmin"
import StopMembershipAdmin2 from "../components/stop/StopMembershipAdmin2"


const Membershipage: React.FunctionComponent =() => {

    return(

        <div>
            <p className="title">Zatrzymaj członkostwo wybranego użytkownika</p>
            <StopMembershipAdmin2/>

            <br></br><br></br><br></br>

            <p className="title">Przywróć członkostwo wybranego uzytkownika</p>
            <RestoreMembershipAdmin/>
            <br></br>


        

        </div>
    )

}

export default Membershipage