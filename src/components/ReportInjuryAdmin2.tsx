import { ChangeEvent, useEffect, useState } from "react";
import { useModUsersForSelect } from "../hooks/useModUsersForSelect ";
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../App";
import { useSearchDatesPlusN } from "../hooks/useSearchDatesPlusN";
import { useSearchIndexCloseToday } from "../hooks/useSearchIndexCloseToday";
import { useSearchDatesByIndex } from "../hooks/useSearchDatesByIndex";
import Select from 'react-select'


export interface US {
    value: string | null
    label: string | null
  }

const ReportInjuryAdmin2: React.FunctionComponent =() => {

    const [newUsersList, setNewUsersList] = useState<US[]>([])
   // const paymentDateIndex  = useSearchDatesPlusN(0, chosenUserId); 


    const userModForSelect  =  useModUsersForSelect(); 
    const [chosenUserId, setChosenUserId] = useState<string | null>(null)
    const [chosenUserByIdLabel, setChosenUserByIdLabel] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null)
    const [surname, setSurname] = useState<string | null>(null);
    const [stopReported, setStopReported] = useState<boolean>(false)
    const [pausaReported, setPausaReported] = useState<boolean>(false)
    const [pausaDate, setPausaDate] = useState<Date | null>();
    const [pausaDebt, setPausaDebt] = useState<number | null>(null) 
    const [pausaAdd, setPausaAdd] = useState<number | null>(null) 
    const [isSent, setisSent] = useState<boolean>(false) ;
    const [injuryDescription, setInjuryDescripton] = useState<string | null>("")

    const dzisIndex = useSearchIndexCloseToday();
const dzisData = useSearchDatesByIndex(dzisIndex);
const paymentDateIndex  = useSearchDatesPlusN(0, chosenUserId);

    useEffect(() => {

        const fetchData = async () => {
            const usersToAdd = [];
            for (let i = 0; i < userModForSelect.length; i++) {
                const userRef = doc(db, "usersData", userModForSelect[i].value);
                const docSnap = await getDoc(userRef);  
              // wykluczyc tych z pauza i stopem

                if ( docSnap.data()) {
                  if(docSnap.data().pause ||docSnap.data().stop ){
                     continue
                  } else{
                    if((docSnap.data().id  === userModForSelect[i].value)){
              // Dodawanie użytkownika do listy w formie obiektu
              usersToAdd.push({ value: userModForSelect[i].value, label: userModForSelect[i].label });

                    }


                  }   
                      
                
                }
                setNewUsersList(usersToAdd); // Aktualizuj stan tablicy
            }
    
             
        }; 
    
        fetchData();
    
        console.log('newUsersList',newUsersList)
    
    }, [db,useModUsersForSelect,dzisData]);


      //ustawienie imienia i nazwiska

useEffect(()=>{

    const settingName = async ()=>{
  
        if(chosenUserId){ 
          const userRef = doc(db, "usersData",chosenUserId);
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

    //console.log("paymentDateIndex",paymentDateIndex)
    //paymentDateIndex? console.log("paymentDateIndex",paymentDateIndex) : console.log("nic",paymentDateIndex)

 
    if(chosenUserId){

         const userRef = doc(db, "usersData",chosenUserId);
         const docSnap = await getDoc(userRef);
              if (docSnap.exists()) {

                //jesli mamy stop
                  if(docSnap.data().stop){
                  setStopReported(true)
                   }
                   if(docSnap.data().pause){
                    setPausaReported(true)
                   }
                //jesli mamy multi
                if(docSnap.data().optionMulti === true){
                  setPausaDate(dzisData);
                  if(docSnap.data().debt){
                    setPausaDebt(docSnap.data().debt)
                  }
                }
                //jesli mamy due
                  if(docSnap.data().due){   
                       if(paymentDateIndex !== null && dzisIndex){
                          console.log("odpalonypaymentDateIndex")
                          setPausaDate(dzisData);
                          if(paymentDateIndex >= dzisIndex ){
                            setPausaAdd(paymentDateIndex - dzisIndex)
                          }
                          if(dzisIndex > paymentDateIndex){
                            setPausaDebt(dzisIndex - paymentDateIndex)
                          }          
                       }
                   } 
     
    } else {console.error("no database connection")}

  }

  console.log('pausaDate',pausaDate)
   }



   const dataToActivityArchive = {
    timestamp: serverTimestamp(),
    pausaData: pausaDate,
    userUid: chosenUserId,
    kto: `${name} ${surname}`, 
    reason:  injuryDescription        
  } 
  
  //funkcja zapisujaca w bazie
  
  const sendStopToBase =async()=>{

         if(chosenUserId){
  
             const paymentDataRef = doc(db, "usersData", chosenUserId);
  
        
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

  }

   const handleDescriptInj =(event: ChangeEvent<HTMLInputElement>)=>{
    const { value } = event.target
  setInjuryDescripton(value);
   }
    return(<>

    <Select
      closeMenuOnSelect={true}  
      options={newUsersList}
      onChange={(choice) => {
        setChosenUserId(choice.value);   
        setChosenUserByIdLabel(choice.label);   
        setPausaReported(false);
        setisSent(false);
        setPausaDate(null);
        setPausaAdd(null);
        setPausaDebt(null);
        setStopReported(false);
        }}   
    />


<button onClick={getAddfromBase}>Wylicz pauze </button>
<br></br>


{stopReported && <p>Treningi sa juz zakończone</p>}
  {pausaDate && <p>Treningi zostana zawieszone: {pausaDate?.toDate()?.toString()}</p>}
  {pausaDebt &&<p>istniejące zadłużenie: {pausaDebt} treningów</p>}
  {pausaAdd &&<p>pozostało opłaconych treningów: {pausaAdd} treningów</p>}
  {pausaDate && <div>
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
  </div>}
  {isSent &&<p>wyslano</p>} 
    


    </>)

}

export default ReportInjuryAdmin2;