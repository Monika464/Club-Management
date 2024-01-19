import { useEffect, useState } from "react";
import { useFetchDates } from "./useFetchDates";

export interface IdatesForSel {
    value: {
        seconds: number,
        nanoseconds: number
    }
    label: Date
}

export const useModDatesForSelect = () => {

    const [datesModForSelect,setDatesModForSelect] = useState<IdatesForSel[]>();


    const data = useFetchDates();

    useEffect(()=>{
       
        const temp: any[] = []; 
            data?.forEach((elem) => {
                //console.log("co to za elem",elem, index);
                const timestampA = elem.toDate().toString()
                const pureVal = elem;
                temp.push({ value: pureVal, label: timestampA }) 
           
             })
             setDatesModForSelect(temp);   
          
       
    },[data])

   // console.log("datesModForSelect",datesModForSelect)

 //const data = useFetchDates();





 //console.log("")
  
    return datesModForSelect;
}