import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../App";
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext';
import { useSearchIndexCloseToday } from "../hooks/useSearchIndexCloseToday";
import { useSearchDatesPlusN } from "../hooks/useSearchDatesPlusN";
import { useSearchDatesByIndex } from "../hooks/useSearchDatesByIndex";
import { useSearchIndexAnyDate } from "../hooks/useSearchIndexAnyDate";




export const Test2: React.FunctionComponent =() => {

   
    const { currentUser} = useContext(UserContext); 

    const [treningsToAdd, setTreningsToAdd] = useState<number | null>(null) ;
    //const [treningsDebt, setTreningsDebt] = useState<number | null>(null) ;
const [currentUserPausaDate, setCurrentUserPausaDate] = useState<Date | null>();
const [dueDate, setDueDate] = useState<Date | null>()
const [stopReported, setStopReported] = useState<boolean>(false)
const [stopDate, setStopDate] = useState<Date | null>()
//const [stopDateIndex, setStopDateIndex] = useState<number | null>(null) 
const [finalDebt, setFinalDebt] = useState<number | null>(null) 

const paymentDateIndex  = useSearchDatesPlusN(0, currentUser?.uid);
const dzisIndex = useSearchIndexCloseToday();
const dzisData = useSearchDatesByIndex(dzisIndex);
console.log('dzisData',dzisData?.toDate())
console.log('dzisIndex',dzisIndex)
console.log('paymentDateIndex',paymentDateIndex)





    const getAddfromBase =async ()=>{

      if(currentUser){

    const userRef = doc(db, "usersData",currentUser.uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
            if(docSnap.data().stop){
               setStopReported(true)
             }
             if(docSnap.data().pause){
              setCurrentUserPausaDate(docSnap.data().pause);
              console.log("uzytkownik pauzujacy")
                if(docSnap.data().add){
                  setTreningsToAdd(docSnap.data().add)
                  console.log("uzytkownik majacy treningi do dodania")
                }
                //if(docSnap.data().debt){
                 // setTreningsDebt(docSnap.data().debt)
                //}
            } 
            if(docSnap.data().due){
              setDueDate(docSnap.data().due)
            }
       
      } else {console.error("no database connection")}

    }
     }
    
 


useEffect(()=>{

  if(paymentDateIndex && dzisIndex){
       setStopDate(dzisData)
    if(dzisIndex > paymentDateIndex){
      setFinalDebt(dzisIndex - paymentDateIndex)
    }
  }

  console.log('stopDate',stopDate?.toDate(),'FinalDebt',finalDebt)

   },[dueDate,paymentDateIndex ])


   const sendStopToBase =async()=>{

    const paymentDataRef = doc(db, "usersData", currentUser.uid);

    if(currentUserPausaDate){
      await updateDoc(paymentDataRef, {
        pause: null, 
        stop: dzisData
      })
      .then(()=>console.log("debt modified. update succesful"))
      //.then(()=>{setDebtSent(true)})
     }
  
       if(currentUserPausaDate && treningsToAdd){
        
       const pausaIndex = useSearchIndexAnyDate(currentUserPausaDate);
       const convertToStopInd = pausaIndex + treningsToAdd;
       const dateSzukana = useSearchDatesByIndex(convertToStopInd)

        await updateDoc(paymentDataRef, {
          pause: null,  
          add: null,
          stop: dateSzukana,       
        })
        .then(()=>console.log("stop date update succesful"))
         } 

    
     if(stopDate){
        await updateDoc(paymentDataRef, {
           stop: stopDate,
           due: null
         })
         .then(()=>console.log("debt modified. update succesful"))
         //.then(()=>{setDebtSent(true)})
        }

    if(finalDebt){
       await updateDoc(paymentDataRef, {
          debt: finalDebt
        })
        .then(()=>console.log("debt modified. update succesful"))
        //.then(()=>{setDebtSent(true)})
       }
     

  }


return (<div>

  <button onClick={getAddfromBase}>getAddfromBase</button>
  <button onClick={sendStopToBase}>sendStopToBase</button>
  
   { /*
    <button onClick={stopTreningsToConfirm}>Zatrzymaj treningi</button>
       
       {isStopOn && <div>
          {stopDateNowOwe ? <p>{stopDateNowOwe?.toDateString}</p> : <p>Zatrzymujesz uczestnictwo w dniu {stopDateWithOwe?.toDate().toString()} jestes dłużny {oweUser} treningów</p>}
          <button onClick={confirStop}>Potwierdz</button>
       </div>}
      */
}
    
    </div>)
}