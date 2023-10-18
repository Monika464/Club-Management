import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../App";
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext';
import { useSearchIndexCloseToday } from "../hooks/useSearchIndexCloseToday";
import { useSearchDatesPlusN } from "../hooks/useSearchDatesPlusN";
import { useSearchDatesByIndex } from "../hooks/useSearchDatesByIndex";
import { useSearchIndexAnyDate } from "../hooks/useSearchIndexAnyDate";



const StopMembershipUser: React.FunctionComponent =() => {
   
    const { currentUser} = useContext(UserContext); 
    const [isSent, setisSent] = useState<boolean>(false) ;
    //const [treningsDebt, setTreningsDebt] = useState<number | null>(null) ;
const [currentUserPausaDate, setCurrentUserPausaDate] = useState<Date | null>();
const [dueDate, setDueDate] = useState<Date | null>()
const [stopReported, setStopReported] = useState<boolean>(false)
const [stopDate, setStopDate] = useState<Date | null>()
//const [stopDateIndex, setStopDateIndex] = useState<number | null>(null) 
const [finalDebt, setFinalDebt] = useState<number | null>(null) 
const [name, setName] = useState<string | null>(null)
const [surname, setSurname] = useState<string | null>(null)

const paymentDateIndex  = useSearchDatesPlusN(0, currentUser?.uid);
const dzisIndex = useSearchIndexCloseToday();
const dzisData = useSearchDatesByIndex(dzisIndex);

//ustawienie imienia i nazwiska

useEffect(()=>{

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

//funkcja kalkulująca naleznosc

    const getAddfromBase =async ()=>{

 
      if(currentUser){

           const userRef = doc(db, "usersData",currentUser.uid);
           const docSnap = await getDoc(userRef);
                if (docSnap.exists()) {

                  //jesli mamy stop
                    if(docSnap.data().stop){
                    setStopReported(true)
                     }
                  //jesli mamy pauze
                   if(docSnap.data().pause){
                   setCurrentUserPausaDate(docSnap.data().pause);
                    console.log("uzytkownik pauzujacy")
                        if(docSnap.data().add){          
                           console.log("uzytkownik majacy treningi do dodania")
                           const pausaIndex = useSearchIndexAnyDate(currentUserPausaDate);
                           const convertToStopInd = pausaIndex + docSnap.data().add;
                           const dateSzukana = useSearchDatesByIndex(convertToStopInd)
                           setStopDate(dateSzukana);
                        }
                   } 
                  //jesli mamy due
                    if(docSnap.data().due){   
                         if(paymentDateIndex && dzisIndex){
                            console.log("odpalonypaymentDateIndex")
                            setStopDate(dzisData)
                            if(dzisIndex > paymentDateIndex){
                            setFinalDebt(dzisIndex - paymentDateIndex)
                            }          
                         }
                     } 
       
      } else {console.error("no database connection")}

    }
     }
    

     const dataToActivityArchive = {
        timestamp: serverTimestamp(),
        stopData: stopDate,
        userUid: currentUser?.uid,
        kto: `${name} ${surname}`,          
      } 

      //funkcja zapisujaca w bazie

     const sendStopToBase =async()=>{

    const paymentDataRef = doc(db, "usersData", currentUser.uid);
 
       if(currentUserPausaDate){    
        await updateDoc(paymentDataRef, {
          pause: null,  
          add: null,
          stop: stopDate,  
          restart: null     
        })
        .then(()=>console.log("stop date update succesful"))
        .then(()=>  setStopDate(null))
        .then(()=>   setisSent(true))
       
         
        const docRef = await addDoc(collection(db, "activitiArchive"), dataToActivityArchive)
        .then(()=> console.log("archive"))
     
         } 

    
     if(!currentUserPausaDate && !stopReported){
        await updateDoc(paymentDataRef, {
           stop: stopDate,
           due: null,
           restart: null
         })
         .then(()=>console.log("debt modified. update succesful"))
         .then(()=>  setStopDate(null))
         .then(()=>   setisSent(true))

         const docRef = await addDoc(collection(db, "activitiArchive"), dataToActivityArchive)
         .then(()=> console.log("archive"))
        }

    if(finalDebt){
       await updateDoc(paymentDataRef, {
          debt: finalDebt
        })
        .then(()=>console.log("debt modified. update succesful"))
        .then(()=>{setFinalDebt(null)})
       }
     

  }


return (<div>

  <button onClick={getAddfromBase}>Skalkuluj date zakonczenia</button>
 
  {stopReported && <p>juz zastopowane</p>}
  {stopDate && <p>Treningi zostana zakonczone: {stopDate?.toDate()?.toString()}</p>}
  {finalDebt &&<p>istniejące zadłużenie: {finalDebt} treningów</p>}
  <button onClick={sendStopToBase}>Potwierdż</button>
  {isSent &&<p>wyslano</p>}

    
    </div>)
}

export default StopMembershipUser;