import { useFetchUsers } from "./useFetchUsers";



export interface ITimeObj {
  toMillis(): unknown;
  seconds: number,
  nanoseconds: number
}


interface IforSel {
  value: Ivalue;
  label: string
}

interface Ivalue{
  dob:ITimeObj,
  name: string,
  surname: string,
  id: string,
  
}
export const useModAvatUsers = ():IforSel[] => {  

  const {usersInfo} = useFetchUsers();


  

     const temp: IforSel[] = [];   
    
      usersInfo?.map((el: Ivalue)=>{  
        const today= new Date();
        //console.log("el", el)
        //console.log("el", el.dob.toDate())
       const todayUTimestamp = (today.getTime());
       const elementDobUTimestamp = el.dob?.toDate().getTime();
      //console.log("timestamp urodzenia", el.dob?.toDate().getTime(),"timastamp dzis",todayUTimestamp)
      const diffTime: number = Math.abs(todayUTimestamp - elementDobUTimestamp);  
 
    const age = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25));   
    const nameSurnameAge =  el.name + " "+ el.surname +" "+ age;  

    //return { value: el.id, label: nameSurnameAge}
    temp.push({ value: el, label: nameSurnameAge})    
    
    });
  

  

    return temp

}