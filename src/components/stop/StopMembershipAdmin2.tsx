import Select from 'react-select'
import { useModUsersForSelect } from '../../hooks/useModUsersForSelect ';
import { useEffect, useState } from 'react';
import { useSearchDatesPlusN } from '../../hooks/useSearchDatesPlusN';
import { useSearchIndexCloseToday } from '../../hooks/useSearchIndexCloseToday';
import { useSearchDatesByIndex } from '../../hooks/useSearchDatesByIndex';
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../../App';
import { useSearchIndexAnyDate } from '../../hooks/useSearchIndexAnyDate';

export interface US {
  value: string | null
  label: string | null
}

const StopMembershipAdmin2: React.FunctionComponent =() => {


    const [chosenUserId, setChosenUserId] = useState<string | null>(null)
    const [chosenUserByIdLabel, setChosenUserByIdLabel] = useState<string | null>(null)

    const [isSent, setisSent] = useState<boolean>(false) ;
    const [currentUserPausaDate, setCurrentUserPausaDate] = useState<Date | null>();
const [dueDate, setDueDate] = useState<Date | null>()
const [stopReported, setStopReported] = useState<boolean>(false)
const [stopDate, setStopDate] = useState<Date | null>()
const [finalDebt, setFinalDebt] = useState<number | null>(null) 
const [name, setName] = useState<string | null>(null)
const [surname, setSurname] = useState<string | null>(null)

const paymentDateIndex  = useSearchDatesPlusN(0, chosenUserId);
const dzisIndex = useSearchIndexCloseToday();
const dzisData = useSearchDatesByIndex(dzisIndex);
const [newUsersList, setNewUsersList] = useState<US[]>([])  

console.log("czy jest dzis index", stopDate?.toDate(), dzisIndex,dzisData?.toDate())
console.log("paymentDateIndex", paymentDateIndex)

const userModForSelect  =  useModUsersForSelect();  

const [rendered, setRendered] = useState(false);

useEffect(() => {
    const timer = setTimeout(() => {
      setRendered(true);
    }, 1000); // 1000 milisekund = 1 sekunda
  
    return () => {
      clearTimeout(timer); // W przypadku odmontowania komponentu przed zakończeniem opóźnienia
    };
  }, []);
  
useEffect(() => {

 // console.log("czy mamy ",userModForSelect)   

    const fetchData = async () => {  
        const usersToAdd = [];

        //modyfikowanie listy 

        for (let i = 0; i < userModForSelect.length; i++) {
            const userRef = doc(db, "usersData", userModForSelect[i].value);
            const docSnap = await getDoc(userRef); 
             
            if (docSnap.data()) {
 
                // Dodawanie użytkownika do listy w formie obiektu
                //usersToAdd.push({ value: userModForSelect[i].value, label: userModForSelect[i].label });
                    if((docSnap.data().optionMulti === true) && (!docSnap.data().stop)&& (docSnap.data().id === userModForSelect[i].value)){
                        console.log("say yes")
                    usersToAdd.push({ value: userModForSelect[i].value, label: userModForSelect[i].label });
                    } 
                    if( (docSnap.data().id  === userModForSelect[i].value)
                    && (docSnap.data().due || docSnap.data().pause)
                    ){
                        console.log("say no")
                        usersToAdd.push({ value: userModForSelect[i].value, label: userModForSelect[i].label });
                     }
           
            }

            setNewUsersList(usersToAdd); // Aktualizuj stan tablicy  
        }

        
    }; 

    fetchData();

    console.log('newUsersList222',newUsersList)

}, [db,dzisData,paymentDateIndex,dzisIndex,rendered]);

//lista userow zmodyfikowana tak zeby zaden nie mial stop
//ci z karnetem moga miec duedate albo pausa
//ci z multi wszyscy moge




//AKCJE PO WYBORZE USERA

//console.log('paymentDateIndex',paymentDateIndex)

useEffect(()=>{

    const settingName = async ()=>{

        if(chosenUserId){ 
          const userRef = doc(db, "usersData",chosenUserId);
          const docSnap = await getDoc(userRef);
  
              if (docSnap.exists()) {
                console.log("tutaj snap",docSnap.data())
                setName(docSnap.data().name);
                setSurname(docSnap.data().surname);
              
               
                    }

         }
  
      }
      settingName() 

     },[chosenUserId,db,dzisData,paymentDateIndex,dzisIndex,rendered])

  

//funkcja kalkulująca naleznosc

    const getAddfromBase =async ()=>{

        if(chosenUserId){ 
            const userRef = doc(db, "usersData",chosenUserId);
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
             if(docSnap.data().debt){          
               console.log("uzytkownik zadluzony")
               setStopDate(dzisData);
               setFinalDebt(docSnap.data().debt)  
            }
      } 
       //jesli mamy due
         if(docSnap.data().due){  
            console.log("uzytkownik z data due")
            console.log("paymentDateIndex",paymentDateIndex,dzisIndex,paymentDateIndex)
              if(paymentDateIndex && dzisIndex){
               
                 setStopDate(dzisData)
                 if(dzisIndex > paymentDateIndex){
                 setFinalDebt(dzisIndex - paymentDateIndex)
                 }          
              }
          }  
          
          //jesli mamy multiOption true
          // setStopDate(dzisData)
          //if debt setFinalDebt debt
          
          if(docSnap.data().optionMulti === true){  
            console.log("uzytkownik z multi")
            
              if(dzisIndex){
                 setStopDate(dzisData)
                 if(docSnap.data().debt){
                 setFinalDebt(docSnap.data().debt)
                 }          
              }
          }  
          




     }
        
    }
}
     const dataToActivityArchive = {
       created_at: serverTimestamp(),
        stopData: stopDate,
        userUid: chosenUserId,
        kto: `${name} ${surname}`,          
      } 

    //MODYFIKOWANIE ZAPISU DANEGO USERA W BAZIE
      //funkcja zapisujaca w bazie

     const sendStopToBase =async()=>{

    const paymentDataRef = doc(db, "usersData", chosenUserId);
 
       if(currentUserPausaDate){    
        await updateDoc(paymentDataRef, {
          pause: null,  
          add: null,
          stop: stopDate,  
          restart: null ,
          debt: finalDebt   
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



return(<>
StopMembershipAdmin
<Select
      closeMenuOnSelect={true}  
      options={newUsersList}
      onChange={(choice) => {
        setChosenUserId(choice.value);   
        setChosenUserByIdLabel(choice.label);   
        setStopReported(false);
        setisSent(false);
        setStopDate(null);
        setName(null);
        setSurname(null);
        setFinalDebt(null);
        }}   
    />
    <p>{chosenUserByIdLabel}</p>

    {<button onClick={getAddfromBase}>Skalkuluj date zakonczenia</button>}
 
 {stopReported && <p>juz zastopowane</p>}
 {stopDate &&  <p>Treningi zostana zakonczone: {stopDate?.toDate()?.toString()}</p>}
 {finalDebt && <p>istniejące zadłużenie: {finalDebt} treningów</p>}
 {!stopReported  && <button onClick={sendStopToBase}>Potwierdż</button>}
 {isSent &&<p>wyslano</p>}


</>)
}

export default StopMembershipAdmin2;