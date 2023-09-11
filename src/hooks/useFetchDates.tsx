
import { CollectionReference, DocumentData, Firestore, Query, collection, doc, onSnapshot, query } from "firebase/firestore";
import { db } from "../App.js";
import { getFirestore } from 'firebase/firestore';
import { SetStateAction, useEffect, useState, valueOf } from "react";
import firebase from "firebase/compat/app";
//import { User } from "firebase/auth";

export interface IFetchDates {

    db: Firestore,
    colName: string,
    data: Date | null,
    setData: React.Dispatch<SetStateAction<Date | null>>

};
const createCollection = <T = DocumentData>(collectionName: string) => {
 return collection(Firestore, collectionName) as CollectionReference<T>
  }

//export const usersCol = createCollection<User>('users');





export const useFetchDates = (): Date[] | null => {

             const [data, setData] =useState<Date[] | null>(null)

             const daysCollection = collection(db, "trainingDays");
   

    useEffect(()=>{

        let tempContainer: any[] =[]; 
        let tempContainer2: any[] =[];

        const getingDates = async () =>{
    
        const unsub =  onSnapshot(
            daysCollection, 
            (snapshot: { docs: { data: () => any; }[]; })=>{
                if(snapshot){
   
                      snapshot.docs.map((doc)=> {
                     // console.log("uu", doc.data().datesSet,"doc")               
                        tempContainer.push((doc.data().datesSet))      
                       })
                     // console.log('tempContainer',tempContainer) 
                        tempContainer.map((elem, index)=>{
                            //console.log('elem', elem, 'index', index);
                             elem.map((elem2: any, index2: any)=>{
                            // tempContainer2.push(elem2.toDate().getTime())
                            tempContainer2.push(elem2)
                            })                   
                        })
       
                       tempContainer2.sort((a, b) => {
                       const timestampA = a.toDate().getTime();
                       const timestampB = b.toDate().getTime();
          
                        return timestampA - timestampB;
                        });
          
                     // Teraz tempContainer3 będzie zawierać elementy posortowane od najstarszej daty do najświeższej
                     const tempContainer3 = [...tempContainer2];
          
                     tempContainer3.map((elem, index) => {
                    // console.log('elem3', elem.toDate());
                    });      
                     setData(tempContainer3);
                 //  console.log('data',data)
                   
               
            
            }
            })

      return unsub;

    }
    getingDates()

    },[db])

 //console.log('czy tu data', data)

    
   

    return data
}


