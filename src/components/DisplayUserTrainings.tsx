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
    const displayName = currentUser?.displayName;
    const email = currentUser?.email;
    const photoURL = currentUser?.photoURL;
    const emailVerified = currentUser?.emailVerified;

    console.log("currentUser",currentUser?.uid, "display name",displayName,email,photoURL, emailVerified)
  
    
    if(currentUser){  
          
      const userRef = doc(db, "usersData",currentUser.uid);
      const docSnap = await getDoc(userRef)
      if (docSnap.exists()) {
        console.log("docSnaap",docSnap.data())
      }
       //  if (docSnap.exists()) {

          //  console.log("imie",docSnap.data())
            //ustaw czy ma dlug
            //ustaw czy ma pausa czy stop jak nie to active

        // } else (console.log("nie ma danych usera., imienia ani uid"))
        }

    }

    getAddfromBase();
},[db,currentUser])





    return (<>
    DisplayUserTrainings
    </>)

}
//https://firebase.google.com/docs/auth/web/manage-users