
import { collection, doc, onSnapshot, query } from "firebase/firestore";
import { db } from "../App.tsx";
import { getFirestore } from 'firebase/firestore';
import { useEffect } from "react";
export interface IDatesTrainingProps {};

//const db = getFirestore(app);

//console.log('db',db)

export const DatesTrainings: React.FunctionComponent<IDatesTrainingProps> =(props) => {

    useEffect(()=>{
        const daysCollection = collection(db, "trainingDays");
        onSnapshot(daysCollection, 
            (snapshot)=>{
               snapshot.docs.map((doc)=> {console.log(doc.data(),"doc")})
            
            })

        /*
        const daysCollection = collection(db, "trainingDays");
        //console.log('daysCollection',daysCollection)
        
        const q = query(collection(db, "trainingDays"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
        
            console.log('querySnapshot',querySnapshot)
        })
        
        unsubscribe();
*/


    },[])



    //useEffect(()=>{
     //   onSnapshot(daysCollection, (snapshot)=>{
     //       console.log('snapshot',snapshot)
      //  })
   // })
    
   

    return (<>dates</>)
}