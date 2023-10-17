import { useFetchDates } from "./useFetchDates";
import { db } from "../App.js";
import { Timestamp, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";


//ile dodac do daty platnosci i dla jakiego id
export const useSearchDatesPlusN = (howMany: number | null, id: string | null | undefined) => {

  //console.log("how many", howMany)
  //const id= "Y19J2pywqfd2YKN3zVVGlzYEWR82";
  const [userDueDate, setuserDueDate] = useState<Date | null>(null);
  const [wantedIndex, setWantedIndex] = useState<number | null>(null);
  const [isDb, setIsDb] = useState<boolean>(false); 

  const dataFromBase = useFetchDates();
  ///console.log("dataFromBase",dataFromBase);
  //console.log("iiiid",id);

  useEffect(() => {
    const getUserDueDate = async () => {

      if(id && db){
      const userRef = doc(db, "usersData", id);
      const docSnap = await getDoc(userRef)
    
     // console.log("czy mamy docSnap",docSnap?.data().due )
     setuserDueDate(docSnap?.data().due )
     setIsDb(true)
       }
    }
    getUserDueDate();

   // console.log('userDueDate',userDueDate);
   
  },[db,id])

  /*

  useEffect(() => {
    const getDates = async () => {
      //const userRef = doc(db, "usersData", id);
      const userRef = doc(db, "usersData", id);
      const docSnap = await getDoc(userRef);

      if (docSnap.data()) {
        console.log("czy mamy snap",docSnap.data().due ) 
        //setPaymentDate(docSnap.data().due);
       //console.log("type of",typeof(docSnap.data().due) )
       // console.log("czy mamy payment day",Timestamp.fromDate(new Date(docSnap.data().due)))
       // setPaymentDate(Timestamp.fromDate(new Date(docSnap.data().due)));
        setIsDb(true)
      } else {
        console.log("not yet");
      }
    };

    getDates();
console.log("hej from useSerach")

  }, [db]);
*/

  useEffect(()=>{

    const baseCheck = async ()=>{

      //ale ten hook moze wystapic w miejscu bez duedata i mamy blad

    if (isDb && dataFromBase && userDueDate) {

  const paymentYear = userDueDate?.toDate().getFullYear();
  const paymentMonth = userDueDate?.toDate().getMonth();
  const paymentDay = userDueDate?.toDate().getDate();
  //console.log("userDueDate",userDueDate?.toDate())


        for (let ind = 0; ind < dataFromBase?.length; ind++) {
            const dat = dataFromBase[ind];
           // console.log("dat",dat)
            const datYear = dat?.toDate().getFullYear();
            const datMonth = dat?.toDate().getMonth();
            const datDay = dat?.toDate().getDate();



                     if (
                            paymentYear === datYear &&
                            paymentMonth === datMonth &&
                            paymentDay === datDay
                     ) {
            console.log("tutaj in czyli parametr w usePusN czyli indeks daty kiedy płacono", ind);
            console.log("drugi parametr w usePusN czyli o ile munerów zmienic", howMany);
            //setWantedIndex(ind + 8);
            setWantedIndex(ind + howMany);
            break; // Przerwij pętlę po znalezieniu odpowiedniego indeksu
            }
        }

    } else { console.log("...loading")}
   }
   baseCheck();

   //console.log("wantedIndexuseSearchdatesPlusN", wantedIndex);
   //console.log("hello from useSearchdatesPlusN")

  },[db,isDb,userDueDate]) 


  return wantedIndex;


};


