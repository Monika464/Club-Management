import { useState } from "react";
import { useFetchUsers } from "./useFetchUsers";



export const useTest2 = () => {  

  
    
    const {usersInfo} = useFetchUsers();
    const  [mnuSel, setMnuSel] = useState([])
    const temp = []
   
   usersInfo?.map((ell,ind) => {
        console.log("heeel",ell)
        const nameSurnameAge =  ell.name + " "+ ell.surname;
        temp.push ({ value: ell.id, label: nameSurnameAge})
    })
   
console.log("teeem", temp)
    

console.log("czy tu info",usersInfo)

return temp

}
