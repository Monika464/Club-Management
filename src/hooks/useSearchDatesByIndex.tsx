import { useEffect, useState } from "react";
import { useFetchDates } from "./useFetchDates";



export const useSearchDatesByIndex= (givenIndex: number | null) => {  
    
    const [newDate, setNewDate] = useState<Date | null>(null)

    const data =  useFetchDates();
   // console.log("czy mamy data", data)

    useEffect(()=>{
                    if(givenIndex > (data?.length -1)){
                        alert("bład brak dat")
                        }   
                data?.forEach((elem, index) => {

                   if(givenIndex === index){  
                    setNewDate(elem)               
                    return newDate            
                    }   
                 });

           //  console.log("hejFromUseSerachDates",newDate?.toDate() )       
             
          
             
    
},[data,givenIndex])

   

    return (newDate)

}