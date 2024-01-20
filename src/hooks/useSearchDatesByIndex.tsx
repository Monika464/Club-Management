import { useEffect, useState } from "react";
import { useFetchDates } from "./useFetchDates";

export interface ITimestampObject {    
        seconds: number;
        nanoseconds: number;     
} 

export const useSearchDatesByIndex= (givenIndex: number | null):ITimestampObject  => {  
    
    const [newDate, setNewDate] = useState<ITimestampObject>(null!)

    const data =  useFetchDates();
    //console.log("czy data", data)
    //to nie data tylko obiket)

    useEffect(()=>{

        if(givenIndex && data){
                    if(givenIndex > (data?.length -1)){
                        alert("bład brak dat")
                        }   
                data?.forEach((elem, index) => {
//console.log("co to elem", elem)
                   if(givenIndex === index){  
                    setNewDate(elem)               
                    return newDate            
                    }   
                 });

            //console.log("hejFromUseSerachDates",newDate?.toDate() )       
             
          
        }          
    
},[data,givenIndex])

   

    return (newDate)

}