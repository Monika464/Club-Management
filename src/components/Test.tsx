import { useSearchDatesPlusN } from "../hooks/useSearchDatesPlusN";
import { useSearchIndexToday } from "../hooks/useSearchIndexToday"
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext';
import { ShowDays } from "./ShowDays";
import { useSearchDatesByIndex } from "../hooks/useSearchDatesByIndex";
import { Timestamp, addDoc, collection, doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../App";
import { useSearchIndexCloseToday } from "../hooks/useSearchIndexCloseToday";

export interface Itest{}
 


export const Test : React.FunctionComponent<Itest> =(props) => {

  const [isInjuryReporting, setIsIInjuryReporting] = useState<boolean>(false)

    const { currentUser} = useContext(UserContext); 

    const [treningiDoZapisu, setTreningiDoZapisu] = useState<number | null>(null)
const [injuryDescription, setInjuryDescripton] = useState<string | null>("")
const [injuryAlreadyReported, setInjuryAlreadyReported] = useState<boolean>(false)
const [injuryJustReported, setInjuryJustReported] = useState<boolean>(false)
const [name, setName] = useState<string | null>(null)
const [surname, setSurname] = useState<string | null>(null)


//const todayIndex =  useSearchIndexToday()


//console.log("index today",todayIndex);
//console.log("current user",currentUser);

   const paymentDateIndex  = useSearchDatesPlusN(0, currentUser?.uid)
   //const paymentDateIndex  = useSearchDatesPlusN(0, chosenUserId)
   console.log("paymentDateIndex",paymentDateIndex)

   const dzisIndex = useSearchIndexCloseToday()
   console.log("co tu mamy",dzisIndex)

   const wyliczdzisZIndexu = useSearchDatesByIndex(dzisIndex);
   console.log("wyliczdzisZIndexu",wyliczdzisZIndexu?.toDate())
   //tu ma byc data w bazie najblizsza dzis
   //tuuuu

   //console.log("wyliczdzisZIndexu",wyliczdzisZIndexu?.toDate())
  
   //console.log("index-daty-naleznosci", paymentDateIndex) 

   useEffect(()=>{

    if(dzisIndex && paymentDateIndex){
      if(dzisIndex >= paymentDateIndex){
          console.log("uczestnik dłuzyny nie dodajemy treningow")
      } else {
       console.log("treningi do zapisu",paymentDateIndex -dzisIndex )
       setTreningiDoZapisu(paymentDateIndex -dzisIndex)
       }
    }

    const settingName = async ()=>{
      if(currentUser){ 
        const userRef = doc(db, "usersData",currentUser?.uid);
        const docSnap = await getDoc(userRef);

            if (docSnap.exists()) {
              setName(docSnap.data().name);
              setSurname(docSnap.data().surname);
             }
       }

    }
    settingName()  
   },[dzisIndex,paymentDateIndex])


console.log("treningi do zapisu", treningiDoZapisu)


const handleDescriptInj =(event: ChangeEvent<HTMLInputElement>)=>{
  const { value } = event.target
  //console.log("event.target",event.target.value)
  //console.log("co mamy w value", value);
  setInjuryDescripton(value);
}
 console.log("name",name,surname);

 if(currentUser){

}
  const handleSendInjuryToBase =async () =>{  
    
      if(currentUser){ 
        const userRef = doc(db, "usersData",currentUser?.uid);
     
      const docSnap = await getDoc(userRef);
  
     if (docSnap.exists()) {
     // setName(docSnap.data().name);
     // setSurname(docSnap.data().surname);

      //console.log("Document data:", docSnap.data().add);
         if(docSnap.data().pausa){
           setInjuryAlreadyReported(true)  
            }  else {

                await updateDoc(userRef, {
                pause: wyliczdzisZIndexu
                })
                .then(()=> {console.log("injury reported")
                  setInjuryJustReported(true);
                   }
         
                   )

           }   
  } 
  //tutaj umiescic ta funkcje plus warunki 


  const data = {
    timestamp: serverTimestamp(),
     pausaData: wyliczdzisZIndexu,
     userUid: currentUser?.uid,
    kto: `${name} ${surname}`,
    injuryDescription: injuryDescription }

  const docRef = await addDoc(collection(db, "archive"), data)
  .then(()=> console.log("injury info added"))


  


  /*const docRef = await addDoc(collection(db, "archive"), {
    timestamp: serverTimestamp(),
     pausaData: wyliczdzisZIndexu,
     userUid: currentUser?.uid,
       kto: surname   
     });
*/
   }
}


/*
const handleBase =async ()=>{

  const data = {
timestamp: serverTimestamp,
pausaData: wyliczdzisZIndexu,
userUid: currentUser?.uid,
kto: surname

  }
  const newCityRef = doc(collection(db, "archive"));
  await setDoc(newCityRef, data);

}
*/

  return(<>
 
 <button onClick={()=>setIsIInjuryReporting(!injuryDescription)}> przycisk zglos od dzis</button>
{injuryAlreadyReported && <p>kontuzja zglaszana - edit</p>}
  {/*<ShowDays/>*/}

{/*{isInjuryReporting && <>*/}
{/*{treningiDoZapisu && <div> */}
  <p>Zgłaszasz kontuzje od {wyliczdzisZIndexu?.toDate().toString()}</p>
    <input
    type='text'
    name='text'
    value={injuryDescription}
    onChange={handleDescriptInj}
    placeholder="Co się stało?"
    required
  />
  {injuryJustReported && <p>Kontuzja zgłoszona</p>}
<button onClick={handleSendInjuryToBase} >Potwierdz zgłoszenie kontuzji</button>  
<br></br>
{/* <button onClick={testSendToBase} >base test</button> */}
 {/*} </div>}*/}
   {/*</>}*/}

 </>)

}

