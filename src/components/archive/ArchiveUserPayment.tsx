import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { db } from "../../App";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { Link } from "react-router-dom";
import DateFnsFormat from "../DateFnsFormat";

export interface IArchiveUserPayment{}
export interface ItimestampArr{
created_at: Date
kto: string
trenings: 8
userUid: string
}



const ArchiveUserPayment : React.FunctionComponent<IArchiveUserPayment> =() => {
    const { currentUser} = useContext(UserContext); 
    const [paymentsArr, setPaymentsArr] = useState< ItimestampArr | null>(null);


    const getArchivePayfromBase = useCallback(async() => {

        const getfromBase =async()=>{  

            if(currentUser){
                  
 
            const q = query(collection(db, "paymentArchive"), where("userUid", "==", currentUser.uid));
            
            const unsubscribe = onSnapshot(q, (querySnapshot) => { 
                //console.log("querySnapshot",querySnapshot.docs)  
                const temp = querySnapshot.docs.map((doc) => {
                
              // console.log("payArch", doc.id, " => ", doc.data());
             
                if(doc.data()){
                  return {
                    id: doc.id,
                    time: doc.data().created_at,
                    kto: doc.data().kto,
                    trenings: doc.data().trenings   
                  };
                }            
                });
               // console.log("temp1",temp1)
                setPaymentsArr([...temp])
               
             });
    
      
        return () => unsubscribe();
      }
    
    }
    getfromBase();
    },[db,currentUser])
    
    useEffect(()=>{
     
        getArchivePayfromBase();

      },[db,currentUser, getArchivePayfromBase])
      
      useEffect(()=>{

      //console.log("paymentsArr",paymentsArr )

            },[getArchivePayfromBase, paymentsArr])

    return(<div>

        HISTORIA PŁATNOSCI
   <ol>    
        {paymentsArr &&
     paymentsArr.map((elem)=>(
  
        <li key={elem.id} >
        {/* płatność dnia: {elem.time.toDate().toString()} */}
        <div className="archive">
        <p>płatność dnia: </p>
       <p><DateFnsFormat element={elem.time}/></p> 
        <p>za: {elem.trenings} treningów</p>
        </div>
         </li> 
          
     ))}
      </ol>   
   
        
        </div>)
}

export default ArchiveUserPayment
