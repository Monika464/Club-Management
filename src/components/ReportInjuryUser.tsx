import { useSearchDatesPlusN } from "../hooks/useSearchDatesPlusN";
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext';
import { useSearchDatesByIndex } from "../hooks/useSearchDatesByIndex";
import { addDoc, collection, doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../App";
import { useSearchIndexCloseToday } from "../hooks/useSearchIndexCloseToday";

export interface Itest{}
 


export const ReportInjuryUser : React.FunctionComponent<Itest> =(props) => {

  const [isInjuryReporting, setIsIInjuryReporting] = useState<boolean>(false)

    const { currentUser} = useContext(UserContext); 

    const [treningiDoZapisu, setTreningiDoZapisu] = useState<number | null>(null)
    const [zadluzenieDoZapisu, setZadluzenieDoZapisu] = useState<number | null>(null)
const [injuryDescription, setInjuryDescripton] = useState<string | null>("")
const [injuryAlreadyReported, setInjuryAlreadyReported] = useState<boolean>(false)
const [injuryJustReported, setInjuryJustReported] = useState<boolean>(false)
const [name, setName] = useState<string | null>(null)
const [surname, setSurname] = useState<string | null>(null)


   const paymentDateIndex  = useSearchDatesPlusN(0, currentUser?.uid)
   //const paymentDateIndex  = useSearchDatesPlusN(0, chosenUserId)
   console.log("paymentDateIndex",paymentDateIndex)

   const dzisIndex = useSearchIndexCloseToday()
   console.log("co tu mamy",dzisIndex)

   const wyliczdzisZIndexu = useSearchDatesByIndex(dzisIndex);
   console.log("wyliczdzisZIndexu",wyliczdzisZIndexu?.toDate())


    useEffect(()=>{

        if(dzisIndex && paymentDateIndex){
            if(dzisIndex >= paymentDateIndex){
                 console.log("uczestnik dłuzny / dodajemy dlug /nie dodajemy treningow")
                 setZadluzenieDoZapisu(dzisIndex - paymentDateIndex)
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
  setInjuryDescripton(value);
   }
 console.log("name",name,surname);



   const handleSendInjuryToBase =async () =>{  

    if(currentUser){

      if(treningiDoZapisu){
    
              const userRef = doc(db, "usersData",currentUser?.uid);
              const docSnap = await getDoc(userRef);
                 if (docSnap.exists()) {
                     if(docSnap.data().pausa){
                        setInjuryAlreadyReported(true)  
                      }  else {
                       await updateDoc(userRef, {
                      pause: wyliczdzisZIndexu,
                      add: treningiDoZapisu
                      })
                      .then(()=> {console.log("injury reported")
                       setInjuryJustReported(true);
                        })
                      }           
                  } 

              const data = {
                    timestamp: serverTimestamp(),
                    pausaData: wyliczdzisZIndexu,
                    userUid: currentUser?.uid,
                    kto: `${name} ${surname}`,
                    injuryDescription: injuryDescription }

               const docRef = await addDoc(collection(db, "archive"), data)
               .then(()=> console.log("injury info added, status okay"))

        }

    if(zadluzenieDoZapisu){
           
      const userRef = doc(db, "usersData",currentUser?.uid);
      const docSnap = await getDoc(userRef);
         if (docSnap.exists()) {
             if(docSnap.data().pausa){
                setInjuryAlreadyReported(true)  
              }  else {
               await updateDoc(userRef, {
              pause: wyliczdzisZIndexu,
              debt: zadluzenieDoZapisu
              })
              .then(()=> {console.log("injury reported")
               setInjuryJustReported(true);
                })
              }           
          } 


          const data = {
            timestamp: serverTimestamp(),
            pausaData: wyliczdzisZIndexu,
            userUid: currentUser?.uid,
            kto: `${name} ${surname}`,
            injuryDescription: injuryDescription,
            debt: zadluzenieDoZapisu
          
          }
            

       const docRef = await addDoc(collection(db, "archive"), data)
       .then(()=> console.log("injury info added, debt exists"))


          
        }
    }
}

  return(<>
 
 <button onClick={()=>setIsIInjuryReporting(!isInjuryReporting)}> przycisk zglos od dzis</button>
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


 </>)

}

