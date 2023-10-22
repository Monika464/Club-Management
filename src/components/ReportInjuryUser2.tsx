import { ChangeEvent, useContext, useEffect, useState } from "react";
import { UserContext } from '../context/UserContext';
import { useSearchDatesByIndex } from "../hooks/useSearchDatesByIndex";
import { useSearchDatesPlusN } from "../hooks/useSearchDatesPlusN";
import { useSearchIndexCloseToday } from "../hooks/useSearchIndexCloseToday";
import { db } from "../App";
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";





export const ReportInjuryUser2: React.FunctionComponent =() => {

  const { currentUser} = useContext(UserContext); 

  const paymentDateIndex  = useSearchDatesPlusN(0, currentUser?.uid);
  console.log('paymentDateIndex',paymentDateIndex) 


const dzisIndex = useSearchIndexCloseToday();
const dzisData = useSearchDatesByIndex(dzisIndex);
const [name, setName] = useState<string | null>(null)
const [surname, setSurname] = useState<string | null>(null);
const [stopReported, setStopReported] = useState<boolean>(false)
const [pausaReported, setPausaReported] = useState<boolean>(false)
const [pausaDate, setPausaDate] = useState<Date | null>();
const [pausaDebt, setPausaDebt] = useState<number | null>(null) 
const [pausaAdd, setPausaAdd] = useState<number | null>(null) 
const [isSent, setisSent] = useState<boolean>(false) ;
const [injuryDescription, setInjuryDescripton] = useState<string | null>("");
const [injuryIsEdited, setInjuryIsEdited] = useState<boolean>(false);

   //ustawienie imienia i nazwiska

useEffect(()=>{

  const settingName = async ()=>{

      if(currentUser){ 
        const userRef = doc(db, "usersData",currentUser?.uid);
        const docSnap = await getDoc(userRef);

            if (docSnap.exists()) {
              setName(docSnap.data().name);
              setSurname(docSnap.data().surname);

                //jesli mamy stop
                if(docSnap.data().stop){
                  setStopReported(true)
                   }
                if(docSnap.data().pause){
                    setPausaReported(true)
                }
             }
       }

    }
    settingName();
    
    if(paymentDateIndex !== null && dzisIndex){
                        
      setPausaDate(dzisData)
      //console.log("odpalonypaymentDateIndex",pausaDate?.toDate())
      if(paymentDateIndex >= dzisIndex ){
        setPausaAdd(paymentDateIndex - dzisIndex)


      }
      if(dzisIndex > paymentDateIndex){
        setPausaDebt(dzisIndex - paymentDateIndex)
      }          
   }
   },[dzisIndex,paymentDateIndex])

   console.log("dzisindex",dzisIndex)

   //funkcja kalkulująca naleznosc

   const getAddfromBase =async ()=>{

    //console.log("paymentDateIndex",paymentDateIndex)
    //paymentDateIndex? console.log("paymentDateIndex",paymentDateIndex) : console.log("nic",paymentDateIndex)

/* 
    if(currentUser){

         const userRef = doc(db, "usersData",currentUser.uid);
         const docSnap = await getDoc(userRef);
              if (docSnap.exists()) {
                
                //jesli mamy stop
                  if(docSnap.data().stop){
                  setStopReported(true)
                   }
                   if(docSnap.data().pause){
                    setPausaReported(true)
                   }
                          
                //jesli mamy due
                  if(docSnap.data().due){   
              
                       
                   } 
     
    } else {console.error("no database connection")}

  }
*/
  console.log('pausaAdd',pausaAdd)
   }

//console.log('pausaDate', pausaDate,'pausaDebt',pausaDebt )
``
const dataToActivityArchive = {
  timestamp: serverTimestamp(),
  pausaData: pausaDate,
  userUid: currentUser?.uid,
  kto: `${name} ${surname}`, 
  reason:  injuryDescription        
} 

//funkcja zapisujaca w bazie

const sendStopToBase =async()=>{

  const paymentDataRef = doc(db, "usersData", currentUser.uid);

      
  if(!pausaReported && !stopReported){
    await updateDoc(paymentDataRef, {
       pause: pausaDate,
       due: null,
       restart: null,
       add: pausaAdd
     })
     .then(()=>console.log("debt modified. update succesful"))
     .then(()=>  setPausaDate(null))
     .then(()=>   setisSent(true))
     .then(()=>   setPausaAdd(null))

     const docRef = await addDoc(collection(db, "activitiArchive"), dataToActivityArchive)
     .then(()=> console.log("archive"))
    }

if(pausaDebt){
   await updateDoc(paymentDataRef, {
      debt: pausaDebt
    })
    .then(()=>console.log("debt modified. update succesful"))
    .then(()=>{setPausaDebt(null)})
   }
 

}

const handleDescriptInj =(event: ChangeEvent<HTMLInputElement>)=>{
  const { value } = event.target
setInjuryDescripton(value);
 }






return (
<>

{/*<button onClick ={handleEditInjury} style={{color: "red"}}>injury managing</button>*/}


{/*<button onClick={getAddfromBase}>Wylicz pauze </button>*/}
<br></br>
{stopReported && <p>Treningi sa juz zakończone</p>}
{pausaReported && <p>Treningi sa zawieszone z powodu kontuzji</p>}

  {pausaDate && !pausaReported && !stopReported && <p>Treningi zostana zawieszone: {pausaDate?.toDate()?.toString()}</p>}
  {pausaDebt &&!pausaReported && !stopReported && <p>istniejące zadłużenie: {pausaDebt} treningów</p>}
  {pausaAdd && !pausaReported && !stopReported && <p>pozostało opłaconych treningów: {pausaAdd} treningów</p>}
  {pausaDate && !pausaReported && !stopReported && <div>
                 Uzupelnij formularz wspisując powód zawieszenia
                   <input
                     type='text'
                     name='text'
                     value={injuryDescription}
                     onChange={handleDescriptInj}
                     placeholder="Co się stało?"
                     required
                   />
                 <button onClick={sendStopToBase}>Potwierdż</button>
                {isSent &&<p>wyslano</p>} 
  </div>}
 

    </>)
}