
export interface IMailboxUser{}

export interface IobjectUser{
    id: string 
}

import Select from 'react-select'
import { useModUsersForSelect } from '../../hooks/useModUsersForSelect ';
import makeAnimated from 'react-select/animated'; 
import { useState } from 'react';
import { db } from '../../App';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';

export const MailboxToUserSend : React.FunctionComponent<IMailboxUser> =(props) => {

    const usersModForSelect =  useModUsersForSelect(); 
const [messageSent, setMessageSent] = useState<boolean>(false)
  
    const samevalue = usersModForSelect.map(
      option => option.value
    )
   

    //const usersModForSelectwithAll = [...usersModForSelect, { value: samevalue.toString(), label: "all" }];
    const usersModForSelectwithAll = [...usersModForSelect, { value: "all", label: "all" }];

    //console.log('usersModForSelectwithAll',usersModForSelectwithAll)
    //console.log('usersModForSelect',usersModForSelect)

    const animatedComponents = makeAnimated();
    const[userChoice, setUserChoice] = useState<string[]>([])
    const [newmessage, setNewMessage] = useState('')
    const [isEditedmailToUsers, setIsEditedmailToUsers] = useState<boolean>(false)

  const handleSubmitForm =async (e)=>{
            e.preventDefault();
           // console.log("tu tu tu",newmessage,userChoice)

        const messageToAdd ={
               message: newmessage,
              receivers: userChoice,
              created_at: serverTimestamp(),
              fresh: true
            }

      if(messageToAdd){
  
      const docRef = await addDoc(collection(db, "adminmessages"), messageToAdd)
      .then(()=> console.log("admin message added"))
      .then(()=> setMessageSent(true))
        //.then(()=> navigate('/userpanel'))
      } 
}

//console.log("UserChoice",userChoice)
const handleEditMailToUsers =()=>{
  setIsEditedmailToUsers(!isEditedmailToUsers)
  //navigate('/userpanel')
}

return (<div>

<button onClick={handleEditMailToUsers} className='btn'>
         {isEditedmailToUsers ? 'Zamknij' : 'Edytuj mailing do userów'}
          </button>

{isEditedmailToUsers && 
<form className="add-message" onSubmit={handleSubmitForm}>
  <label>
<span>Napisz Wiadomość</span>
<textarea
required
onChange={(e)=>setNewMessage(e.target.value)}
value={newmessage}
></textarea>
</label>

<label>

<Select
      /*closeMenuOnSelect={closeMenu}  */
      components={animatedComponents} 
      closeMenuOnSelect={false} 
      isMulti
      options={usersModForSelectwithAll}
      onChange={(choice) => {     
     const selectedValues = choice.map(option => option.value); 
     //console.log("selectedValues",selectedValues)
      setUserChoice(selectedValues)
      
      }}
    />


</label>


  <button className="btn">Send</button>

</form> 

}

{messageSent && <p>wysłano</p>}





</div>)

}

export default MailboxToUserSend;