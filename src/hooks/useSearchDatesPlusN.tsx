import { useFetchDates } from "./useFetchDates";
import { db } from "../App.js";
import { Timestamp, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";



export const useSearchDatesPlusN = (howMany: number, id: string) => {
  //const howMany = 8;
  //const id= "Y19J2pywqfd2YKN3zVVGlzYEWR82";
  const [paymentDate, setPaymentDate] = useState<Date | null>(null);
  const [wantedIndex, setWantedIndex] = useState<number | null>(null);
  const [isDb, setIsDb] = useState<boolean>(false); 

  const dataFromBase = useFetchDates();

  useEffect(() => {
    const getDates = async () => {
      //const userRef = doc(db, "usersData", id);
      const userRef = doc(db, "usersData", id);
      const docSnap = await getDoc(userRef);

      if (docSnap.data()) {
        console.log("czy mamy snap",docSnap.data().due ) 
        //setPaymentDate(docSnap.data().due);
        console.log("type of",typeof(docSnap.data().due) )
        console.log("czy mamy payment day",Timestamp.fromDate(new Date(docSnap.data().due)))
        setPaymentDate(Timestamp.fromDate(new Date(docSnap.data().due)));
        setIsDb(true)
      } else {
        console.log("not yet");
      }
    };

    getDates();


  }, [db]);


  useEffect(()=>{

    const baseCheck = async ()=>{

    if (isDb) {

  const paymentYear = paymentDate?.toDate().getFullYear();
  const paymentMonth = paymentDate?.toDate().getMonth();
  const paymentDay = paymentDate?.toDate().getDate();
  //console.log("paymentYear",paymentYear)


        for (let ind = 0; ind < dataFromBase?.length; ind++) {
            const dat = dataFromBase[ind];
            const datYear = dat?.toDate().getFullYear();
            const datMonth = dat?.toDate().getMonth();
            const datDay = dat?.toDate().getDate();



                     if (
                            paymentYear === datYear &&
                            paymentMonth === datMonth &&
                            paymentDay === datDay
                     ) {
            //console.log("yes, yes", dat, ind);
            //setWantedIndex(ind + 8);
            setWantedIndex(ind + howMany);
            break; // Przerwij pętlę po znalezieniu odpowiedniego indeksu
            }
        }

    } else { console.log("...loading")}
   }
   baseCheck();

   console.log("wantedIndexuseSearchdatesPlusN", wantedIndex);
   console.log("hello from useSearchdatesPlusN")

  },[db,isDb,wantedIndex,paymentDate])


  return wantedIndex;


};


