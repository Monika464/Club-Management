import { useSearchDatesPlusN } from "../hooks/useSearchDatesPlusN"
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext';
import { useSearchIndexCloseToday } from "../hooks/useSearchIndexCloseToday";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../App";
import { useSearchDatesByIndex } from "../hooks/useSearchDatesByIndex";
export interface Itest{}  

export const Test : React.FunctionComponent<Itest> =(props) => { 

  const [injuryIsReported , setInjuryIsReported] = useState<boolean>(false)

  const [isStopOn, setIsStopOn] = useState<boolean>(false)
  const [oweUser, setOweUser] = useState<number | null>(null)
  const [stopDateNowOwe, setStopDateNowOwe] = useState<Date| null>(null)
  const [stopDateWithOwe, setStopDateWithOwe] = useState<Date| null>(null)

  const { currentUser} = useContext(UserContext); 

   const paymentDateIndex  = useSearchDatesPlusN(0, currentUser?.uid)

  const closeToTodayIndex = useSearchIndexCloseToday();
  const dataCloseToday = useSearchDatesByIndex(closeToTodayIndex);
  const dataPaymentEnd = useSearchDatesByIndex(paymentDateIndex - 1)

  const stopTreningsToConfirm =()=>{

       setIsStopOn(true)

       }

  useEffect(()=>{
console.log('closeToTodayIndex',closeToTodayIndex,'paymentDateIndex',paymentDateIndex)
      const stopTraings = async ()=>{

        //sprawdz czy przypadkiem nie jest pausa
        //wtedy komunikat ze sie nie da

        const userRef = doc(db, "usersData",currentUser?.uid);
        const docSnap = await getDoc(userRef);
           if (docSnap.exists()) {
               if(docSnap.data().pausa){
                  setInjuryIsReported(true)  
                  console.log(docSnap.data().add)
                }



                 if(paymentDateIndex && closeToTodayIndex){
       
                        if(paymentDateIndex-1 >= closeToTodayIndex){
                          console.log("nie ma zadluzenia");
                            setStopDateNowOwe(dataPaymentEnd)
                          } else {
                          const oweUser = closeToTodayIndex - (paymentDateIndex-1)
                          setOweUser(oweUser);
                          console.log("ma zadluzenie",oweUser);
                         setStopDateWithOwe(dataCloseToday)
                          }
                  }
                }
                 stopTraings();
              }
  },[isStopOn,currentUser])


  const confirStop =()=>{

             if(stopDateNowOwe ){  
  
                  const stopNoOwe =async ()=>{
                      if(currentUser){ 
                       const userRef = doc(db, "usersData",currentUser?.uid);
                       const docSnap = await getDoc(userRef);

                      await updateDoc(userRef, {
                      stop: dataPaymentEnd,     
                      })
                     .then(()=> {console.log("stop reported") })
                    }
                  }
               stopNoOwe();
               setIsStopOn(false);
               console.log("wpisuje do bazy stop z data",closeToTodayIndex)
               }

             if(stopDateWithOwe){

                const stopWithOwe = async ()=>{
                  if(currentUser){ 
                  const userRef = doc(db, "usersData",currentUser?.uid);

                  await updateDoc(userRef, {
                  stop: dataCloseToday,
                   owe: oweUser
                  })
               .then(()=> {console.log("stop & owe reported") })   
                 }
              }
           stopWithOwe();
           setIsStopOn(false);
           console.log("wpisuje do bazy stop + owe",closeToTodayIndex)
            }
          }

 
  //zmienne:
  //data ost platnosci, idex platnosci
  //data closeToDzis
  //jesli closeTodzis jest wieksze od indeks platnosci
  //zlicza zadluzenie i wpisuje w owe i date w stop
  //czy jest pausa (wtedy nie mozna stop)
  //potem restart 
  //restart od i jak owe puste to wspisuje w restart

  return (
  <>
       <button onClick={stopTreningsToConfirm}>Zatrzymaj treningi</button>
       
          {isStopOn && <div>
             {stopDateNowOwe ? <p>{stopDateNowOwe?.toDateString}</p> : <p>Zatrzymujesz uczestnictwo w dniu {stopDateWithOwe?.toDate().toString()} jestes dłużny {oweUser} treningów</p>}
             <button onClick={confirStop}>Potwierdz</button>
          </div>}
         

  </>)


}


/*
import { useSearchDatesPlusN } from "../hooks/useSearchDatesPlusN"
export interface Itest{}

import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext';
import { useSearchIndexCloseToday } from "../hooks/useSearchIndexCloseToday";
import { useSearchDatesByIndex } from "../hooks/useSearchDatesByIndex";
import { db } from "../App";
import { doc, getDoc, updateDoc } from "firebase/firestore";


export const Test : React.FunctionComponent<Itest> =(props) => { 

  const [treningsToAdd, setTreningsToAdd] = useState<number | null>(null) ;
const [currentUserPausaDate, setCurrentUserPausaDate] = useState<Date | null>()

   // const indexDatyPowrotu = useSearchIndexAnyDate(chosenDateReturn)
//index daty najblizzej z dziadij
const { currentUser} = useContext(UserContext); 

const paymentDateIndex  = useSearchDatesPlusN(0, currentUser?.uid)

console.log("paymentDateIndex",paymentDateIndex)

const dzisIndex = useSearchIndexCloseToday()

console.log("co tu mamy",dzisIndex)



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

*/
