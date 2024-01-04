import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../App";
import { useCallback, useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext';
import { useSearchIndexCloseToday } from "../../hooks/useSearchIndexCloseToday";
import { useSearchDatesPlusN } from "../../hooks/useSearchDatesPlusN";
import { useSearchDatesByIndex } from "../../hooks/useSearchDatesByIndex";
import { useSearchIndexAnyDate } from "../../hooks/useSearchIndexAnyDate";
import { useNavigate } from "react-router-dom";
import DateFnsFormat from "../DateFnsFormat";



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
const [modIndFin, setModIndFin] = useState<number | null>(null) 
const [modDatFin, setModDatFin] = useState<Date | null>(null) 
const [stopDateFromBase, setStopDateFromBase] = useState<Date | null>()
const paymentDateIndex  = useSearchDatesPlusN(0, currentUser?.uid);
const dzisIndex = useSearchIndexCloseToday();
const dzisData = useSearchDatesByIndex(dzisIndex);
const navigate = useNavigate();


//console.log("paymentDateIndex", paymentDateIndex, surname)
//ustawienie podstawowych danych

 // console.log("stop date from base", stopDateFromBase);


const settingName = useCallback( async ()=>{

  if(currentUser){ 
    const userRef = doc(db, "usersData",currentUser?.uid);
    const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {  
          setName(docSnap.data().name);
          setSurname(docSnap.data().surname);
        
          //jesli mamy stop
          const temp = [];
           if(docSnap.data().stop){
           setStopReported(true)
           setStopDateFromBase(docSnap.data().stop)
           //console.log("stop date from base", docSnap.data().stop);
         
           //console.log("stop date from base",stopDateFromBase?.toDate())
          }
         
           //jesli mamy multi
         if(docSnap.data().optionMulti === true){  

           setIsMulti(true);
           setStopDate(dzisData);

                //jezeli jest debt w multi
                if(docSnap.data().debt){
                 // console.log("uzytkownik zadluzony")        
                  setFinalDebt(docSnap.data().debt)
                 }

               //jezeli mamy pauze w 
                 if(docSnap.data().pause){
                  setCurrentUserPausaDate(docSnap.data().pause);
                 // console.log("uzytkownik pauzujacy")
                 }
      }

      if(docSnap.data().optionPass === true){  
        setIsPass(docSnap.data().optionPass);

             //jesli mamy pauze
             if(docSnap.data().pause){
            setCurrentUserPausaDate(docSnap.data().pause);
             console.log("currentUserPausaDate",currentUserPausaDate)
             setStopDate(dzisData);
                 //jezeli w pauzie sa do dodania 
                    // if(docSnap.data().add){          
                      //  console.log("uzytkownik majacy treningi do dodania")
                      //  const pausaIndex = useSearchIndexAnyDate(currentUserPausaDate);
                      //  const convertToStopInd = pausaIndex + docSnap.data().add;
                      //  const dateSzukana = useSearchDatesByIndex(convertToStopInd)
                      //  setStopDate(dateSzukana);
                    // }
   
                     //jezeli w pauzie jest zadluzenie
                     if(docSnap.data().debt){          
                       //console.log("uzytkownik zadluzony")
                       setStopDate(dzisData);
                       setFinalDebt(docSnap.data().debt)
                     }
        } 
       //jesli mamy due
         if(docSnap.data().due){     
          
              if((paymentDateIndex !== null) && dzisIndex){
                 setStopDate(dzisData)
                 if(dzisIndex > paymentDateIndex){
                 setFinalDebt(dzisIndex - paymentDateIndex)
                   }  
                 if(dzisIndex < paymentDateIndex){
                  const temp = paymentDateIndex - dzisIndex
                  const newDI = dzisIndex + temp;
                  setModIndFin(newDI)
                  //setStopDate(dateSzukana)
                 
                    }   
                      
               }
               
             
          
          }
     }
      
   } else {

    console.log("brak polaczenia z baza")
   }
          
   }
   


      },[])
  const dateSzukana = useSearchDatesByIndex(modIndFin)   
          
useEffect(()=>{
    
      settingName()  
      setModDatFin(dateSzukana);
     // console.log('dateSzukana',dateSzukana?.toDate())
     // console.log('modDatFin',modDatFin)
    // console.log("uzytkownik pauzujacy")
   
 },[currentUser,dzisIndex,settingName])



     const dataToActivityArchive = {
      created_at: serverTimestamp(),
        stopData: stopDate,
        userUid: currentUser?.uid,
        kto: `${name} ${surname}`,          
      } 

      //funkcja zapisujaca w bazie
//console.log("z funkcji zapisującej w bazie",'stopDate',stopDate,'finalDebt',finalDebt,'name',name)
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
      if(finalDebt){
          await updateDoc(paymentDataRef, {
             pause: null,  
             add: null,
             stop: stopDate,  
             restart: null,
             debt: finalDebt,
             due: null  
          })
          .then(()=>console.log("stop date for passuser update succesful"))
          .then(()=>  setStopDate(null))
          .then(()=>   setisSent(true))
          .then(()=>   setFinalDebt(null))

      }
     
         if(modDatFin){
            await updateDoc(paymentDataRef, {
             pause: null,  
             add: null,
             stop: modDatFin,  
             restart: null,
             debt: null,
             due: null  
           })
            .then(()=>console.log("stop date for passuser update succesful"))
            .then(()=>  setStopDate(null))
            .then(()=>   setisSent(true))
            .then(()=>   setFinalDebt(null))

            }


    }




          const docRef = await addDoc(collection(db, "activitiArchive"), dataToActivityArchive)
        .then(()=> console.log("archive"))  
        .then(()=> navigate('/userpanel'))
         


     

  }


return (<div>

  {/* <button onClick={getAddfromBase}>Skalkuluj date zakonczenia</button> */}
 
  {/* {stopReported && <p>uczestnictwo w klubie będzie zatrzymane od {stopDateFromBase?.toDate().toString()}</p>} */}
  {/* {!stopReported && <p>uczestnictwo w klubie będzie zatrzymane od 
    {stopDateFromBase?.toDate().toString()}</p>} */}
  {currentUserPausaDate && <p>Pauzujacy użytkownik rezygnuje dzis z członkostwa</p>}
    {!stopReported && 
     <div className="archive">    
     <p>Czy na pewno chcesz zakończyć uczestnictwo w treningach? Treningi zostana zakonczone:  </p>
        <p><DateFnsFormat element={dzisData}/></p>
     </div>}
  {finalDebt &&<p>istniejące zadłużenie: {finalDebt} treningów</p>}
  {!stopReported && <button onClick={sendStopToBase} className="btn">Potwierdż</button>}
  {isSent &&<p>wyslano</p>}

    
    </div>)
}

export default StopMembershipUser;