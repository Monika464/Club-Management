
import { CollectionReference, collection, onSnapshot } from "firebase/firestore";
import { db } from "../App.js";
import { SetStateAction, useEffect, useState } from "react";


// export interface IFetchDates {
//     db: Firestore,
//     colName: string,
//     //data: Date | null,
//     data: IDateObject | null
//     setData: React.Dispatch<SetStateAction<IDateObject | null>>
// };

export interface ITimestObj {
    seconds: number;
    nanoseconds: number;
}
export interface IDateObject {
    toMillis(): number;
    seconds: number;
    nanoseconds: number;
}

export interface IDataItem {
    toDate(): unknown;
    created_at: IDateObject;
    datesSet: IDateObject[];
  }

// const createCollection = (collectionName: string) => {
//  return collection(Firestore, collectionName) as CollectionReference<T>
//   }

//export const usersCol = createCollection<User>('users');


export const useFetchDates = (): IDateObject  [] | null => {

    const [data, setData] = useState<SetStateAction<IDateObject[] | null>>(null);
             const daysCollection: CollectionReference<T> = collection(db, "trainingDays");
   

    useEffect(()=>{

        let tempContainer: IDateObject[][] =[]; 
        let tempContainer2: IDateObject[] =[];

        const getingDates = async () =>{
    
        const unsub =  onSnapshot(
            daysCollection, 
            (snapshot: { docs: { data: () => IDataItem }[]; })=>{
                if(snapshot){
   
                      snapshot.docs.map((doc)=> {        
                        tempContainer.push((doc.data().datesSet))      
                       })

                      // console.log("tempContainer",tempContainer)
                       //tempContainer to tablica tablic z Iobsect

                        tempContainer.map((elem: IDateObject[])=>{
                           // console.log('elem', elem);
                             elem.map((elem2: IDateObject )=>{
                            // tempContainer2.push(elem2.toDate().getTime())
                            tempContainer2.push(elem2)
                            })                   
                        })
                       // console.log("tempContainer2 przedsort ",tempContainer2)
                       // console.log("temp container dats",tempContainer2[0])
                       tempContainer2.sort((a, b) => {
                       //const timestampA = a.toDate().getTime();
                       const timestampA = a.toMillis();
                      // console.log("timestampA",a.toMillis())
                       //const timestampB = b.toDate().getTime();
                       const timestampB = b.toMillis();
          
                        return timestampA - timestampB;
                        });
                       
                     // Teraz tempContainer3 będzie zawierać elementy posortowane od najstarszej daty do najświeższej
                     const tempContainer3: IDateObject[]  = [...tempContainer2];
                     //console.log("tempContainer3 posort ",tempContainer3)
                     //tempContainer3.map((elem, index) => {
                    // console.log('elem3', elem.toDate());
                   // });      
                     setData(tempContainer3);
                 //  console.log('data',data)
                   
               
            
            }
            })

      return unsub;

    }
    getingDates()

    },[db])

//console.log("data1", data[1])
    
   

    return data
}


