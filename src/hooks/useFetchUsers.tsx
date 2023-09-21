import { Firestore, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { SetStateAction, useEffect, useState } from "react";
import { db } from "../App.js";
import { doc, updateDoc, serverTimestamp  } from "firebase/firestore";


export interface IFetchDates {

    db: Firestore,  
    colName: string,
    userInfo: string | null,
    setUserInfo: React.Dispatch<SetStateAction<string | null>>

};

export const useFetchUsers  = ():any | null => { 

    const [usersInfo, setUsersInfo ] =useState<String[] | null>(null)
    const [loadingUsers, setLoadingusers] =useState<boolean>(false)
    const [loadingDB, setLoadingDB] =useState<boolean>(false)

    useEffect(()=>{

      const getUsersData = ()=>{     

        if (!db) {
       console.error('Firebase Firestore is not ready yet');
       setLoadingDB(true)
        
       } else { setLoadingDB(false)}
                 
      const q =  query(collection(db, "usersData"), orderBy ("surname"));
   
   //zeby sie get user robily po zaladowaniu odrazu
   const temp = []; 
   
         const unsubscribe =  onSnapshot(q, (querySnapshot) => { 
          // setLoadingusers(true) 
 
             

           querySnapshot.forEach((doc) => {   
            
             //cities.push(doc.data().name);
              temp.push(doc.data()); 
              
             // setLoadingusers(false)
             //setUsersFromBase((prev) => [...prev,doc.data()])
           });  
          
         
          });
          setUsersInfo (temp); 
  
        return unsubscribe;
     }
     
     
     //console.log('usersInfoWew' ,usersInfo )    
     //console.log('db' ,db )  
        
  

  getUsersData()


    },[db])

	
return {usersInfo,loadingUsers,loadingDB }
}



export const useUserForUpdate =()=>{


 // const docRef = doc(db, 'usersaData', 'Y19J2pywqfd2YKN3zVVGlzYEWR82');
  
  // Update the timestamp field with the value from the server
/*
  const updatingUser = async()=>{

    const updateTimestamp = await updateDoc(washingtonRef, {
      capital: true
    });
  
    const updateTimestamp = await updateDoc(docRef, {
        timestamp: serverTimestamp()
    });
*/

  }

  




