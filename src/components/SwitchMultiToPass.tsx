//wybieranie z select users i dat jak w starym zglaszaniu injury Admina 
// multi na false
//wpisanie updatem nowej duedate
//jesli bebt pass i lub debtmulti to sie sumuja

import { useEffect, useState } from "react";
import { useModUsersForSelect } from "../hooks/useModUsersForSelect ";
import { useSearchIndexCloseToday } from "../hooks/useSearchIndexCloseToday";
import { useSearchDatesByIndex } from "../hooks/useSearchDatesByIndex";
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../App";
import Select from 'react-select'

//data do zatwierdzenia cofke sie o sume tych debt wzgledem daty wybranej rozpoczecia
export interface US {
    value: string | null
    label: string | null
}

const SwitchMultiToPass: React.FunctionComponent =() => {

    const [newUsersList, setNewUsersList] = useState<US[]>([]);
    const [chosenUserId, setChosenUserId] = useState<string | null>(null)
    const [chosenUserByIdLabel, setChosenUserByIdLabel] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
const [surname, setSurname] = useState<string | null>(null);

const [stopReported, setStopReported] = useState<boolean>(false)
const [pausaReported, setPausaReported] = useState<boolean>(false)
const [multiReported, setMultiReported] = useState<boolean>(false);
const [hasDebt, setHasDebt] = useState<number | null>(null);
const [newPaymentDateIndex, setNewPaymentDateIndex] = useState<number | null>(null);
const [isSent, setIsSent] = useState<boolean>(false);
const [isCalculating, setIsCalculating] = useState<boolean>(false);
const [newPaymentDate, setNewPaymentDate] = useState<Date | null>(null);

    const userModForSelect  =  useModUsersForSelect(); 
    const dzisIndex = useSearchIndexCloseToday();
    const dzisData = useSearchDatesByIndex(dzisIndex);
    
    //modyfikowanie listy userów

    useEffect(() => { 
        const fetchData = async () => {
            const usersToAdd = [];

            for (let i = 0; i < userModForSelect.length; i++) {
                const userRef = doc(db, "usersData", userModForSelect[i].value);
                const docSnap = await getDoc(userRef);  
                
                if (docSnap.data().optionMulti) {
                    // Dodawanie użytkownika do listy w formie obiektu
                    usersToAdd.push({ value: userModForSelect[i].value, label: userModForSelect[i].label });
                }

                setNewUsersList(usersToAdd); // Aktualizuj stan tablicy
            }

            
        };

        fetchData();

        //console.log('newUsersList',newUsersList)
    }, [db,useModUsersForSelect,dzisData]);

    const getAddfromBase =async ()=>{
 
      setIsCalculating(true); 
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
    
                       if(docSnap.data().optionMulti){
                        setMultiReported(true)
                      }
                  
                
                    //jesli mamy due optionMulti
                      if(docSnap.data().optionMulti){   
                             // console.log("multi user") 
                            if(docSnap.data().debt){
                            setHasDebt(docSnap.data().debt)
                           }
                        }   
         
        } else {console.error("no database connection")}
    
      }
    
      }

      const calcDatOfNewPay =  useSearchDatesByIndex(newPaymentDateIndex)

      useEffect(()=>{
    
        if( chosenUserId){
   
            if(!hasDebt && dzisIndex){
            setNewPaymentDateIndex(dzisIndex)
          }
              
          if(hasDebt && dzisIndex){
            setNewPaymentDateIndex(dzisIndex - hasDebt)
          }

if(calcDatOfNewPay && chosenUserId){
  setNewPaymentDate(calcDatOfNewPay);
}
         
        }
    },[chosenUserId,multiReported,calcDatOfNewPay]) 


    //console.log("calcDatOfNewPay",calcDatOfNewPay?.toDate());

    const dataToActivityArchive = {
      timestamp: serverTimestamp(),
      optionismulti: false,
      userUid: chosenUserId,
      kto: `${name} ${surname}`,          
    } 
    

    const handleSwitchToPass =async ()=>{

        const paymentDataRef = doc(db, "usersData", chosenUserId);
     
        
          await updateDoc(paymentDataRef, {
           optionMulti: false,
           debt: hasDebt,
           due: calcDatOfNewPay
          })
          .then(()=>console.log("now pass user"))
          //.then(()=>  setStopDate(null))
          .then(()=>   setIsSent(true))
         
           
          const docRef = await addDoc(collection(db, "optionsArchive"), dataToActivityArchive)
          .then(()=> console.log("archive"))
       
           
  
        //zczytywanie danych isera
      
  
  
  
      }


    return(<div>
        SwitchMultiToPass
        <Select
      closeMenuOnSelect={true}  
      options={newUsersList}
      onChange={(choice) => {
        setChosenUserId(choice.value);   
        setChosenUserByIdLabel(choice.label); 
        //setIsPausa(false);  
        setNewPaymentDate(null);
        setIsCalculating(false); 
        }}   
    />
    {/*<p>{chosenUserByIdLabel}</p>*/}
    <button onClick={getAddfromBase}>skalkuluj sytuacje usera </button>  
   <br></br>
    {/*{calcDatOfNewPay?.toDate().toString()}*/}
    {newPaymentDate && isCalculating &&<p>{newPaymentDate?.toDate().toString()}</p>}


    <button onClick={handleSwitchToPass}>przelacz usera na pass</button>  
      {isSent && <p>uzytkownik teraz pass</p>}

        </div>)
}

export default SwitchMultiToPass 