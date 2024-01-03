import { Link } from "react-router-dom"
import { BackAfterInjuryUser } from "../components/BackAfterInjuryUser"
import BackAfterInjuryUser2 from "../components/stop/BackAfterInjuryUser2"
import { ReportInjuryUser2 } from "../components/stop/ReportInjuryUser2"

const InjuryUserpage: React.FunctionComponent =() => {

    return(

        <div>
         
            <ReportInjuryUser2/>

        
            <BackAfterInjuryUser2/>
            
   

        </div>
    )

}

export default InjuryUserpage