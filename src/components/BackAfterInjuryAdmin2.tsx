import Select from 'react-select'
import { useModUsersForSelect } from "../hooks/useModUsersForSelect ";
import { useCallback, useEffect, useState } from 'react';
import { useSearchIndexCloseToday } from '../hooks/useSearchIndexCloseToday';
import { useSearchDatesByIndex } from '../hooks/useSearchDatesByIndex';
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../App';
import { format } from 'date-fns';

export interface Itest{}
export interface US {
    value: string | null
    label: string | null
}


export const BackAfterInjuryAdmin2 : React.FunctionComponent<Itest> =(props) => { 


  const [chosenUserId, setChosenUserId] = useState<string | null>(null)
  const [chosenUserByIdLabel, setChosenUserByIdLabel] = useState<string | null>(null);
  const [newUsersList, setNewUsersList] = useState<US[]>([]);
  const [treningsToAdd, setTreningsToAdd] = useState<number | null>(null) ;
  const [debtsToSubstract, setDebtsToSubstract] = useState<number | null>(null) ;
const [currentUserPausaDate, setCurrentUserPausaDate] = useState<Date | null>()
const [name, setName] = useState<string | null>(null)
const [surname, setSurname] = useState<string | null>(null)
const [debt, setDebt] = useState<number | null>(null)
const [add, setAdd] = useState<number | null>(null)
const [isPausa, setIsPausa] = useState<boolean>(false)
const [backDateIndex, setBackDateIndex] = useState<number | null>(null);
const [newPaymentDateIndex, setNewPaymentDateIndex] = useState<number | null>(null);
const [newPaymentDate, setNewPaymentDate] = useState<Date | null>();
const [isMulti, setIsMulti] = useState<boolean>(false)
const [todayDisplay, setTodayDisplay] = useState<Date | null>();

    const userModForSelect  =  useModUsersForSelect(); 
    const dzisIndex = useSearchIndexCloseToday();
    const dzisData = useSearchDatesByIndex(dzisIndex);
    

    //modyfikowanie listy userów

    useEffect(() => { 
        const fetchData = async () => {
            const usersToAdd = [];

            for (let i = 0; i < userModForSelect.length; i++) {
                const userRef = doc(db, "usersData", userModForSelect[i].value);
                const docSnap = await getDoc(userRef);  
                
                if (docSnap.data().pause) {
                    // Dodawanie użytkownika do listy w formie obiektu
                    usersToAdd.push({ value: userModForSelect[i].value, label: userModForSelect[i].label });
                }
                       
                setNewUsersList(usersToAdd); // Aktualizuj stan tablicy
            }

            
        };

        fetchData();

        //console.log('newUsersList',newUsersList)
    }, [db,useModUsersForSelect,dzisData]);

    //kalkulowanie daty powrotu

  
    const now = new Date()

    const handleSetUserInfo = async ()=>{
    

        if(chosenUserId){ 
          const userRef = doc(db, "usersData",chosenUserId);
          const docSnap = await getDoc(userRef);

              if (docSnap.exists()) {

                   if(docSnap.data().pause){
                    setIsPausa(true);
                 
                     setName(docSnap.data().name);
                     setSurname(docSnap.data().surname);
                              
                     if(docSnap.data().optionMulti === true){
                      setIsMulti(true)
                   
                     }
                    

                             if(docSnap.data().add ){
                                 console.log("Document data:", docSnap.data().pause);
                                setTreningsToAdd(docSnap.data().add) 
                                  setCurrentUserPausaDate(docSnap.data().pause)  
                                 } 
                             //console.log("currentUserPausaDate",currentUserPausaDate);     
                             if(docSnap.data().debt ){
                                //console.log("Document data:", docSnap.data().add);
                            setDebtsToSubstract(docSnap.data().debt) 
                             setCurrentUserPausaDate(docSnap.data().pause)         
                              } 
                    } else {
                      console.log("uzytkownik nie zatrzymany")
                    }
               }
        }  
        
        console.log("p",isPausa,debt,add )
  }


  const onClick = useCallback(() => {
    handleSetUserInfo()
  
    setTodayDisplay(now)
    
  }, []);

  console.log('todaydisplay',todayDisplay)



  const calcDatOfNewPay =  useSearchDatesByIndex(newPaymentDateIndex);

  //console.log("now",now)
   //setTodayDisplay(now)



    ///////////////////////

    useEffect(() => { 

    if( chosenUserId){
     // console.log("uruchomiony useeffect2")

      if(isMulti){

        setNewPaymentDate(null)
 

      } else{

        if(debtsToSubstract && dzisIndex){
          setNewPaymentDateIndex(dzisIndex - debtsToSubstract)
        }
        if(treningsToAdd && dzisIndex){
          setNewPaymentDateIndex(dzisIndex + treningsToAdd)
         }  
       
        setNewPaymentDate(calcDatOfNewPay )
        }
        console.log('newPaymentDate', newPaymentDate?.toDate() )

      }
      
  
  
  },[chosenUserId, currentUserPausaDate])
  
  const dataToActivityArchive = {
    timestamp: serverTimestamp(),
    restartData: dzisData,
    userUid: chosenUserId,
    kto: `${name} ${surname}`,          
    } 

  const pushToBaseNewDueDay =async ()=>{
 
    const userRef = doc(db, "usersData",chosenUserId);

   
    await updateDoc(userRef, {
      due: newPaymentDate,
      add: null,
      debt: null,
      pause: null
    })
    .then(()=>{console.log("powrot do treningów nowa płatnosc zapisana")})

    const docRef = await addDoc(collection(db, "activitiArchive"), dataToActivityArchive)
.then(()=> console.log("archive"))


}
    //kopia do archive dorobic 


   return (<>

  
   <Select
      closeMenuOnSelect={true}  
      options={newUsersList}
      onChange={(choice) => {
        setChosenUserId(choice.value);   
        setChosenUserByIdLabel(choice.label); 
        setIsPausa(false);  
        //setNewPaymentDate(null);
        //setNewPaymentDateIndex(null)
        }}   
    />
    <p>{chosenUserByIdLabel}</p>

    <button onClick={onClick}>wylicz date powrotu</button>
    {isPausa && <p>{newPaymentDate?.toDate()?.toString()}</p>}
    {todayDisplay && <p>{todayDisplay?.getMonth()+1}-{todayDisplay?.getDate()}</p>}

 <button onClick={pushToBaseNewDueDay}>Zatwierdz powrot</button>
    
   </>)


}