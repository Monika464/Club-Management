import { Link } from "react-router-dom"
import SwitchMultiToPass from "../components/SwitchMultiToPass"
import SwithPassToMulti from "../components/SwithPassToMulti"
import { UsersPayments } from "../components/UserPayments"


const PaymentAdminPage: React.FunctionComponent =() => {

    return(

        <div>
           Płatności
           <br></br>
            <UsersPayments/>
            <br></br> <br></br><br></br>
Przełącz użytkownika z multi na karnet
<SwitchMultiToPass/>
<br></br> <br></br>

Przełącz użytkownika na karnetu na multi
<SwithPassToMulti/>
<br></br> <br></br>



    </div>
    )

}

export default PaymentAdminPage