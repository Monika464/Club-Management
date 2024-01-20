import { useFetchDates } from "./useFetchDates";
import { db } from "../App.js";
import { Timestamp, collection, doc, getDoc, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

export interface ITimestampObject {
  toMillis(): string | number | Date;
    
  seconds: number;
  nanoseconds: number;     
} 

 
export interface UsersDueDates{
  timestampObj: {
 seconds: number
nanoseconds: number
},
id: string
 
}
  

export const useSearchDatesPlusN = (howMany: number, id: string | null | undefined) => {

  const [userDueDate, setuserDueDate] = useState<ITimestampObject | null>(null);
  const [wantedIndex, setWantedIndex] = useState<number>(null!);
  const [isDb, setIsDb] = useState<boolean>(false); 
  const dataFromBase = useFetchDates();

  //console.log("co odbiera searchplusn", howMany,id)
  //console.log("dataFromBase",dataFromBase)

  const [rendered, setRendered] = useState(false);


useEffect(() => {
  const timer = setTimeout(() => {
    setRendered(true);
  }, 1000); // 1000 milisekund = 1 sekunda

  return () => {
    clearTimeout(timer); // W przypadku odmontowania komponentu przed zakończeniem opóźnienia
  };
}, []);

  useEffect(() => {
    const getUserDueDate = async () => {

      if(id && db){
  
             const userRef = doc(db, "usersData", id);
            const docSnap = await getDoc(userRef)
            if (docSnap.exists()) {
           //console.log("czy mamy docSnap",docSnap?.data().due )
              if(docSnap?.data().due ){
               setuserDueDate(docSnap?.data().due )
               }
              
         setIsDb(true)
        }
       }
    }
    getUserDueDate();

    
   
  },[db,howMany,id,rendered])

  
  useEffect(()=>{
    //console.log('userDueDate',userDueDate);
    
    const baseCheck = async ()=>{

      //ale ten hook moze wystapic w miejscu bez duedata i mamy blad

    if (isDb && dataFromBase && userDueDate) { 

 const paymentYear = new Date(userDueDate?.toMillis()).getFullYear() 
const paymentMonth = new Date(userDueDate?.toMillis()).getMonth() 
const paymentDay = new Date(userDueDate?.toMillis()).getDate() 


//console.log("paymentYear",paymentYear, paymentMonth,paymentDay)



        for (let ind = 0; ind < dataFromBase?.length; ind++) {
            const dat = dataFromBase[ind];
            const datYear = new Date(dat?.toMillis()).getFullYear() 
            const datMonth = new Date(dat?.toMillis()).getMonth()
            const datDay =  new Date(dat?.toMillis()).getDate()
           // console.log("dat",dat)
          //  const datYear = dat ? new Date((dat as Timestamp).toDate()).getFullYear() : null;
          //  const datMonth = dat ? new Date((dat as Timestamp).toDate()).getMonth() : null;
          //  const datDay = dat ? new Date((dat as Timestamp).toDate()).getDate() : null;
            // const datYear = dat?.toDate().getFullYear();
            // const datMonth = dat?.toDate().getMonth();
            // const datDay = dat?.toDate().getDate();



                     if (
                            paymentYear === datYear &&
                            paymentMonth === datMonth &&
                            paymentDay === datDay
                     ) {
            //console.log("cos rowne", ind, dat?.toDate());
            //console.log("drugi parametr w usePusN czyli o ile munerów zmienic", howMany);
            //setWantedIndex(ind + 8);
                          if(howMany){
                            //console.log("howMany",howMany)
                          setWantedIndex(ind + howMany);
                          } else {
                            setWantedIndex(ind)

                          }
            break; // Przerwij pętlę po znalezieniu odpowiedniego indeksu
            }
        }

    } else { console.log("...loading")}
   }
   baseCheck();

   //console.log("wantedIndexuseSearchdatesPlusN", wantedIndex);
   //console.log("hello from useSearchdatesPlusN")

  },[userDueDate]) 


  return wantedIndex;


};


