import { useEffect, useState } from "react";
import { useFetchUsers } from "./useFetchUsers";


export const useModUsersForSelect = () => {

    const [usersModForSelect, setUsersModForSelect] = useState([{}])

    const {usersInfo} = useFetchUsers();
    //console.log("usersInfo",usersInfo)

    const temp1 =[{}]

    useEffect(()=>{ 

        if(usersInfo) 
           
        usersInfo.forEach((el)=>{  
    //console.log("ell",el.dob)
    const formatDate = new Date(el.dob)
    //console.log('formatDate', formatDate)
    const today = new Date(); // Dzisiejsza data
               
    const diffTime = Math.abs(today - formatDate); 
   // console.log("diffTime",diffTime)
    const age = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25));
    
      let nameSurnameAge =  el.name + " "+ el.surname +" "+ age; 
      //console.log(" nameSurnameAge",  nameSurnameAge)
      temp1.push({ value: el.id, label: nameSurnameAge})  
      //console.log("temp1",temp1)
     
    })
    setUsersModForSelect(temp1); 


    },[usersInfo])

   
    
    //console.log("usersInfouseMod",usersInfo)
    console.log("usersModForSelectorigninal",usersModForSelect)

  

    return usersModForSelect

}