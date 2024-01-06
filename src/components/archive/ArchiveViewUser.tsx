import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../../App";
import { useSearchIndexCloseToday } from "../../hooks/useSearchIndexCloseToday";
import { useSearchDatesPlusN } from "../../hooks/useSearchDatesPlusN";
import DateFnsFormat from "../DateFnsFormat";

export interface IArchiveViewUser{}

export interface ItimestampArr1{
  id: string
  time: Date
  pausaData: Date
  reason: string
}

export interface ItimestampArr2{
  id: string
  time: Date
  endPauseData: Date
}

export interface ItimestampArr3{
  id: string
  time: Date
  stopData: Date
}
export interface ItimestampArr4{
  id: string
  time: Date
  restartData: Date
}

export const ArchiveViewUser : React.FunctionComponent<IArchiveViewUser> =(props) => {

    const [debt, setDebt] = useState<number | null>(null); 
    const [add, setAdd] = useState<number | null>(null); 
const [name, setName] = useState<string | null>(null);
const [surname, setSurname] = useState<string | null>(null);
const [isMulti, setIsMulti] = useState<boolean>(false);
const [isPass, setIsPass] = useState<boolean>(false);
const [isPause, setIsPause] = useState<boolean>(false);
const [isStop, setisStop] = useState<boolean>(false);
const [due, setDue] = useState<Date | null>(null);
const [rendered, setRendered] =   useState(false);
//const [archiveName, setArchiveName] = useState<string | null>(null);
const [timestampArr1, setTimestampsArr1] = useState< ItimestampArr1 | null>(null);
const [timestampArr2, setTimestampsArr2] = useState< ItimestampArr2 | null>(null);
const [timestampArr3, setTimestampsArr3] = useState< ItimestampArr3 | null>(null);
const [timestampArr4, setTimestampsArr4] = useState< ItimestampArr4 | null>(null);
const [timestampAllArr, setTimestampsAllArr] = useState<Date[] | null>(null);
   
//archive
const [reportArchiveDate, setReportArchiveDate] = useState<Date | null>(null);
const [pausaData, setPausaDate]= useState<Date | null>(null);
const [endPauseData, setEndPauseData]= useState<Date | null>(null);
const [stopData, setStopData]= useState<Date | null>(null);
const [restartData, setRestartData]= useState<Date | null>(null);


const { currentUser} = useContext(UserContext); 



      const getArchiveDatafromBase = useCallback(async() => {

      const getfromBase1 =async()=>{        
        if(currentUser){
   
        //Q 1 
        const q1 = query(collection(db, "activitiArchive"), where("userUid", "==", currentUser.uid), where("pausaData", "!=", null));
        
        const unsubscribe = onSnapshot(q1, (querySnapshot) => { 
          const temp1 = querySnapshot.docs.map((doc) => {
            
           // console.log("tuuu", doc.id, " => ", doc.data());
         
            if(doc.data().pausaData){
              return {
                id: doc.id,
                time: doc.data().created_at,
                pausaData: doc.data().pausaData,
                reason: doc.data().reason
              };
            }            
            });
           // console.log("temp1",temp1)
            setTimestampsArr1([...temp1])
           
         });

  
    return () => unsubscribe();
  }

}

 
const getfromBase2 =async()=>{    

if(currentUser){
   // Q2
   const q2 = query(collection(db, "activitiArchive"), where("userUid", "==", currentUser.uid), where("endPauseData", "!=", null));
        
   const unsubscribe = onSnapshot(q2, (querySnapshot) => { 
     const temp2 = querySnapshot.docs.map((doc) => {
       
       //console.log("tu2", doc.id, " => ", doc.data());
    
       if(doc.data().endPauseData){
         return {
           id: doc.id,
           time: doc.data().created_at,
           endPauseData: doc.data().endPauseData
         };
       }            
       });
       //console.log("temp2",temp2)
       setTimestampsArr2([...temp2])
      // console.log("timestampArr2",timestampArr2)
    });


return () => unsubscribe();

}
}

const getfromBase3 =async()=>{    

  if(currentUser){
     // Q3
     const q3 = query(collection(db, "activitiArchive"), where("userUid", "==", currentUser.uid), where("stopData", "!=", null));
          
     const unsubscribe = onSnapshot(q3, (querySnapshot) => { 
       const temp3 = querySnapshot.docs.map((doc) => {
         
        // console.log("tu3", doc.id, " => ", doc.data());
      
         if(doc.data().stopData){
           return {
             id: doc.id,
             time: doc.data().created_at,
             stopData: doc.data().stopData
           };
         }            
         });
         //console.log("temp3",temp3)
         setTimestampsArr3([...temp3])
         //console.log("timestampArr3",timestampArr3)
      });
  
  
  return () => unsubscribe();
  
  }
  }

  const getfromBase4 =async()=>{    

    if(currentUser){
       // Q4
       const q4 = query(collection(db, "activitiArchive"), where("userUid", "==", currentUser.uid), where("restartData", "!=", null));
            
       const unsubscribe = onSnapshot(q4, (querySnapshot) => { 
         const temp4 = querySnapshot.docs.map((doc) => {
           
           //console.log("tu4", doc.id, " => ", doc.data());
        
           if(doc.data().restartData){
             return {
               id: doc.id,
               time: doc.data().created_at,
               restartData: doc.data().restartData
             };
           }            
           });
           //console.log("temp4",temp4)
           setTimestampsArr4([...temp4])
           //console.log("timestampArr4",timestampArr4)
        });
    
    
    return () => unsubscribe();
    
    }
    }
  




    getfromBase1();
    getfromBase2();
    getfromBase3();
    getfromBase4();


  }, [db,currentUser]); 

    
  
  

      useEffect(()=>{
     
        getArchiveDatafromBase();

      },[rendered,db,currentUser, getArchiveDatafromBase]) 
      //,getArchiveDatafromBase i ta druga tez do memo podobnie jak w ktoryms komponencie ?

      // useEffect(()=>{
      //   //console.log("timestampArr",timestampArr1,timestampArr2,timestampArr3,timestampArr4);

      //  // timestampArr?.map((ele)=>{
      //   //  console.log("ele",(ele.endPauseData)?.toDate(), "timestamp",ele.endPauseData)
      //   //})

      // },[rendered])

      // useEffect(() => {
      //  // console.log("timestampArr1.length", timestampArr1?.length);
      //   // timestampArr1.map((elem) => console.log("element 1", elem));
      // }, [timestampArr1]);
   
    return (<>
<br></br><br></br>
HISTORIA AKTYWNOŚCI
<ol>
    {timestampArr1 &&
     timestampArr1.map((elem)=>(
     <li key={elem.id}>
  <div className="archive">
    <p>pauza zgłoszona dnia: </p>
    <p><DateFnsFormat element={elem.time}/></p>
    <p>od: <DateFnsFormat element={elem.pausaData}/></p>
    </div>
     </li> 
     ))}

    {timestampArr2 &&
     timestampArr2.map((elem)=>(
     <li key={elem.id}>
  <div className="archive">
    <p>powrót po kontuzji zgłoszony dnia: </p>
    <p><DateFnsFormat element={elem.time}/></p>
     <p>od: <DateFnsFormat element={elem.endPauseData}/></p> 
     </div>
     </li> 
     ))}

    {timestampArr3 &&
     timestampArr3.map((elem)=>(
     <li key={elem.id}>
          <div className="archive">
    <p>stop zgłoszony dnia: </p>
    <p><DateFnsFormat element={elem.time}/></p>
    <p>od: <DateFnsFormat element={elem.stopData}/></p> 
         </div>
     </li> 
     ))}

    {timestampArr4 &&
     timestampArr4.map((elem)=>(
     <li key={elem.id}>
        <div className="archive">
         <p>powrót do klubu zgłoszony dnia: </p>
         <p><DateFnsFormat element={elem.time}/></p>
         <p>od: <DateFnsFormat element={elem.restartData}/></p> 
         </div>
     </li> 
    
     ))}


</ol>

    </>)

}

export default ArchiveViewUser