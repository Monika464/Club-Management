import { useState } from "react";
import { useModDatesForSelect } from "../../hooks/useModDatesForSelect";
import { FormWrapper } from "./FormWrapper";
import Select from 'react-select';
import { useSearchIndexToday } from "../../hooks/useSearchIndexToday";
import { useSearchDatesByIndex } from "../../hooks/useSearchDatesByIndex";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

interface IStartAndOptionForm {
option: string | null;
setOption: (value: string) => void;
startDay: Date |null;
setStartDay: (value: Date) => void;
}

interface INewDatesArray {
  value: Date
  label: Date
}

export function StartAndOptionForm(props: IStartAndOptionForm){

    const[userChoice, setUserChoice] = useState({});
    //const[passMultiChoice, setPassMultiChoice] = useState<string | null >("pass");
    const datesModForSelect = useModDatesForSelect();

   
  // Nowa tablica obiektów
const noweDatesForSelect: INewDatesArray[] = [];


datesModForSelect?.forEach(element => {
  // Tworzenie nowego obiektu z takimi samymi wartościami dla value i label
  //const formatt = format(element.label.ToDate(), 'PPP', {locale: pl})
 

  const nowyElement = {
    value: element.value,
    label:  format(element.value?.toDate(),'PPP', {locale: pl}),
  };
   

  // Dodanie nowego obiektu do nowej tablicy
  noweDatesForSelect.push(nowyElement);
});

//console.log("noweDatesForSelect",noweDatesForSelect)
 
// noweDatesForSelect.forEach(element=>{
//   console.log("element",format(element.value?.toDate(),'PPP', {locale: pl}))
// })
    

    const todaysIndex = useSearchIndexToday()
    const closeTodayDay = useSearchDatesByIndex(todaysIndex)

    return(<>
    <FormWrapper title="Uczestnictwo">
      <br/>
        <label>Rozpoczęcie</label>
     
        <Select
      closeMenuOnSelect={true} 
      /*components={animatedComponents}  */
      options={noweDatesForSelect}
      defaultValue={closeTodayDay}
      onChange={(choice) => {     
      if (choice) {
          const selectedValue = choice.value;
         // console.log("choice.value",choice.value)
          props.setStartDay(choice.value)
          //setUserChoice(selectedValue);
        } else {
          props.setStartDay(closeTodayDay)
          //setUserChoice(null); // Opcjonalnie, jeśli chcesz zresetować wybór
        }
      }}
       />
     </FormWrapper>
        <label>Karnet czy multi Multi</label>
    
       <Select
      closeMenuOnSelect={true} 
      /*components={animatedComponents}  */
      options={[{value: "pass", label: "karnet"},{value: "multi", label: "mutli"}]}
      //defaultValue={{value: "pass", label: "pass"}}
        onChange={(choice) => {   
       //console.log("choice", choice?.value)
       if(choice)
       props.setOption(choice.value)
      }}
       />
        
        </>)
}