import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext';
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../App';
import { useSearchIndexCloseToday } from '../hooks/useSearchIndexCloseToday';
import { useSearchDatesByIndex } from '../hooks/useSearchDatesByIndex';

export const RestoreMembershipUser: React.FunctionComponent =() => {

    const { currentUser} = useContext(UserContext); 
    const [name, setName] = useState<string | null>(null)
    const [surname, setSurname] = useState<string | null>(null)
    const [debt, setDebt] = useState<number | null>(null)
    const [isStop, setIsStop] = useState<boolean>(false)
    const [restartDateIndex, setRestartDateIndex] = useState<number | null>(null);
    
    const dzisIndex = useSearchIndexCloseToday();
    const dzisData = useSearchDatesByIndex(dzisIndex);
   


    //ustawienie imienia i nazwiska

          //useEffect(()=>{

                    const handleSetUserInfo = async ()=>{

                      if(currentUser){ 
                        const userRef = doc(db, "usersData",currentUser?.uid);
                        const docSnap = await getDoc(userRef);
  
                            if (docSnap.exists()) {
                                 if(docSnap.data().stop){
                                  setIsStop(true);
                                   setName(docSnap.data().name);
                                   setSurname(docSnap.data().surname);
                                           if(docSnap.data().debt){
                                            setDebt(docSnap.data().debt)
                                             }
                                  } else {
                                    console.log("uzytkownik nie zatrzymany")
                                  }
                             }
                      }   
                }
      
               
                console.log('name',name,'dzisData',dzisData?.toDate(),'debt',debt) 
         //},[dzisIndex])


    //wyliczam nowa date jesli jest dlug, jesli nie ma due date na dzi
  

    useEffect(()=>{
      

            if(dzisIndex || debt){
              setRestartDateIndex(dzisIndex - debt);
             }
          
         

          console.log('UUUUrestartNewData',restartNewData?.toDate())

    },[handleSetUserInfo])

    const restartNewData = useSearchDatesByIndex(restartDateIndex);

    console.log('restartNewData',restartNewData?.toDate())  


const dataToActivityArchive = {
    timestamp: serverTimestamp(),
    restartData: dzisData,
    userUid: currentUser?.uid,
    kto: `${name} ${surname}`,          
  } 

const sendToBase =async()=>{

    const paymentDataRef = doc(db, "usersData", currentUser.uid);

    if(restartNewData){    
        await updateDoc(paymentDataRef, {  
          stop: null, 
          due: restartNewData,    
          restart:  dzisData,
          debt: null
        })
        .then(()=>console.log("restart succesful"))
   
               
        const docRef = await addDoc(collection(db, "activitiArchive"), dataToActivityArchive)
        .then(()=> console.log("archive"))
     
         } 
}




return(<div>
 <button onClick={handleSetUserInfo}>wylicz date powrotu</button>  
 {isStop && <p>Powrót {dzisData?.toDate()?.toString()}</p>}
{debt && <p>Masz do spłaty zadłużenie wysokosci: {debt} treningów</p>}
    <button onClick={sendToBase}>akceptuj</button>    
    </div>)

}