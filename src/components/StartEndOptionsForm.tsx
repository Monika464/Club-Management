import { useState } from "react";
import { useModDatesForSelect } from "../hooks/useModDatesForSelect";
import { FormWrapper } from "./FormWrapper";
import Select from 'react-select';
import { useSearchIndexToday } from "../hooks/useSearchIndexToday";
import { useSearchDatesByIndex } from "../hooks/useSearchDatesByIndex";

interface IStartAndOptionForm {
option: string;
setOption: (value: string) => void;
startDay: Date;
setStartDay: (value: Date) => void;
}

export function StartAndOptionForm(props: IStartAndOptionForm){

    const[userChoice, setUserChoice] = useState({});
    const[passMultiChoice, setPassMultiChoice] = useState<string | null >("pass");
    const datesModForSelect = useModDatesForSelect();

    if(passMultiChoice === "pass"){  
      props.setOption("pass");
      console.log("hej hej pass");

    } 
    if(passMultiChoice === "multi"){
      props.setOption("multi");
      console.log("hej hej multi");
    } 

    const todaysIndex = useSearchIndexToday()
    const closeTodayDay = useSearchDatesByIndex(todaysIndex)

    return(<>
    <FormWrapper title="membership">
        <label>Start Date</label>
     
        <Select
      closeMenuOnSelect={true} 
      /*components={animatedComponents}  */
      options={datesModForSelect}
      onChange={(choice) => {     
      if (choice) {
          const selectedValue = choice.value;
          console.log("choice.value",choice.value)
          props.setStartDay(choice.value)
          //setUserChoice(selectedValue);
        } else {
          props.setStartDay(closeTodayDay)
          //setUserChoice(null); // Opcjonalnie, jeśli chcesz zresetować wybór
        }
      }}
       />
</FormWrapper>
        <label>Pass Or Multi</label>
    
       <Select
      closeMenuOnSelect={true} 
      /*components={animatedComponents}  */
      options={[{value: "pass", label: "pass"},{value: "multi", label: "mutli"}]}
      defaultValue={{value: "pass", label: "pass"}}
        onChange={(choice) => {   
       console.log("choice", choice?.value)
       if(choice)
       setPassMultiChoice(choice.value)
      }}
       />
        
        </>)
}