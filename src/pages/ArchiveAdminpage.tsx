import { Link } from "react-router-dom"
import ArchiveAdminPayment from "../components/archive/ArchiveAdminPayment"
import ArchiveViewAdmin from "../components/archive/ArchiveViewAdmin"

export interface IArchiveAdminpage {

}

const ArchiveAdminpage: React.FunctionComponent<IArchiveAdminpage> =(props) => {


    return(
        <div>
            <div> <ArchiveViewAdmin/></div>
                <div><ArchiveAdminPayment/></div>
            

          
            <div className="siteLink"> 
              <ul>
                <li> <Link to="/adminpanel" className="userpanel">adminpanel</Link></li>
              </ul>
            </div>   
      

       </div>


    )
}

export default ArchiveAdminpage