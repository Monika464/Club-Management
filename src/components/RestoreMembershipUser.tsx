import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext';
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../App';
import { useSearchIndexCloseToday } from '../hooks/useSearchIndexCloseToday';
import { useSearchDatesByIndex } from '../hooks/useSearchDatesByIndex';
import { useNavigate } from 'react-router-dom';

export const RestoreMembershipUser: React.FunctionComponent =() => {

    const { currentUser} = useContext(UserContext); 
    const [name, setName] = useState<string | null>(null)
    const [surname, setSurname] = useState<string | null>(null)
    const [debt, setDebt] = useState<number | null>(null)
    const [isStop, setIsStop] = useState<boolean>(false)
    const [restartDateIndex, setRestartDateIndex] = useState<number | null>(null);
    const [isMulti, setIsMulti] = useState<boolean>(false);
    const [isPass, setIsPass] = useState<boolean>(false);
    const [isSent, setisSent] = useState<boolean>(false) ;
    const dzisIndex = useSearchIndexCloseToday();
    const dzisData = useSearchDatesByIndex(dzisIndex);
    const navigate = useNavigate();
    
    useEffect(()=>{
      if(currentUser){ 

        const initial = async()=>{
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
                   if(docSnap.data().optionMulti === true){
                     setIsMulti(true)
                      }

                 } else {
                  console.log("uzytkownik aktywny")
                }
                }
              }
              initial();
            }
              

    },[currentUser,db])

    //ustawienie imienia i nazwiska

          useEffect(()=>{

                    const handleSetUserInfo = async ()=>{
                        console.log("klikniete")
                      if(currentUser){ 
                        const userRef = doc(db, "usersData",currentUser?.uid);
                        const docSnap = await getDoc(userRef);
  
                            if (docSnap.exists()) {

                              setName(docSnap.data().name);
                              setSurname(docSnap.data().surname);

                              if(docSnap.data().optionMulti === true){
                                setIsMulti(true)
                                 }
                               if(docSnap.data().optionPass === true){
                                  setIsPass(true)
                                   }
                              console.log('isPass',isPass)

                                 if(docSnap.data().stop){
                                  setIsStop(true);   
                                  
                                    if(docSnap.data().debt){
                                       setDebt(docSnap.data().debt)
                                       }
                                  } else {
                                    console.log("aktywny")
                                  }
                             }
                             console.log("nameeee", name)
                      }   
                }
      
                handleSetUserInfo() 
                console.log('name',name,'dzisData',dzisData?.toDate(),'debt',debt,isPass) 

        },[db,dzisIndex,currentUser])


    //wyliczam nowa date jesli jest dlug, jesli nie ma due date na dzi
  

    useEffect(()=>{
      
      if(isMulti){
        setRestartDateIndex(null)
      }
      if(isPass){
        if(dzisIndex || debt){
          setRestartDateIndex(dzisIndex - debt);
         }
      }
         // console.log('UUUUrestartNewData',restartNewData?.toDate())

    },[dzisIndex,currentUser])

   
    const restartNewData = useSearchDatesByIndex(restartDateIndex);

    //console.log('restartNewData',restartNewData?.toDate())  


const dataToActivityArchive = {
    created_at: serverTimestamp(),
    restartData: dzisData,
    userUid: currentUser?.uid,
    kto: `${name} ${surname}`,          
  } 

const sendToBase =async()=>{

    const paymentDataRef = doc(db, "usersData", currentUser.uid);

    if(isMulti){
      await updateDoc(paymentDataRef, {  
        stop: null, 
        due: null,    
        restart:  dzisData,
        debt: debt
      })
      .then(()=>console.log("restart succesful"))
      .then(()=> setisSent(true))
       
      const docRef = await addDoc(collection(db, "activitiArchive"), dataToActivityArchive)
      .then(()=> console.log("archive"))
      .then(()=> navigate('/userpanel'))
    }
   
    if(isPass){
      if(restartNewData){    
        await updateDoc(paymentDataRef, {  
          stop: null, 
          due: restartNewData,    
          restart:  dzisData,
          debt: null
        })
        .then(()=>console.log("restart succesful"))
        .then(()=> setisSent(true))
         
        const docRef = await addDoc(collection(db, "activitiArchive"), dataToActivityArchive)
        .then(()=> console.log("archive"))   
        .then(()=> navigate('/userpanel'))
       } 
     }

  }




return(<div>

 {isStop && <p>Powrót {dzisData?.toDate()?.toString()}</p>}
{debt && <p>Masz do spłaty zadłużenie wysokosci: {debt} treningów</p>}
    {isStop &&<button onClick={sendToBase} className='btn'>akceptuj</button>}    
    {isSent && <p>wyslano</p>}
    </div>)

}