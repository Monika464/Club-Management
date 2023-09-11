import { useFetchDates } from "./useFetchDates";
import { db } from "../App.js";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";



export const useSearchDates = (howMany: number): number | null => {
  const [paymentDate, setPaymentDate] = useState<Date[] | null>(null);
  const [wantedIndex, setWantedIndex] = useState<number | null>(null);
  const [isDb, setIsDb] = useState<boolean>(false);

  const dataFromBase = useFetchDates();

  useEffect(() => {
    const getDates = async () => {
      const userRef = doc(db, "usersData", "z9qvxJlbbWJKLBHsgHx7");
      const docSnap = await getDoc(userRef);

      if (docSnap.data()) {
        setPaymentDate(docSnap.data().paymentDate);
        setIsDb(true)
      } else {
        console.log("not yet");
      }
    };

    getDates();
//console.log("paymentDate",paymentDate)
//console.log("dataFromBase",dataFromBase)

  }, [db]);


  useEffect(()=>{

    const baseCheck = async ()=>{

    if (isDb) {

  const paymentYear = paymentDate?.toDate().getFullYear();
  const paymentMonth = paymentDate?.toDate().getMonth();
  const paymentDay = paymentDate?.toDate().getDate();
  console.log("paymentYear",paymentYear)


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

   console.log("wantedIndex", wantedIndex);

  },[db,isDb,wantedIndex])


  return wantedIndex;


};


