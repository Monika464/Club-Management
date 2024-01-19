
import { useFetchUsers } from "./useFetchUsers";

interface users {
  value: string;
  label: string
}

export const useModUsersForSelect = () => {  
  const {usersInfo} = useFetchUsers();


  

     const temp: users[] = [];   
    
      usersInfo?.map((el: { dob: string | number | Date; name: string; surname: string; id: any; })=>{  
        const today= new Date();
       // console.log("el", el)
        //console.log("el", el.dob.toDate())
       const todayUTimestamp = (today.getTime());
       const elementDobUTimestamp = el.dob?.toDate().getTime();
      //console.log("timestamp urodzenia", el.dob?.toDate().getTime(),"timastamp dzis",todayUTimestamp)
      const diffTime: number = Math.abs(todayUTimestamp - elementDobUTimestamp);  
 
    const age = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25));   
    const nameSurnameAge =  el.name + " "+ el.surname +" "+ age;  

    //return { value: el.id, label: nameSurnameAge}
    temp.push({ value: el.id, label: nameSurnameAge})    
    
    });
  

  

    return temp

}