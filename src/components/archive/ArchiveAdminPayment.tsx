import Select from 'react-select'
import { useModUsersForSelect } from '../../hooks/useModUsersForSelect ';
import { useCallback, useEffect, useState } from 'react'; 
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../App';
import DateFnsFormat from '../DateFnsFormat';

export interface IArchiveAdminPayment{}
export interface ItimestampArr{
  created_at: Date
  kto: string
  trenings: 8
  userUid: string
  }

const ArchiveAdminPayment : React.FunctionComponent<IArchiveAdminPayment> =() => {

    const userModForSelect  =  useModUsersForSelect(); 
   
    const [chosenUserId, setChosenUserId] = useState<string | null>(null)
    const [chosenUserByIdLabel, setChosenUserByIdLabel] = useState<string | null>(null) 
    const [paymentsArr, setPaymentsArr] = useState< ItimestampArr | null>(null);
    const [rendered, setRendered] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
          setRendered(true);
        }, 1000); // 1000 milisekund = 1 sekunda
      
        return () => {
          clearTimeout(timer); // W przypadku odmontowania komponentu przed zakończeniem opóźnienia
        };
      }, []);


      const getArchivePayfromBase = useCallback(async() => {

        const getfromBase =async()=>{  

            if(chosenUserId){
                  
 
            const q = query(collection(db, "paymentArchive"), where("userUid", "==", chosenUserId));
            
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
    },[db,chosenUserId])
    
    useEffect(()=>{
     
        getArchivePayfromBase();

      },[db,chosenUserId, getArchivePayfromBase])
      
      useEffect(()=>{

      console.log("paymentsArr",paymentsArr )

            },[getArchivePayfromBase, paymentsArr])



    return(
        <div>
          <br></br>  <br></br>
               <Select
      closeMenuOnSelect={true}  
      options={userModForSelect}
      onChange={(choice) => {
        setChosenUserId(choice.value);   
        setChosenUserByIdLabel(choice.label); 
      }} 
      />
      {chosenUserByIdLabel}
            <br></br><br></br>
            HISTORIA PŁATNOŚCI 
            <br></br>
       <ol>
            {paymentsArr &&
     paymentsArr.map((elem)=>(
  
        <li key={elem.id}>
        płatność dnia: <DateFnsFormat
        element={elem.time}/>
        za: {elem.trenings} treningów
         </li> 
          
     ))}
        
        </ol>  
        
        
        </div>
    )
}

export default ArchiveAdminPayment