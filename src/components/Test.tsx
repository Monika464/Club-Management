import { useSearchDatesPlusN } from "../hooks/useSearchDatesPlusN"
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext';
import { useSearchIndexCloseToday } from "../hooks/useSearchIndexCloseToday";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../App";
import { useSearchDatesByIndex } from "../hooks/useSearchDatesByIndex";
export interface Itest{}  

export const Test : React.FunctionComponent<Itest> =(props) => { 

  const [oweUser, setOweUser] = useState<number | null>(null)

  const { currentUser} = useContext(UserContext); 

   const paymentDateIndex  = useSearchDatesPlusN(0, currentUser?.uid)

  const closeToTodayIndex = useSearchIndexCloseToday();

  const dataCloseToday = useSearchDatesByIndex(closeToTodayIndex);
  const dataPaymentEnd = useSearchDatesByIndex(paymentDateIndex - 1)

  const stopTreningsToConfirm =()=>{
  //robimy zmienna kliknieto stop
    //wyswietlic zmienna planujesz zatrzymac trengi
  }

const stopTraings = ()=>{

    if(paymentDateIndex && closeToTodayIndex){
     
         if(paymentDateIndex-1 >= closeToTodayIndex){

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
             console.log("wpisuje do bazy stop z data",closeToTodayIndex)

             } else {

               const oweUser = closeToTodayIndex - (paymentDateIndex-1)
               setOweUser(oweUser);
               console.log("ma zadluzenie",oweUser);
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
              stopWithOwe()
             }
      }}


      

  //zapisuje element stop z data kiedy sie koncza czyli ostatniej platnosci
  //ale jesli dzis jest pozniej niz data platnosci
  //dodajemy elemnt owe ilosc niezaplaconych
  //ponowny start sprawdza owe i odejmuje je po zapłaceniu
  //on klika zatrzymaj wyskakuje komunikat "chcesz zatryzmac dnia ostatniej platnosci
  //czyli o 1 dzien mniej niz naleznosc"
  //potwierdz wtedy wysyla


  //zmienne:
  //data ost platnosci, idex platnosci
  //data closeToDzis
  //jesli closeTodzis jest wieksze od indeks platnosci
  //zlicza zadluzenie i wpisuje w owe i date w stop
  //czy jest pausa (wtedy nie mozna stop)
  //potem restart 
  //restart od i jak owe puste to wspisuje w restart

  return (
  <div>
<button onClick={stopTraings}>Zatrzymaj treningi</button>

  </div>)

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






/*
import { useSearchDatesPlusN } from "../hooks/useSearchDatesPlusN";
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext';
import { useSearchDatesByIndex } from "../hooks/useSearchDatesByIndex";
import { addDoc, collection, doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
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
  setInjuryDescripton(value);
   }
 console.log("name",name,surname);



   const handleSendInjuryToBase =async () =>{  

    if(currentUser){
    
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
  .then(()=> console.log("injury info added"))
  }
}

  return(<>
 
 <button onClick={()=>setIsIInjuryReporting(!injuryDescription)}> przycisk zglos od dzis</button>
{injuryAlreadyReported && <p>kontuzja zglaszana - edit</p>}
 
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

*/