import { useEffect, useState } from "react";
import { useModUsersForSelect } from "../hooks/useModUsersForSelect ";
import Select from 'react-select'
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../App";
import { useSearchDatesPlusN } from "../hooks/useSearchDatesPlusN";
import { useSearchDatesByIndex } from "../hooks/useSearchDatesByIndex";

export interface Itest{}
export const UsersPayments : React.FunctionComponent<Itest> =(props) => { 

    const usersModForSelect =  useModUsersForSelect(); 

    const [chosenUserById, setChosenUserById] = useState<string | null>(null)
    const [chosenUserByIdLabel, setChosenUserByIdLabel] = useState<string | null>(null)
    const [oldDueDate, setOldDueDate] = useState<Date | null>(null) 
    const [newDueDate, setNewDueDate] = useState<Date | null>(null)
    const [hasDebt, setHasDebt] = useState<number | null>(null);
    const [modifyDebt, setModifyDebt] = useState<number | null>(null);
    const [hasAdd, setHasAdd] = useState<number | null>(null)
    const [modifyAdd, setModifyAdd] = useState<number | null>(null)
const [debtSent, setDebtSent] = useState<boolean>(false)
const [addSent, setAddSent] = useState<boolean>(false)
const [dateSent, setDateSent] = useState<boolean>(false)

    console.log(chosenUserById,chosenUserByIdLabel)


const  calculatedIndexOfNewDue= useSearchDatesPlusN(8, chosenUserById);
const newDate =  useSearchDatesByIndex(calculatedIndexOfNewDue);  

const checkingFunction =async ()=>{
   if(chosenUserById){
      const userRef = doc(db, "usersData",chosenUserById);
      const docSnap = await getDoc(userRef);
         if (docSnap.exists()) {
             if(docSnap.data().pause || docSnap.data().stop){
               console.log("ma pauze albo stop")                   
               if(docSnap.data().debt){
                      setHasDebt(docSnap.data().debt)
                     }
                    if(docSnap.data().add){
                    setHasAdd(docSnap.data().add)
                   }
                } else {
                  console.log("nie ma pauzy ani stopu") 
                  setOldDueDate(docSnap.data().due)
                  setNewDueDate(newDate)
                 //przelicz normalnie date

                }
         } 
      }
 }

useEffect( ()=>{
console.log("newDueDate",newDueDate)

},[newDueDate])

useEffect( ()=>{
   if(hasDebt){
        if(hasDebt <= 8){
          setModifyAdd(8 - hasDebt)
         //czysc debt zapisz add
        } else {
         setModifyDebt(hasDebt - 8)
        }
   }
   
   },[hasDebt])

   useEffect(()=>{
      if(hasAdd){
         setModifyAdd(8 + hasAdd)
      }

   },[hasAdd])

useEffect(()=>{
   console.log('hasDebt',hasDebt,'modifyDebt',modifyDebt,'hasAdd',hasAdd,'modifyAdd',modifyAdd)
},[hasDebt,hasAdd])



 const handleAccept =async ()=>{

   const paymentDataRef = doc(db, "usersData", chosenUserById);

   if(modifyDebt){
      await updateDoc(paymentDataRef, {
         debt: modifyDebt
       })
       .then(()=>console.log("debt modified. update succesful"))
       .then(()=>{setDebtSent(true)})
    
   //wyslij do bazy jako debt
   } 
   if(modifyAdd){
      await updateDoc(paymentDataRef, {
         add: modifyAdd
       })
       .then(()=>console.log("new treinings added. update succesful"))
       .then(()=>{setAddSent(true)})
    //wyslij do bazy jako add  
   }
   if(newDueDate){
      await updateDoc(paymentDataRef, {
         due: newDueDate
       })
       .then(()=>console.log("new payment day set. update succesful"))
       .then(()=>{setDateSent(true)})
   }

 }

    return(<>
    <Select
    
      options={usersModForSelect}
      onChange={(choice) => {
       // console.log("choice", choice) 
        setChosenUserById(choice.value);   
        setChosenUserByIdLabel(choice.label); 
        setHasDebt(null);
        setHasAdd(null);
        setOldDueDate(null);
        setNewDueDate(null);
        setModifyDebt(null);
        setModifyAdd(null);
        setDebtSent(false);
        setAddSent(false);
        setDateSent(false);

        }}   
    />

    <button onClick={checkingFunction}>Edytuj uzytkownika</button>

    {newDueDate && <div>
    <p>Data naleznosci stara: {oldDueDate?.toDate()?.toString()}</p>
    <p>Data naleznosci nowa: {newDueDate?.toDate()?.toString()}</p>
    </div>
    }
    {modifyDebt && <p>Nowa wartość debt: {modifyDebt}</p>}
    {modifyAdd && <p>Nowa wartość add:{modifyAdd}</p>}
    <button onClick={handleAccept}>Zaakceptuj i wyslij</button>
    {debtSent && <p>dług zmodyfikowany</p>}
    {addSent && <p>dodane zmodyfikowane</p>}
    {dateSent && <p>data zmodyfikowana</p>}
    

    </>)

}