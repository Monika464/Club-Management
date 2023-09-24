
export interface Itest{}

import { useEffect, useState } from "react";
import { useModDatesForSelect } from "../hooks/useModDatesForSelect";
import { useModUsersForSelect } from "../hooks/useModUsersForSelect ";
import Select from 'react-select'
import { useSearchDatesPlusN } from "../hooks/useSearchDatesPlusN";
import { useSearchDatesByIndex } from "../hooks/useSearchDatesByIndex";


export const Test : React.FunctionComponent<Itest> =(props) => { 
  


  const [chosenUserId, setChosenUserId] = useState<string | null>(null)
  const [closeMenu, setCloseMenu] = useState<boolean>(false); 

     
  
/////////
const [chosenDate, setChosenDate] = useState() 

    const datesModForSelect = useModDatesForSelect();
    const temp =  useModUsersForSelect(); 
  

    //console.log("usersModForSelect ",temp ) 

///
const [wind, setWind] = useState<number | null>(null)
const [resDate, setResDate] = useState<Date | null>(null)

const  wantedIndex= useSearchDatesPlusN(8, chosenUserId)

 

  const payment8 = ()=>{
    setWind(wantedIndex);
   }

const elem =  useSearchDatesByIndex(wind);   
//const newDate2 =  useSearchDatesByIndex(10);
//console.log("newDate2",newDate2?.toDate())

const payyy =   ()=>{ 
 setResDate(elem);
}

console.log("wInd",wind,"uu",resDate?.toDate())   
  return(<div>
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

komponent users do select (test)

<Select
      closeMenuOnSelect={closeMenu}  
      options={temp}
      onChange={(choice) => {
        setChosenUserId(choice.value);    
        }}   
    />
    <p>{chosenUserId?.label}</p>

    edytuj usera
pojawiaja sie przyciski
<br></br>

<button onClick={payment8}>policz szukany index</button>
<p>{resDate && resDate.toDate().toString()}</p>
<button onClick={payyy}>policz nowa date</button>



    
    </div>)

}