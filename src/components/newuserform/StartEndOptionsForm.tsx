import { useEffect, useState } from "react";
import { useModDatesForSelect } from "../../hooks/useModDatesForSelect";
import { FormWrapper } from "./FormWrapper";
import Select from 'react-select';
import { useSearchIndexToday } from "../../hooks/useSearchIndexToday";
import { useSearchDatesByIndex } from "../../hooks/useSearchDatesByIndex";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { useSearchIndexCloseToday } from "../../hooks/useSearchIndexCloseToday";

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
    const [thisIndex, setThisindex] = useState({});
    //const[passMultiChoice, setPassMultiChoice] = useState<string | null >("pass");
    const datesModForSelect = useModDatesForSelect();
    const dzisIndex = useSearchIndexCloseToday();
    const [modDatesForSelect, setModdatesForSelect] = useState<INewDatesArray[] | null>([])
   
  // Nowa tablica obiektów
const noweDatesForSelect: INewDatesArray[] = [];

useEffect(() => {
  if (dzisIndex != null && datesModForSelect) {
    // Określenie zakresu indeksów do wycięcia
    const startIndex = Math.max(0, dzisIndex - 3);
    const endIndex = Math.min(datesModForSelect.length - 1, dzisIndex + 3);

    // Wycięcie podzbioru tablicy
    const slicedDates = datesModForSelect.slice(startIndex, endIndex + 1);

    // Przekształcenie elementów i utworzenie nowej tablicy
    setModdatesForSelect(slicedDates.map((element) => ({
      value: element.value,
      label: format(element.value?.toDate(), 'PPP', { locale: pl }),
    })))

    // Wykorzystanie nowej tablicy
  
  }
}, [dzisIndex, datesModForSelect]);

    //const todaysIndex = useSearchIndexToday()
    const closeTodayDay = useSearchDatesByIndex(dzisIndex)
 
    //console.log("modDatesForSelect", modDatesForSelect); 

    return(<>
    <FormWrapper title="Uczestnictwo">
      <br/>
        <label>Rozpoczęcie</label>
     
        <Select
      closeMenuOnSelect={true} 
      /*components={animatedComponents}  */
      options={modDatesForSelect}
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