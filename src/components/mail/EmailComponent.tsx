import { collection, getDocs } from "firebase/firestore";
import { db } from "../../App";
import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import mail from '../../assets/mail.png'
import mailblurred from '../../assets/mailblurred.png'
import { useNavigate } from "react-router-dom";
import { isModuleNamespaceObject } from "util/types";



export interface IEmailprops {
  
    collectionName: string | undefined;
    currentId: string | undefined;
    onClick: () => any;
    onmouseover: () => any;
    isMO: boolean;
}

export interface IFreshMessageToTrainer {
   id: string;
   fresh: boolean  
}
export interface IFreshMessageToUser {
    id: string;
    receivers: string[];
    fresh: boolean  
 }

export const EmailComponent: React.FunctionComponent<IEmailprops> = (props) => {
    const { currentUser} = useContext(UserContext); 
    const [freshMessagestoTrainer, setFreshMessagestoTrainer] = useState<IFreshMessageToTrainer [] | null>(null);
    const [freshMessagestoUser, setFreshMessagestoUser] = useState<IFreshMessageToUser[] | null>(null);
const [isShaking, setIsShaking] = useState<boolean>(false)
    const navigate = useNavigate();
    // pierwszy

    //console.log("mailblurred", mailblurred)

    if(props.collectionName ===  "usersmessages"){
    

            const getDataToTrainer = useCallback(async () => {   
                const messageRef = collection(db, props.collectionName);    
                const querySnapshot = await getDocs(messageRef );
              //console.log("props.collectionName", props.collectionName)
  
                const temp = [];
                const unsub = querySnapshot.forEach((doc) => {    
                // console.log("obiekt", doc.data().fresh, doc.id,doc.data().userid)
         
                    if(doc.data()){

                  const obiekt = {
                     id: doc.id,
                     fresh: doc.data().fresh,
                     }
                 temp.push(obiekt)   
               };
               setFreshMessagestoTrainer(temp)   
              })  
            return  unsub; 
      
         },[db, currentUser,props])  

        useEffect(() => {
            getDataToTrainer();
        }, [db, currentUser, getDataToTrainer, props.currentId]);

       // console.log('messagetoTrain',freshMessagestoTrainer)

        const checkAndLogTrain = useCallback(() => {
            if (freshMessagestoTrainer) {
                 freshMessagestoTrainer.map((fressMes)=>{
                 if ( fressMes.fresh === true) {
                   // console.log("trzesiemy trenera");
                    setIsShaking(true)
                 return;
                } 
                }) 
         }
        }, [freshMessagestoTrainer, props.currentId]);

         useEffect(() => {
            checkAndLogTrain();
         }, [checkAndLogTrain,freshMessagestoTrainer]);

  }
//drugi

if(props.collectionName === "adminmessages"){

 const getDataToUser = useCallback(async () => {   

    if (currentUser) {
        console.log("currentId",props.currentId ) 
        const messageRef = collection(db, props.collectionName);    
        const querySnapshot = await getDocs(messageRef );
        //console.log("props.collectionName", props.collectionName)
 
            const temp = [];
             const unsub = querySnapshot.forEach((doc) => {    
                    if(doc.data()){
                        const obiekt = {
                        id: doc.id,
                        fresh: doc.data().fresh,
                        receivers: doc.data().receivers
                        }
                     temp.push(obiekt)   
                     };
            setFreshMessagestoUser(temp)
            })
    
            return  unsub; 
    }      
 },[db, currentUser,props])  

 useEffect(() => {
     getDataToUser();
  // console.log('drugiWQiadmosciusera',freshMessagestoUser)

  }, [db, currentUser, getDataToUser, props.currentId]);
 // console.log('wiadUsera',freshMessagestoUser)

  const checkAndLogUser = useCallback(() => {
      if (freshMessagestoUser) {
          freshMessagestoUser.forEach((fressMes)=>{
          if (fressMes.receivers.includes(props.currentId) || fressMes.receivers.includes("all")){
            if (fressMes.fresh) {
              setIsShaking(true)
               // console.log("trzesiemy usera");
                return;
            }
            
         
           }
         }) 
    }
  }, [freshMessagestoUser, props.currentId]);

  useEffect(() => {
    checkAndLogUser();
  }, [checkAndLogUser,freshMessagestoUser]);

}


//console.log("z email komponentu isMO",props.isMO)



    return(<div>



          {/* <div className="mailIcon2"> */}
          {isShaking ? <img src={props.isMO ? mailblurred : mail} onClick={props.onClick} className="mailIcon2" onMouseOver={props.onmouseover} />
          : <img  src={props.isMO ? mailblurred : mail} onClick={props.onClick} className="mailIcon1" onMouseOver={props.onmouseover} 
          />}
          <div
 
/>
          {/* </div> */}
    </div>)
}

export default EmailComponent;