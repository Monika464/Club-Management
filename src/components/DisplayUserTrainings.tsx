import { useFetchDates } from "../hooks/useFetchDates";
import { useFetchUsers } from "../hooks/useFetchUsers";
import { useSearchIndexCloseToday } from "../hooks/useSearchIndexCloseToday";
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../App";

export interface IDisplayUserTrainings{}
 

//UCZYMY SIE CLOUD FUNCTION

//https://firebase.google.com/docs/functions/callable?gen=2nd
//obejrzyj to
//https://www.youtube.com/watch?v=4wa3CMK4E2Y AUTH TUT a
//potem to
//https://www.youtube.com/watch?v=udHm7I_OvJs  CLOUD TUT

//https://firebase.google.com/docs/auth/admin/manage-users

//sending emails
//https://softauthor.com/firebase-functions-send-email/


export const DisplayUserTrainings : React.FunctionComponent<IDisplayUserTrainings> =(props) => {
   

  const data =  useFetchDates();
  const {usersInfo} = useFetchUsers();
  const closeTodaysIndex = useSearchIndexCloseToday()
  const { currentUser} = useContext(UserContext); 

  useEffect(()=>{

  const getAddfromBase =async ()=>{
    console.log("currentUser",currentUser?.uid)
    if(currentUser){  

       
      
      const userRef = doc(db, "usersData",currentUser.uid);
      const docSnap = await getDoc(userRef);

         if (docSnap.exists()) {

            console.log("imie",docSnap.data())
            //ustaw czy ma dlug
            //ustaw czy ma pausa czy stop jak nie to active

         } else (console.log("dokumemt nie istnieje"))
        }

    }

    getAddfromBase();
},[db,currentUser])

  //console.log(data,usersInfo,closeTodaysIndex, currentUser )


    //sciagamy daty z bazy 
    //szukamy close todat i dwa kolejne indexy
    //sciagamy dane o uzytkowniku
    // czy nie jest multi
    //multi czarne kolejne indexy i info aktywny
    //lub pausa stop
    //jego due date i porownujemy cz wieksze czy mniejsze
    //jego pausa lub stop
    //zczytujemy czy ma dlug i jesli tak wyswietlay

    return (<>
    DisplayUserTrainings
    </>)

}