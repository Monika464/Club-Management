import { Link } from "react-router-dom"
import ArchiveUserPayment from "../components/ArchiveUserPayment"
import ArchiveViewUser from "../components/ArchiveViewUser"


export interface IArchiveUserpage {

}

const ArchiveUserpage: React.FunctionComponent<IArchiveUserpage> =(props) => {


    return(
        <div>
                <div><ArchiveUserPayment/></div>
            <div> <ArchiveViewUser/></div>

          
            <div className="siteLink"> 
              <ul>
                <li> <Link to="/userpanel" className="userpanel">userpanel</Link></li>
              </ul>
            </div>   
      

       </div>


    )
}

export default ArchiveUserpage