
  //https://xerosource.com/how-to-use-react-datepicker-in-typescript/#google_vignette
  //https://xerosource.com/how-to-use-react-datepicker-in-typescript/#google_vignette
  import React from 'react';
import { SetStateAction, useEffect, useState } from "react";
//import { db } from "../App";
import DatePicker from "react-datepicker"; 
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select'
import makeAnimated from 'react-select/animated'; 
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../App';


interface PossibleTrainingDate {
  value: Date;
  label: Date | string;
  possibleTrainingDate: Date | null;
}


export const DatePickerTrainings: React.FunctionComponent<PossibleTrainingDate[] > =(props) => {

  const animatedComponents = makeAnimated();

  const [selectedDates, setSelectedDates] = useState<PossibleTrainingDate[]>([]);
  const [startDate, setStartDate] = useState<Date>(new Date());   
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [dayRange, setDayRange] = useState<Date[]>([]);
  //const [closeMenu, setCloseMenu] = useState(false); // Dodaj stan closeMenu 
  //const [selectedDate, setSelectedDate] = useState([]); 
   const[userChoice, setUserChoice] = useState<Date[]>([])
   const [isReset, setIsReset] = useState<boolean>(false);
  

//console.log('dayRange',dayRange);
//console.log('userChoice',userChoice)
//console.log('selectedDates',selectedDates)

  const getDatesBetween = (startDate: Date, endDate: Date) => { 
    const datess = [];
     // Strip hours minutes seconds etc.
 let currentDate = new Date(
     startDate.getFullYear(),
     startDate.getMonth(),
     startDate.getDate()
 );

     while (currentDate <= endDate) {  
              datess.push(currentDate); 

         currentDate = new Date(
         currentDate.getFullYear(),
         currentDate.getMonth(),
         currentDate.getDate() + 1, // Will increase month if over range
      ); }

 return datess; 
};


const onChange = async (dates: [any, any]) => {       
  const [start, end] = dates;  
  setStartDate(start);
  setEndDate(end);
  setDayRange(getDatesBetween(start,end).filter(el=>el.getDay() === 1 || el.getDay() === 4 )) 
 // setDayRange(getDatesBetween(start,end)) 

};

useEffect(()=>{
 //console.log("u",day)
if(dayRange){
  dayRange.map((day)=>{
 //console.log("u",day)

     let possibleTrainingDate: PossibleTrainingDate ={    
    value: day,
    label: day.toLocaleDateString('default', { month: 'short', day: 'numeric' }) 
     } 
     setSelectedDates((prevSelectedDates: SetStateAction<null[] | null>) => [...prevSelectedDates, possibleTrainingDate])    
  
 })
}

 },[dayRange])   
 
 //wrzuc tutaj zawartosc komponentu SenddatesTobase

 const resetState = () => {
  setUserChoice([]);
  setSelectedDates([]);
  setStartDate(new Date());
  setEndDate(null);
  //setCloseMenu(true);
  setIsReset(true);
};

 const sendToFirebase =async() =>{
  console.log("wyswietl co chcesz wysłac",userChoice) 
 // setStartDate(new Date()); // Resetuj startDate do wartości domyślnej
  //setEndDate(null); // Resetuj endDate do wartości domyślnej

console.log(userChoice,"userchoceprops")
 
 const docRef = await addDoc(collection(db, "trainingDays"), {
                      datesSet: userChoice?.map((dat)=> new Date(dat)),
                       created_at: serverTimestamp()  
                         })

                         .then(()=>{                       
                          console.log("susceess!! Data sent")
                         resetState();
                          //setIsReset(true);
                      })
                         .catch((err)=>{console.error(err)}) 
            
          
 }




  return ( 
<>

<DatePicker
      selected={startDate}      
      startDate={startDate}
      endDate={endDate}
      onChange={onChange}
      selectsRange
      inline
      isClearable
/>

<Select
      /*closeMenuOnSelect={closeMenu}  */
      components={animatedComponents} 
      closeMenuOnSelect={false} 
      isMulti
      options={selectedDates}
      onChange={(choice) => {     
     const selectedValues = choice.map(option => option.value); 
      setUserChoice(selectedValues)
      
      }}
    />

{/*
<SendDatesToBase  
    userChoice={userChoice}  
    setUserChoice={setUserChoice} 
    setStartDate={setStartDate}
    setEndDate={setEndDate}
    setSelectedDates={setSelectedDates} 
    setCloseMenu={setCloseMenu} 
    />
    */}
  <button className={"btn"} onClick={sendToFirebase}  >send to base</button>

</>


  )
}






