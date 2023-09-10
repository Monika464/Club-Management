import { useFetchDates } from "./useFetchDates";
import { db } from "../App.js";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";


//export const useSearchDates = ( startingDate: Date, indexesAmount: number): Date[] | null | number => {
    export const useSearchDates = (): Date[] | null | number => {

        const [paymentDate, setPaymentDate] = useState<Date[] | null>(null)
        const [dateStartingPoint, setDateStartingPoint] = useState<Date[] | null>(null)
        const [newPaymentDate, setNewPaymentDate] = useState<Date[] | null>(null)

    const dataFromBase =  useFetchDates();

    //console.log("data z nowy searchhook",dataFromBase)

    //pobieramy z bazy szukana date

    useEffect(()=>{

       const getDates = async () =>{

        const userRef = doc(db,"usersData", "z9qvxJlbbWJKLBHsgHx7" )
        const docSnap = await getDoc(userRef);
       // console.log(docSnap.data()?.paymentDate);

           if(docSnap.data()){
              setPaymentDate(docSnap.data().paymentDate);
            } else {console.log("not yet")}
        }
            
       getDates();

      

    },[db])

    

    

    if(dataFromBase){
    dataFromBase.map((dat,ind) =>{

        const paymentyear = paymentDate?.toDate().getYear()
        const paymentmonth = paymentDate?.toDate().getMonth()
        const paymentday = paymentDate?.toDate().getDate()

        const datyear = dat?.toDate().getYear()
        const datmonth = dat?.toDate().getMonth()
        const datday = dat?.toDate().getDate()

        if (paymentyear === datyear && paymentmonth === datmonth && paymentday === datday){
            console.log("yes,yes", dat.toDate())
        }
        
        //console.log("dat",dat,ind)
    })


}
    const a: number = 1;

    return a
}

/*const handleComplete = async (id: string, completed: boolean): Promise<void> => {
        await updateDoc(doc(db, `users/${userId}/tasks/${id}`), {
            completed: !completed
        })}*/