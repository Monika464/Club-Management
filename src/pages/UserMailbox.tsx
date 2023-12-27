import MailboxToUserReceive from "../components/mail/MailBoxToUserReceive"
import mail from '../assets/mail.png'
import { useNavigate } from "react-router-dom";
import MailToAdminSend from "../components/mail/MailToAdminSend";
import { useState } from "react";


export interface IUserMailbox {

}

const UserMailbox: React.FunctionComponent<IUserMailbox > =(props) => {
    const navigate = useNavigate();
    const [isEditedmailToAdmin, setIsEditedmailToAdmin] = useState<boolean>(false)

    const handleEditMailToAdmin =()=>{
        setIsEditedmailToAdmin(!isEditedmailToAdmin)
        //navigate('/userpanel')
      }

    return(<div>
         {/* <img src={mail} onClick={() => navigate('/userpanel')}/> */}
        <MailboxToUserReceive/>


        <br></br>
        <button onClick={handleEditMailToAdmin} className="btn">
         {isEditedmailToAdmin ? 'Zamknij' : 'Wyślij wiadomośc do trenera'}
          </button>
          {isEditedmailToAdmin &&
        <MailToAdminSend/>
    }
    </div>)

}

export default UserMailbox; 
