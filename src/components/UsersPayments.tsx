
export interface Itest{}
export interface IchosenUserById{}

import { useEffect, useState } from "react";
import { useModDatesForSelect } from "../hooks/useModDatesForSelect";
import { useModUsersForSelect } from "../hooks/useModUsersForSelect ";
import Select from 'react-select'
import { useSearchDatesPlusN } from "../hooks/useSearchDatesPlusN";
import { useSearchDatesByIndex } from "../hooks/useSearchDatesByIndex";
import { db } from "../App";
import { doc, updateDoc } from "firebase/firestore";


export const UsersPayments : React.FunctionComponent<Itest> =(props) => { 
  


  const [chosenUserById, setChosenUserById] = useState<string | null>(null)
  const [closeMenu, setCloseMenu] = useState<boolean>(false); 
  const [chosenUserByIdLabel, setChosenUserByIdLabel] = useState<string | null>(null)
     
  
/////////
const [chosenDate, setChosenDate] = useState() 

    const datesModForSelect = useModDatesForSelect();
    const usersModForSelect =  useModUsersForSelect(); 
  

    console.log("chosenUserId ",chosenUserById ) 

///
const [calcNewDueDate, setCalcNewDueDate] = useState<number | null>(null)
const [resDate, setResDate] = useState<Date | null>(null)

const  calculatedIndexOfNewDue= useSearchDatesPlusN(8, chosenUserById)
 

  const payment8 = ()=>{
    setCalcNewDueDate(calculatedIndexOfNewDue);
   }

const elem =  useSearchDatesByIndex(calcNewDueDate);   
//const newDate2 =  useSearchDatesByIndex(10);
//console.log("newDate2",newDate2?.toDate())

const payyy =   ()=>{ 
 setResDate(elem);
}

console.log("new due date index",calcNewDueDate,"new calculated date",resDate?.toDate())   

const handleSendDate =async ()=>{
  const paymentDataRef = doc(db, "usersData", chosenUserById);

  // Set the "capital" field of the city 'DC'
  await updateDoc(paymentDataRef, {
    due: resDate
  }).then(()=>console.log("update succesful"))

}


  return(<div>

   { /*
    komponent dates do select (test)

    <Select
      closeMenuOnSelect={true} 
      options={datesModForSelect}
      onChange={(choice) => {   
        
      if (choice) {
          const selectedValue = choice.value;
          setChosenDate(selectedValue);
        } else {
          setChosenDate(null); // Opcjonalnie, jeśli chcesz zresetować wybór
        }
      }}
       />

<p>{chosenDate && chosenDate.toDate().toString()}</p>
<br></br><br></br>
    */}
komponent users do select (test)

<Select
      closeMenuOnSelect={closeMenu}  
      options={usersModForSelect}
      onChange={(choice) => {
       // console.log("choice", choice) 
        setChosenUserById(choice.value);   
        setChosenUserByIdLabel(choice.label);   
        }}   
    />

  <button onClick={payment8}>policz szukany index/edytuj usera</button>
    <p>{chosenUserByIdLabel}</p>
  

<button onClick={payyy}>wylicz nowa date platnosci </button>

<p>{resDate && resDate.toDate().toString()}</p>

<button onClick={handleSendDate}>send date to base</button>



    
    </div>)

}