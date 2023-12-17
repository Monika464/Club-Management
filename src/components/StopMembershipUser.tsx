import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../App";
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext';
import { useSearchIndexCloseToday } from "../hooks/useSearchIndexCloseToday";
import { useSearchDatesPlusN } from "../hooks/useSearchDatesPlusN";
import { useSearchDatesByIndex } from "../hooks/useSearchDatesByIndex";
import { useSearchIndexAnyDate } from "../hooks/useSearchIndexAnyDate";
import { useNavigate } from "react-router-dom";



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
const [isMulti, setIsMulti] = useState<boolean>(false)
const [isPass, setIsPass] = useState<boolean>(false)

const paymentDateIndex  = useSearchDatesPlusN(0, currentUser?.uid);
const dzisIndex = useSearchIndexCloseToday();
const dzisData = useSearchDatesByIndex(dzisIndex);
const navigate = useNavigate();

//console.log("name", name, surname)
//ustawienie podstawowych danych

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
         
           //jesli mamy multi

         if(docSnap.data().optionMulti === true){  

           setIsMulti(true);
           setStopDate(dzisData);

                //jezeli jest debt w multi
                if(docSnap.data().debt){
                  console.log("uzytkownik zadluzony")        
                  setFinalDebt(docSnap.data().debt)
                 }

               //jezeli mamy pauze w 
                 if(docSnap.data().pause){
                  setCurrentUserPausaDate(docSnap.data().pause);
                  console.log("uzytkownik pauzujacy")
                 }
      }
      if(docSnap.data().optionPass === true){  
  

        setIsPass(docSnap.data().optionPass);

             //console.log("czy tu jest isPass",isPass)

             //jesli mamy pauze
             if(docSnap.data().pause){
            setCurrentUserPausaDate(docSnap.data().pause);
             console.log("uzytkownik pauzujacy")
            
                 //jezeli w pauzie sa do dodania 
                     if(docSnap.data().add){          
                       console.log("uzytkownik majacy treningi do dodania")
                       const pausaIndex = useSearchIndexAnyDate(currentUserPausaDate);
                       const convertToStopInd = pausaIndex + docSnap.data().add;
                       const dateSzukana = useSearchDatesByIndex(convertToStopInd)
                       setStopDate(dateSzukana);
                     }
   
                     //jezeli w pauzie jest zadluzenie
                     if(docSnap.data().debt){          
                       console.log("uzytkownik zadluzony")
                       setStopDate(dzisData);
                       setFinalDebt(docSnap.data().debt)
                     }
        } 
       //jesli mamy due
         if(docSnap.data().due){     
   
              if(paymentDateIndex && dzisIndex){
              
                 setStopDate(dzisData)
                 if(dzisIndex > paymentDateIndex){
                 setFinalDebt(dzisIndex - paymentDateIndex)
                 }          
              }
          }
     }
      
   } else {

    console.log("brak polaczenia z baza")
   }
          
   }
   


      }
   
          
useEffect(()=>{
    
      settingName()  
     
 },[currentUser,dzisIndex,paymentDateIndex,settingName])



     const dataToActivityArchive = {
      created_at: serverTimestamp(),
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
        restart: null,
        debt: finalDebt     
      })
      .then(()=>console.log("stop date update succesful"))
      .then(()=>  setStopDate(null))
      .then(()=>   setisSent(true))
    } 

    if(isMulti){
      await updateDoc(paymentDataRef, {
        pause: null,  
        add: null,
        stop: stopDate,  
        restart: null,
        debt: finalDebt     
      })
      .then(()=>console.log("stop date for multiuser update succesful"))
      .then(()=>  setStopDate(null))
      .then(()=>   setisSent(true))
      .then(()=>   setFinalDebt(null))
    }
   // console.log("czy tu jest isPass",isPass)   false
    if(isPass){
      await updateDoc(paymentDataRef, {
        pause: null,  
        add: null,
        stop: stopDate,  
        restart: null,
        debt: finalDebt,
        due: null  
      })
      .then(()=>console.log("stop date for multiuser update succesful"))
      .then(()=>  setStopDate(null))
      .then(()=>   setisSent(true))
      .then(()=>   setFinalDebt(null))

    }

          const docRef = await addDoc(collection(db, "activitiArchive"), dataToActivityArchive)
        .then(()=> console.log("archive"))  
        .then(()=> navigate('/userpanel'))
         


     

  }


return (<div>

  {/* <button onClick={getAddfromBase}>Skalkuluj date zakonczenia</button> */}
 
  {stopReported && <p>uczestnictwo w klubie zatrzymane</p>}
  {}

  {!stopReported && stopDate && <p>Czy chcesz zakończyć uczestnictwo w treningach? Treningi zostana zakonczone: {stopDate?.toDate()?.toString()}</p>}
  {finalDebt &&<p>istniejące zadłużenie: {finalDebt} treningów</p>}
  {!stopReported && <button onClick={sendStopToBase} className="btn">Potwierdż</button>}
  {isSent &&<p>wyslano</p>}

    
    </div>)
}

export default StopMembershipUser;