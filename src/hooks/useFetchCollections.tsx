import { Firestore, collection, getDoc, onSnapshot, orderBy, query } from "firebase/firestore";
import { SetStateAction, useEffect, useState } from "react";
import { db } from "../App.js";
import { doc, updateDoc, serverTimestamp  } from "firebase/firestore";


// export interface IFetchDates {

//     db: Firestore,  
//     colName: string,
//     userInfo: string | null,
//     setUserInfo: React.Dispatch<SetStateAction<string | null>>

// };

//const chosenCollection = "usersData"
const useFetchCollectionData = (chosenCollection: string) => {  


    const [dataFromCollection, setDataFromCollection ] =useState<String[] | null>(null)
    const [loadingData, setLoadingData] =useState<boolean>(false)
    const [loadingDB, setLoadingDB] =useState<boolean>(false)
    const [error, setError] = useState<string | null | any>('')

    
useEffect(()=>{ 

  const getSomeData = ()=>{  
    
    try {
      if (!db) {
        console.error('Firebase Firestore is not ready yet');
        setLoadingDB(true)       
     } else { setLoadingDB(false)}              
    // const q =  query(collection(db, "usersData"), orderBy ("surname"));
    const q =  query(collection(db, chosenCollection))

  
    const unsubscribe =  onSnapshot(q, (querySnapshot) => { 
 
     const temp = []; 
      setLoadingData(true) 
                              querySnapshot.forEach((doc) => {   
                                //console.log("doc.data()",doc.data().id)
                                    temp.push({...doc.data(), id: doc.id}); })
 //console.log("temp", temp)
                                   setDataFromCollection (temp); 
        setLoadingData(false)
        //setUsersFromBase((prev) => [...prev,doc.data()])
        return unsubscribe;
      })
    } catch (error) {
      setError(error)
    }
  
        
    
    
    };
    
    getSomeData()



},[chosenCollection])

      
return {dataFromCollection, error}
        

}

export default useFetchCollectionData

 