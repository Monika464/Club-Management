import { doc, getDoc } from "firebase/firestore";
import { db } from "../App";
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext';
import { useSearchIndexCloseToday } from "../hooks/useSearchIndexCloseToday";
import { useSearchDatesPlusN } from "../hooks/useSearchDatesPlusN";




export const Test2: React.FunctionComponent =() => {

    const dzisIndex = useSearchIndexCloseToday();
    const { currentUser} = useContext(UserContext); 

    const [treningsToAdd, setTreningsToAdd] = useState<number | null>(null) ;
const [currentUserPausaDate, setCurrentUserPausaDate] = useState<Date | null>();
const [dueDate, setDueDate] = useState<Date | null>()

const paymentDateIndex  = useSearchDatesPlusN(0, currentUser?.uid);

useEffect(()=>{

    if(currentUser){
    const getAddfromBase =async ()=>{

      const userRef = doc(db, "usersData",currentUser.uid);
      const docSnap = await getDoc(userRef);
      
      if (docSnap.exists()) {
           if(docSnap.data().add && docSnap.data().pause)
               {
                setTreningsToAdd(docSnap.data().add) 
                setCurrentUserPausaDate(docSnap.data().pause)    
                }   else {
                  console.log("No trenings to add or pausa date")
                }  
           if(docSnap.data().due){
            setDueDate(docSnap.data().due)
           }

      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }

     
    }
    getAddfromBase();

  }

  console.log("currentUserPausaDate",currentUserPausaDate, "treningsToAdd", treningsToAdd,
  "dueDate",dueDate)

  },[db,currentUser,dzisIndex])
  //TU MASZ KOD UZUPELNIC !!!1

  //jezeli ma zadluzenie to zapisuje jako debt
  //wczesniej sprawdz czy debt nie zapisany przez pauze 

  //report injury juz dziala

  //moze byc zgloszona wczesniej pauza bez debt
  //moze byc zgloszona wczesniej pauza z debt
  //uzytkownik date platnosci ma w przyszlosci 
  //uzytkownik date platnosci ma dzis lu w przeszlosci jest winien

  useEffect(()=>{

  if(treningsToAdd){
    console.log("ma pauze i add dodajemy treningi do obecnego indexu i wyswietlamy date w przyszlosci")    
  } else if (currentUserPausaDate){
   console.log("pauza i zadluzenie wpisujemy dzisiaj stop i doliczamy ")
  }
  
  console.log("paymentDateIndex",paymentDateIndex)
  //else if( nie ma pauzy ale ma zadluzenie){}
  ////else if( nie ma pauzy nie ma zadluzebia){}


  },[currentUser,treningsToAdd,paymentDateIndex,dzisIndex ])


   

   

   

return (<div>
   { /*
    <button onClick={stopTreningsToConfirm}>Zatrzymaj treningi</button>
       
       {isStopOn && <div>
          {stopDateNowOwe ? <p>{stopDateNowOwe?.toDateString}</p> : <p>Zatrzymujesz uczestnictwo w dniu {stopDateWithOwe?.toDate().toString()} jestes dłużny {oweUser} treningów</p>}
          <button onClick={confirStop}>Potwierdz</button>
       </div>}
      */
}
    
    </div>)
}