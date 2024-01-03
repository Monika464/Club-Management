import { Link } from "react-router-dom"
import { BackAfterInjury } from "../components/stop/BackAfterInjuryAdmin"
import { BackAfterInjuryAdmin2 } from "../components/stop/BackAfterInjuryAdmin2"
import ReportInjuryAdmin2 from "../components/stop/ReportInjuryAdmin2"

const Injurypage: React.FunctionComponent =() => {

    return(

        <div>
            ReportInjuryAdmin
            <ReportInjuryAdmin2/>
   

            Back after injury
            <BackAfterInjuryAdmin2/>
         
            <div className="siteLink"> 
              <ul>
                <li> <Link to="/adminpanel" className="userpanel">adminpanel</Link></li>
              </ul>
            </div>

        </div>
    )

}

export default Injurypage