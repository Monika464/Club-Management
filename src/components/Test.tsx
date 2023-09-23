
export interface Itest{}

import { useState } from "react";
import { useModDatesForSelect } from "../hooks/useModDatesForSelect";
import { useModUsersForSelect } from "../hooks/useModUsersForSelect ";
import Select from 'react-select'


export const Test : React.FunctionComponent<Itest> =(props) => {

    const usersModForSelect =  useModUsersForSelect();
/////////
const [chosenDate, setChosenDate] = useState()

    const datesModForSelect = useModDatesForSelect();

console.log("datesModForSelect",datesModForSelect)

//console.log("chosenDate",chosenDate)

  return(<div>
    komponent test do select

    <Select
      closeMenuOnSelect={true} 
      /*components={animatedComponents}  */
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


    
    </div>)

}