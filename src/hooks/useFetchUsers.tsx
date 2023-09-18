import { Firestore } from "firebase/firestore";

export interface IFetchDates {

    db: Firestore,
    colName: string,
    data: Date | null,
    setData: React.Dispatch<SetStateAction<Date | null>>

};

export const useFetchUsers  = (): Date[] | null => {

	const getUsersData = ()=>{     
   
        //if (db) {
//const q = query(collection(db, "usersData"), where("name", "==", "Rafał"));

 if (!db) {
        console.error('Firebase Firestore is not ready yet');
         return;
        }
                  
    const q = query(collection(db, "usersData"), orderBy ("name"));
    
    //zeby sie get user robily po zaladowaniu odrazu
    
const tempFunction = async () =>{
    
     const unsubscribe = await onSnapshot(q, (querySnapshot) => {
    
    //zmien pobieranie jak sie da na prostsze  
           const temp = [];
            querySnapshot.forEach((doc) => {
              //cities.push(doc.data().name);
               temp.push(doc.data());
                setUsersFromBase(temp);
              //setUsersFromBase((prev) => [...prev,doc.data()])
            });
          
         
    });
   
         return unsubscribe;
      }
      
       tempFunction();  
   console.log('usersFromBase' ,usersFromBase )    
         
   };


useEffect(()=>{
getUsersData();
},[currentActiveUser])
}