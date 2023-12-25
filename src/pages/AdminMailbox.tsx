import { Link, useNavigate } from "react-router-dom";
import { MailToAdminReceive } from "../components/mail/MailToAdminReceive";
import MailboxToUserSend from "../components/mail/MailBoxToUserSend";



export interface IAdminMailbox {

}

const AdminMailbox: React.FunctionComponent<IAdminMailbox > =(props) => {
    const navigate = useNavigate();
    
    return(<div>
         {/* <img src={mail} onClick={() => navigate('/userpanel')}/> */}
        <MailToAdminReceive/>

        <br></br>
        <MailboxToUserSend/>

        <br></br>
        <div className="siteLink"> 
              <ul>
                <li> <Link to="/adminpanel" className="userpanel">adminpanel</Link></li>
              </ul>
            </div>
    </div>)

}

export default AdminMailbox; 