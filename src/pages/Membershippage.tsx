import { Link } from "react-router-dom"
import { RestoreMembershipAdmin } from "../components/RestoreMembershipAdmin"
import StopMembershipAdmin from "../components/StopMembershipAdmin"
import StopMembershipAdmin2 from "../components/StopMembershipAdmin2"
import'./adminpanel.css'

const Membershipage: React.FunctionComponent =() => {

    return(

        <div>
             StopMembershipAdmin2 
            <StopMembershipAdmin2/>

            <br></br>

            RestoreMembershipAdmin
            <RestoreMembershipAdmin/>
            <br></br>


            <div className="siteLink"> 
              <ul>
                <li> <Link to="/adminpanel" className="userpanel">adminpanel</Link></li>
              </ul>
            </div>

        </div>
    )

}

export default Membershipage