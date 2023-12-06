import { BackAfterInjury } from "../components/BackAfterInjuryAdmin"
import { BackAfterInjuryAdmin2 } from "../components/BackAfterInjuryAdmin2"
import ReportInjuryAdmin2 from "../components/ReportInjuryAdmin2"

const Injurypage: React.FunctionComponent =() => {

    return(

        <div>
            ReportInjuryAdmin
            <ReportInjuryAdmin2/>

            <br></br>

            RestoreMembershipAdmin
            <BackAfterInjuryAdmin2/>
            <br></br>


        </div>
    )

}

export default Injurypage