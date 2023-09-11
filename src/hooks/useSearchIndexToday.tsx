import { useEffect, useState } from "react";
import { useFetchDates } from "./useFetchDates";

export const useSearchIndexToday = (): number | null => {

    const [today, setToday] = useState<Date | null>(null);
    const dataFromBase = useFetchDates();
    const [todaysIndex, setTodaysIndex] =  useState<number | null>(null);
   

    useEffect(()=>{
     
        setToday(new Date())
        console.log("today",today);

        const todayYear = today?.getFullYear();
        const todayMonth = today?.getMonth();
        const todayDay = today?.getDate();
 

        for (let ind = 0; ind < dataFromBase?.length; ind++) {
            const dat = dataFromBase[ind];
            const datYear = dat?.toDate().getFullYear();
            const datMonth = dat?.toDate().getMonth();
            const datDay = dat?.toDate().getDate();
            const todayDay2 = todayDay+1;
            const todayDay3 = todayDay2+1;
            const todayDay4 = todayDay3+1;


                     if (
                        todayYear === datYear &&
                        todayMonth === datMonth &&
                        todayDay === datDay
                     ) {
                        console.log("maaaam", dat, ind);
                        //console.log("test",todayDay+1);
                        
                         setTodaysIndex(ind);
         
                         break; // Przerwij pętlę po znalezieniu odpowiedniego indeksu
                     } else if(
                        todayYear === datYear &&
                        todayMonth === datMonth &&
                        todayDay2 === datDay
                     ) {
                        console.log("maaaam2", dat, ind);
                        //console.log("test",todayDay+1);
                        
                         setTodaysIndex(ind);
         
                         break;

                     } else if(
                        todayYear === datYear &&
                        todayMonth === datMonth &&
                        todayDay3 === datDay
                     ) {
                        console.log("maaaam2", dat, ind);
                        //console.log("test",todayDay+1);
                        
                         setTodaysIndex(ind);
         
                         break;

                     } else if(
                        todayYear === datYear &&
                        todayMonth === datMonth &&
                        todayDay4 === datDay
                     ) {
                        console.log("maaaam2", dat, ind);
                        //console.log("test",todayDay+1);
                        
                         setTodaysIndex(ind);
         
                         break;

                     }


        }
  console.log(todaysIndex)

    },[dataFromBase])


 

    return todaysIndex;

}