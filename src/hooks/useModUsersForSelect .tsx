import { useEffect, useState } from "react";
import { useFetchUsers } from "./useFetchUsers";


export const useModUsersForSelect = () => {  
  const {usersInfo} = useFetchUsers();
   // const [usersModForSelect, setUsersModForSelect] = useState([])
//console.log("usersIiiiiinfo",usersInfo)

    //useEffect(()=>{ 
  

     const temp: any[] = [];   
    
      usersInfo?.map((el: { dob: string | number | Date; name: string; surname: string; id: any; })=>{  

       // console.log('ellll',el) 
      
    const formatDate: Date  = new Date(el.dob)
    const today: Date = new Date(); // Dzisiejsza data             
    const diffTime: number = Math.abs(today - formatDate);  
    const age = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25));   
    const nameSurnameAge =  el.name + " "+ el.surname +" "+ age;  

    //return { value: el.id, label: nameSurnameAge}
    temp.push({ value: el.id, label: nameSurnameAge})    
    
    });
    //setUsersModForSelect(usersModForSelect); 
    //console.log("users info gotowe")
  

   // },[usersInfo]) 

   
    
    //console.log("usersInfouseMod",usersInfo)
   // console.log("usersModForSelectorigninal",usersModForSelect)

  

    return temp

}