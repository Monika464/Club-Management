import { Link } from "react-router-dom"
import { BackAfterInjuryUser } from "../components/BackAfterInjuryUser"
import BackAfterInjuryUser2 from "../components/BackAfterInjuryUser2"
import { ReportInjuryUser2 } from "../components/ReportInjuryUser2"

const InjuryUserpage: React.FunctionComponent =() => {

    return(

        <div>
         
            <ReportInjuryUser2/>

        
            <BackAfterInjuryUser2/>
            
            <div className="siteLink"> 
              <ul>
                <li> <Link to="/userpanel" className="userpanel">userpanel</Link></li>
              </ul>
            </div>

        </div>
    )

}

export default InjuryUserpage