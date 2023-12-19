import { Link } from "react-router-dom"
import SwitchMultiToPass from "../components/SwitchMultiToPass"
import SwithPassToMulti from "../components/SwithPassToMulti"
import { UsersPayments } from "../components/UserPayments"


const PaymentAdminPage: React.FunctionComponent =() => {

    return(

        <div>
           UsersPayments
            <UsersPayments/>
            <br></br> <br></br>

<SwitchMultiToPass/>
<br></br> <br></br>
<SwithPassToMulti/>
<br></br> <br></br>

<div className="siteLink"> 
              <ul>
                <li> <Link to="/adminpanel" className="userpanel">adminpanel</Link></li>
              </ul>
            </div>

    </div>
    )

}

export default PaymentAdminPage