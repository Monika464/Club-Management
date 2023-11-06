import Select from 'react-select'
import { useModUsersForSelect } from '../hooks/useModUsersForSelect ';
import { useEffect, useState } from 'react';
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../App';
import { useSearchIndexCloseToday } from '../hooks/useSearchIndexCloseToday';
import { useSearchDatesByIndex } from '../hooks/useSearchDatesByIndex';

export interface US {
    value: string | null
    label: string | null
}

export const RestoreMembershipAdmin: React.FunctionComponent =() => {

    const [chosenUserId, setChosenUserId] = useState<string | null>(null)
    const [chosenUserByIdLabel, setChosenUserByIdLabel] = useState<string | null>(null)

    const userModForSelect  =  useModUsersForSelect(); 
    //zmodyfikuj zeby tylko zatrzymani
    const [newUsersList, setNewUsersList] = useState<US[]>([])
    const [name, setName] = useState<string | null>(null)
    const [surname, setSurname] = useState<string | null>(null)
    const [debt, setDebt] = useState<number | null>(null)
    const [isStop, setIsStop] = useState<boolean>(false)
    const [restartDateIndex, setRestartDateIndex] = useState<number | null>(null);
    
    const dzisIndex = useSearchIndexCloseToday();
    const dzisData = useSearchDatesByIndex(dzisIndex);


    useEffect(() => { 
        const fetchData = async () => {
            const usersToAdd = [];

            for (let i = 0; i < userModForSelect.length; i++) {
                const userRef = doc(db, "usersData", userModForSelect[i].value);
                const docSnap = await getDoc(userRef);  
                
                if (docSnap.data().stop) {
                    // Dodawanie użytkownika do listy w formie obiektu
                    usersToAdd.push({ value: userModForSelect[i].value, label: userModForSelect[i].label });
                }

                setNewUsersList(usersToAdd); // Aktualizuj stan tablicy
            }

            
        };

        fetchData();

        //console.log('newUsersList',newUsersList)
    }, [db,useModUsersForSelect,dzisData]);
    ////


          const handleSetUserInfo = async ()=>{

            if(chosenUserId){ 
              const userRef = doc(db, "usersData",chosenUserId);
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

     
     // console.log('name',name,'dzisData',dzisData?.toDate(),'debt',debt) 





useEffect(()=>{
const calculateRestart =()=>{

  if(dzisIndex || debt){
    setRestartDateIndex(dzisIndex - debt);
   }
}
calculateRestart();

},[handleSetUserInfo])

const restartNewData = useSearchDatesByIndex(restartDateIndex);

//console.log('restartNewData',restartNewData?.toDate())


const dataToActivityArchive = {
timestamp: serverTimestamp(),
restartData: dzisData,
userUid: chosenUserId,
kto: `${name} ${surname}`,          
} 

const sendToBase =async()=>{

const paymentDataRef = doc(db, "usersData", chosenUserId);

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


    ////

 


 


return(<>


RestoreMembershipAdmin
<Select
      closeMenuOnSelect={true}  
      options={newUsersList}
      onChange={(choice) => {
        setChosenUserId(choice.value);   
        setChosenUserByIdLabel(choice.label);  
        setIsStop(false);
        setDebt(null);
     
        }}   
    />
    <p>{chosenUserByIdLabel}</p>

    <button onClick={handleSetUserInfo}>wylicz date powrotu</button>  
 {isStop && <p>Powrót {dzisData?.toDate()?.toString()}</p>}
{debt && <p>Masz do spłaty zadłużenie wysokosci: {debt} treningów</p>}
    <button onClick={sendToBase}>akceptuj</button>   
</>)
}