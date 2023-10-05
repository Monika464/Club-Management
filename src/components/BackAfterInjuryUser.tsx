import { useSearchDatesPlusN } from "../hooks/useSearchDatesPlusN"

export interface Itest{}

import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext';
import { useSearchIndexCloseToday } from "../hooks/useSearchIndexCloseToday";
import { useSearchDatesByIndex } from "../hooks/useSearchDatesByIndex";
import { db } from "../App";
import { doc, getDoc, updateDoc } from "firebase/firestore";


export const BackAfterInjuryUser : React.FunctionComponent<Itest> =(props) => { 

  const [treningsToAdd, setTreningsToAdd] = useState<number | null>(null) ;
const [currentUserPausaDate, setCurrentUserPausaDate] = useState<Date | null>()

   // const indexDatyPowrotu = useSearchIndexAnyDate(chosenDateReturn)
//index daty najblizzej z dziadij
const { currentUser} = useContext(UserContext); 

const paymentDateIndex  = useSearchDatesPlusN(0, currentUser?.uid)

//console.log("paymentDateIndex",paymentDateIndex)

const dzisIndex = useSearchIndexCloseToday()

//console.log("co tu mamy",dzisIndex)



const calcDatOfNewPay =  useSearchDatesByIndex(dzisIndex + treningsToAdd)

  useEffect(()=>{

    if(currentUser){
    const getAddfromBase =async ()=>{
      const userRef = doc(db, "usersData",currentUser.uid);
      const docSnap = await getDoc(userRef);
      
      if (docSnap.exists()) {
        //console.log("Document data:", docSnap.data().add);
        setTreningsToAdd(docSnap.data().add) 
        setCurrentUserPausaDate(docSnap.data().pause)         
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }

     
    }
    getAddfromBase();

  }

  },[db,currentUser,dzisIndex])

// const indexDatyPowrotu czyli 


const pushToBaseNewDueDay =async ()=>{
  
  const userRef = doc(db, "usersData",currentUser.uid);
  await updateDoc(userRef, {
    due: calcDatOfNewPay,
    add: null,
    pause: null
  })
  .then(()=>{console.log("nowa płatnosc zapisana")})

  //wyczysc pausa date i wyczysc treningi z add

}

return(<>
<br></br><br></br>
 <button onClick={pushToBaseNewDueDay}>Wracam po kontuzji</button>
</>)
}