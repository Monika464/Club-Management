import { useEffect, useState } from "react";
import { useFetchDates } from "./useFetchDates";

export const useModDatesForSelect = () => {

    const [datesModForSelect,setDatesModForSelect] = useState();


    const data = useFetchDates();

    useEffect(()=>{
       
        const temp: any[] = []; 
            data?.forEach((elem, index) => {
                //console.log("co to za elem",elem, index);
                const timestampA = elem.toDate().toString()
                const pureVal = elem;
                temp.push({ value: pureVal, label: timestampA }) 
               // setDatesModForSelect(temp);
             })
             setDatesModForSelect(temp);   
           console.log("datesModForSelect",datesModForSelect)
       
    },[data])

   

 //const data = useFetchDates();





 console.log("")
  
    return datesModForSelect;
}