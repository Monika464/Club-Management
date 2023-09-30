import { add, format, setHours, startOfDay } from "date-fns";
import { useFetchDates } from "./useFetchDates";
import { useEffect, useState } from "react";
import { enUS } from "date-fns/locale";

export const useSearchIndexCloseToday = (): number | null => {

    const dataFromBase = useFetchDates();

  //  console.log("usehookwczytany")

    const [closeTodaysIndex, setCloseTodaysIndex] =  useState<number | null>(null);

    
 useEffect(()=>{

    const result0 = startOfDay(new Date()); // Pobieramy dzisiejszą datę o godzinie 00:00
       
    const result1 = add(result0, {
     days: 1,
    })
    const result2 = add(result0, {
     days: 2,
    })
    const result3 = add(result0, {
    days: 3,
    })
  



//////////////////////////

if(dataFromBase){

 // console.log("przykładdatabase", dataFromBase[17].toDate())
  //console.log("result0", result2.getTime())
  console.log(dataFromBase[17].toDate().getTime() === result2.getTime())

   for (let ind = 0; ind < dataFromBase?.length; ind++) {

      
          if(result0.getTime() === dataFromBase[ind].toDate().getTime()){
                   console.log("jest wynik0")
                   setCloseTodaysIndex(ind)
                   break;
          } else if(result1.getTime() === dataFromBase[ind].toDate().getTime()){
                  console.log("jest wynik1")
                  setCloseTodaysIndex(ind)
                  break;
          } else if(result2.getTime() === dataFromBase[ind].toDate().getTime()){
          console.log("jest wynik2")
          setCloseTodaysIndex(ind)
                break;
           } else if(result3.getTime() === dataFromBase[ind].toDate().getTime()){
               console.log("jest wynik3")
               setCloseTodaysIndex(ind)
                  break;
           } 

    }
}


 },[dataFromBase])
  

    return closeTodaysIndex;

}


