import { Link } from "react-router-dom"
import { BackAfterInjury } from "../components/BackAfterInjuryAdmin"
import { BackAfterInjuryAdmin2 } from "../components/BackAfterInjuryAdmin2"
import ReportInjuryAdmin2 from "../components/ReportInjuryAdmin2"

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